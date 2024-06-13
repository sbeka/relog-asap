import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const URL = () => {
	switch (window.location.hostname) {
		case 'copilot.relog.kz':
			return 'https://copilot-api.relog.kz/copilot/invoke';
		default:
			return 'http://localhost:8012/copilot/invoke';
	}
};

const ChatContainer = styled.div`
	max-width: 800px;
	height: calc(100vh - 80px);
	margin: 0 auto;
	border: 1px solid #ccc;
	display: flex;
	flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const MessageInputContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #ccc;
  display: flex;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
`;

const MessageButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const StyledMessage = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
`;

const MessageContent = styled.div`
  background-color: ${props => props.isOwn ? '#007bff' : '#f1f1f1'};
  color: ${props => props.isOwn ? 'white' : 'black'};
  padding: 10px;
  border-radius: 5px;
  max-width: 60%;
  white-space: pre-line;
`;

const LoaderWrap = styled.div`
	display: flex;
	gap: 10px;
`;

const Chat = () => {
	const inputRef = useRef(null);
	const messagesEndRef = useRef(null);
	const [messages, setMessages] = useState([
		{
			id: uuidv4(),
			text: 'Добрый день! Я аналитический ассистент от компании Relog. Моя цель - отвечать на ваши аналитические вопросы.\n' +
				'Я нахожусь в разработке и мой функционал строго ограничен вопросами, которые имеют отношение к данным.',
			isOwn: false,
			time: new Date().toLocaleTimeString().slice(0, 5),
			author: 'AI',
			avatar: './robot-icon.png',
		},
	]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState('');

	const handleSendMessage = async () => {
		if (newMessage.trim()) {
			const newMessageObj = {
				id: uuidv4(),
				text: newMessage,
				isOwn: true,
				time: new Date().toLocaleTimeString().slice(0, 5),
				author: 'Ты',
				avatar: './user-icon.png'
			};
			setMessages((prevMessages) => [...prevMessages, newMessageObj]);

			setLoading(() => true);

			let res;

			try {
				res = await axios.post(URL(), {
					"input": {
						"question": newMessage,
						"is_relevant": "",
						"answer": "",
						"empty_result": "",
						"intermediate_steps": []
					},
					"config": {},
					"kwargs": {}
				});
			} catch (e) {
				console.error(e);
			}

			setLoading(() => false);

			if (res) {
				setNewMessage(() => '');

				const { sql_query, sql_result, answer } = res.data?.output || {};
				const aiMessagesObj = [];

				if (sql_query) {
					aiMessagesObj.push({
						id: uuidv4(),
						text: `<div><strong>SQL запрос:</strong>: ${sql_query}</div>`,
						isOwn: false,
						time: new Date().toLocaleTimeString().slice(0, 5),
						author: 'AI',
						avatar: './robot-icon.png',
					});
				}

				if (sql_result) {
					aiMessagesObj.push({
						id: uuidv4(),
						text: `<div><strong>SQL ответ:</strong>: ${sql_result}</div>`,
						isOwn: false,
						time: new Date().toLocaleTimeString().slice(0, 5),
						author: 'AI',
						avatar: './robot-icon.png',
					});
				}

				if (answer) {
					aiMessagesObj.push({
						id: uuidv4(),
						text: `<div><strong>Ответ</strong>: ${answer}</div>`,
						isOwn: false,
						time: new Date().toLocaleTimeString().slice(0, 5),
						author: 'AI',
						avatar: './robot-icon.png',
					});
				}

				setMessages((prevMessages) => [...prevMessages, ...aiMessagesObj]);

				if (inputRef.current) {
					setTimeout(() => inputRef.current.focus());
				}
			}
		}
	};

	const handleKeyPress = async (e) => {
		if (e.key === 'Enter') {
			await handleSendMessage();
		}
	};

	useEffect(() => {
		// Установить фокус при первой загрузке компонента
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		// Автоматическая прокрутка к последнему сообщению
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	return (
		<ChatContainer>
			<MessagesContainer>
				{messages.map((msg) => (
					<StyledMessage key={msg.id} isOwn={msg.isOwn}>
						<img
							src={msg.avatar}
							alt={msg.author}
							style={{borderRadius: '50%', margin: '0 10px', width: '50px', height: '50px'}}
						/>
						<MessageContent isOwn={msg.isOwn}>
							<div dangerouslySetInnerHTML={{__html: msg.text}}></div>
							<div style={{fontSize: '0.8em', marginTop: '5px'}}>{msg.time}</div>
						</MessageContent>
					</StyledMessage>
				))}

				{loading ? (
					<StyledMessage isOwn={false} style={{backgroundColor: '#fff'}}>
						<img
							src="./robot-icon.png"
							alt="AI"
							style={{borderRadius: '50%', margin: '0 10px', width: '50px', height: '50px'}}
							title="Я думаю..."
						/>
						<MessageContent isOwn={false} style={{padding: 0}}>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								height: '100%',
								backgroundColor: '#fff',
								paddingLeft: '5px'
							}}>
								<img width="50" src="./loader-2.gif" alt="Печатает..." title="Я думаю..." />
							</div>
						</MessageContent>
					</StyledMessage>
				) : ''}

				<div ref={messagesEndRef} />
			</MessagesContainer>
			<MessageInputContainer>
				<MessageInput
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Введите текст..."
					disabled={loading}
					ref={inputRef}
				/>
				<MessageButton onClick={handleSendMessage} disabled={loading}>
					{loading ? (
						<LoaderWrap>
							<img style={{width: '16px'}} src="./loader.gif" alt="loading" />
							Подождите...
						</LoaderWrap>
					) : 'Отправить'}
				</MessageButton>
			</MessageInputContainer>
		</ChatContainer>
	);
};

export default Chat;

import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
	ChatContainer,
	LoaderWrap,
	MessageButton,
	MessageContent,
	MessageInput,
	MessageInputContainer,
	MessagesContainer,
	StyledMessage
} from "./Chat.styles";

const URL = () => {
	switch (window.location.hostname) {
		case 'copilot.relog.kz':
			return 'https://copilot-api.relog.kz/copilot/invoke';
		default:
			return 'http://localhost:8012/copilot/invoke';
	}
};

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
						"session_id": sessionStorage.getItem('chatAiSession'),
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

				/*if (sql_query) {
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
				}*/

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
		sessionStorage.setItem('chatAiSession', uuidv4());
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

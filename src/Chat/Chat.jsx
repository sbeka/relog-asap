import React, {useEffect, useRef, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Chat.css';
import MessageCard from "./components/MessageCard";
import LoadingMessageCard from "./components/LoadingMessageCard";
import InputPanel from "./components/InputPanel";
import { ChatInstance } from "./Chat.service";

const Chat = () => {
	const inputRef = useRef(null);
	const messagesEndRef = useRef(null);
	const [messages, setMessages] = useState([
		ChatInstance.createNewMessageFromBot(
			'Добрый день! Я аналитический ассистент компании Relog. Моя задача — отвечать на ваши вопросы, ' +
			'связанные с данными. Учтите, что я пока в стадии разработки и мой функционал ограничен.',
			'./images/bot-welcome.svg'
		),
	]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState('Список курьеров');


	useEffect(() => {
		sessionStorage.setItem('chatAiSession', uuidv4());

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


	const handleSendMessage = async () => {
		if (loading) {
			return;
		}

		if (newMessage.trim()) {
			const newMessageObj = ChatInstance.createNewMessageFromMe(newMessage);

			setMessages((prevMessages) => [...prevMessages, newMessageObj]);
			setLoading(() => true);
			setNewMessage(() => '');

			let res;

			try {
				res = await ChatInstance.sendRequestToBot(newMessage);
			} catch (e) {
				console.error(e);
			}

			setLoading(() => false);

			if (res) {
				const { answer } = res.data?.output || {};
				const aiMessagesObj = [];

				if (answer) {
					aiMessagesObj.push(
						ChatInstance.createNewMessageFromBot(`<div><strong>Ответ</strong>: ${answer}</div>`)
					);
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


	return (
		<div className="chat-container">
			<div className="messages-container">
				{messages.map((msg) => <MessageCard key={msg.id} msg={msg} />)}
				{loading && <LoadingMessageCard />}
				<div ref={messagesEndRef} />
			</div>
			<div className="message-input-container">
				<InputPanel
					loading={loading}
					newMessage={newMessage}
					onChangeHandle={e => setNewMessage(e.target.value)}
					onKeyPressHandle={handleKeyPress}
					onClickButtonHandle={handleSendMessage}
					inputRef={inputRef}
				/>
			</div>
		</div>
	);
};

export default Chat;

import React from 'react';
import MessageChart from "./MessageChart";

const MessageCard = ({ msg }) => {
	return (
		<div className={`message ${msg.isOwn ? 'isOwn' : ''}`} key={msg.id}>
			<div className="avatar">
				<img src={msg.avatar} alt={msg.author}/>
			</div>
			<div className={`message-content ${msg.isOwn ? 'isOwn' : ''}`}>
				<div dangerouslySetInnerHTML={{__html: msg.text}}></div>
				<MessageChart config={msg.visualization_config} />
				<div className="message-time">{msg.time}</div>
			</div>
		</div>
	);
};

export default MessageCard;

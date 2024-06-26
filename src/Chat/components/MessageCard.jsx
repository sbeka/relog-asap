import React from 'react';

const MessageCard = ({ msg }) => {
	return (
		<div className={`message ${msg.isOwn ? 'isOwn' : ''}`} key={msg.id}>
			<img src={msg.avatar} alt={msg.author}/>
			<div className={`message-content ${msg.isOwn ? 'isOwn' : ''}`}>
				<div dangerouslySetInnerHTML={{__html: msg.text}}></div>
				<div style={{fontSize: '0.8em', marginTop: '5px'}}>{msg.time}</div>
			</div>
		</div>
	);
};

export default MessageCard;

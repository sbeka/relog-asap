import React from 'react';

const LoadingMessageCard = () => {
	return (
		<div className="message">
			<img
				src="./bot-think.svg"
				alt="AI"
				title="Я думаю..."
			/>
			<div className="message-content" style={{padding: 0}}>
				<img width="50" src="./loader-2.gif" alt="Печатает..." title="Я думаю..."/>
			</div>
		</div>
	);
};

export default LoadingMessageCard;

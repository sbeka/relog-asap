import React from 'react';

const LoadingMessageCard = () => {
	return (
		<div className="message" style={{alignItems: "end"}}>
			<div className="avatar">
				<img
					src="./images/bot-think.svg"
					alt="AI"
					title="Я думаю..."
				/>
			</div>
			<div className="message-content message-content-loading">
				<img src="./images/loader-2.gif" alt="Печатает..." title="Я думаю..."/>
			</div>
		</div>
	);
};

export default LoadingMessageCard;

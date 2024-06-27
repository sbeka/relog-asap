import React from 'react';

const InputPanel = ({
	loading,
	newMessage,
	onChangeHandle,
	onKeyPressHandle,
	onClickButtonHandle,
	inputRef
}) => {
	return (
		<>
			<input className="message-input"
				   type="text"
				   value={newMessage}
				   onChange={onChangeHandle}
				   onKeyPress={onKeyPressHandle}
				   placeholder="Задайте вопрос..."
				   disabled={loading}
				   ref={inputRef}
			/>
			<img
				className="message-button"
				onClick={onClickButtonHandle}
				src={newMessage ? './images/button-active.svg' : './images/button-inactive.svg'}
				alt="button"
			/>
		</>
	);
};

export default InputPanel;

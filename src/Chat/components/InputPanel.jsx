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
				   placeholder="Введите текст..."
				   disabled={loading}
				   ref={inputRef}
			/>
			<button className="message-button" onClick={onClickButtonHandle} disabled={loading}>
				{loading ? (
					<div className="loader-wrap">
						<img style={{width: '16px'}} src="./loader.gif" alt="loading"/>
						Подождите...
					</div>
				) : 'Отправить'}
			</button>
		</>
	);
};

export default InputPanel;

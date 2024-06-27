import React from 'react';

const InputPanel = ({
	loading,
	newMessage,
	onChangeHandle,
	onKeyPressHandle,
	onClickButtonHandle,
	inputRef,
	chartResponse,
	setChartResponse,
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
			<div className="buttons">
				<img
					className="chart-button"
					onClick={() => setChartResponse(!chartResponse)}
					src={chartResponse ? './images/chart-on.svg' : './images/chart-off.svg'}
					alt="button"
					title={chartResponse ? 'Отключить график' : 'Включить график'}
				/>
				<img
					className="message-button"
					onClick={onClickButtonHandle}
					src={newMessage ? './images/button-active.svg' : './images/button-inactive.svg'}
					alt="button"
					title="Отправить"
				/>
			</div>
		</>
	);
};

export default InputPanel;

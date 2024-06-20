import styled from "styled-components";

export const ChatContainer = styled.div`
	max-width: 800px;
	height: calc(100vh - 80px);
	margin: 0 auto;
	border: 1px solid #ccc;
	display: flex;
	flex-direction: column;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

export const MessageInputContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #ccc;
  display: flex;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
`;

export const MessageButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

export const StyledMessage = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
`;

export const MessageContent = styled.div`
  background-color: ${props => props.isOwn ? '#007bff' : '#f1f1f1'};
  color: ${props => props.isOwn ? 'white' : 'black'};
  padding: 10px;
  border-radius: 5px;
  max-width: 60%;
  white-space: pre-line;
`;

export const LoaderWrap = styled.div`
	display: flex;
	gap: 10px;
`;

import {v4 as uuidv4} from "uuid";
import axios from "axios";

class ChatService {

	createNewMessageObj(text, author, avatar, isOwn = false, visualization_config = {}) {
		return {
			id: uuidv4(),
			text,
			isOwn,
			time: new Date().toLocaleTimeString().slice(0, 5),
			author,
			avatar,
			visualization_config,
		};
	}

	createNewMessageFromBot(text, avatar = './images/bot-waiting.svg', visualization_config = {}) {
		return this.createNewMessageObj(text, 'AI', avatar, false, visualization_config);
	}

	createNewMessageFromMe(text) {
		return this.createNewMessageObj(text, 'Ты', './images/relog-logo.jpg', true);
	}

	async sendRequestToBot(question, chartResponse = false) {
		return await axios.post(this._getUrl(), {
			input: {
				visualization_need: chartResponse ? 'yes' : '',
				session_id: sessionStorage.getItem('chatAiSession'),
				question,
				is_relevant: "",
				answer: "",
				empty_result: "",
				intermediate_steps: []
			},
			config: {},
			kwargs: {}
		});
	}

	_getUrl() {
		switch (window.location.hostname) {
			case 'copilot.relog.kz':
				return 'https://copilot-api.relog.kz/copilot/invoke';
			default:
				// return 'http://localhost:8012/copilot/invoke';
				return 'https://copilot-api.relog.kz/copilot/invoke';
		}
	}
}

export const ChatInstance = new ChatService();

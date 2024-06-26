import {v4 as uuidv4} from "uuid";
import axios from "axios";

class ChatService {

	createNewMessageObj(text, author, avatar, isOwn = false, ) {
		return {
			id: uuidv4(),
			text,
			isOwn,
			time: new Date().toLocaleTimeString().slice(0, 4),
			author,
			avatar,
		};
	}

	createNewMessageFromBot(text) {
		return this.createNewMessageObj(text, 'AI', './bot.svg', false);
	}

	createNewMessageFromMe(text) {
		return this.createNewMessageObj(text, 'Ты', './user-icon.png', true);
	}

	async sendRequestToBot(question) {
		return await axios.post(this._getUrl(), {
			input: {
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

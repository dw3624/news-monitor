import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:8000';
// const apiEndpoint = 'http://3.19.29.136:8000';

export const apiClient = () =>
	axios.create({
		baseURL: apiEndpoint,
		headers: {
			'Content-Type': 'application/json'
		}
	});


export const getArticleList = async (news:string, date:string) => {
	try {
		const response = await apiClient().get(`news-monitor/articles/${news}`, {
			params: { date: date }
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
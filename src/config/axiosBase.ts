import axios from 'axios'
export const axiosBase = axios.create({
	baseURL: `https://www.googleapis.com/customsearch/v1?&lr=lang_ru`,
	params: {
		key: process.env.KEY,
		cx: process.env.CX,
		num: 10
	}
});

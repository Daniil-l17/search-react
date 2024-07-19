import axios from 'axios';
// fileType=image
export const axiosBase = axios.create({
	baseURL: `https://www.googleapis.com/customsearch/v1?&lr=lang_ru`,
	params: {
		key: process.env.KEY,
		cx: process.env.CX
	}
});

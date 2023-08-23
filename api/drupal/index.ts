import { BASE_URL } from '@/api/config';

export const jsonapi = '/jsonapi';
export const router = '/router';

export async function getPage(slug:string) {
	let status;
	let data;
	//const response = await fetch('http://localhost:8081/router/translate-path?path=' + pathname);
	const response = await fetch(`${BASE_URL}${router}/translate-path?path=${slug}`);

	return response;
}



import { BASE_URL } from '@/api/config';
import { PathDetails, lessonid, listOfLessons, node, AccountCredentials } from '@/types';
import userData from '@/data/userLogin.json';

export const jsonapi = '/jsonapi';
export const router = '/router';

export const userSignup = async  (credentials: AccountCredentials) => {
	/*
	if (
	  userData.email === credentials.email &&
	  userData.password === credentials.password
	) {
	  return { status: 409 };
	} */
  
	return { status: 200 };
  }
  
  export const passwordReset = async (credentials: AccountCredentials) => {
	return { status: 200 };
  }
  

  
  export const resetPassword = async (emailAddress: string) => {
	return { status: 200 };
  }
  
  

export const getPage = async (slug: string ): Promise<PathDetails> => {
	const response = await fetch(`${BASE_URL}/router/translate-path?path=${slug}`);
	const data = await response.json();
	return data;
}

export const getListofLessonByTaxId = async (taxid: string): Promise<listOfLessons> => {
	const response = await fetch(`${BASE_URL}/api/v1/lesson/${taxid}?_format=json`);
	const result = await response.json();
	return result;
  } 
  
  
export const getListofCompletedLessonsbySubject = async (uid: string, taxid: string): Promise<lessonid[]> => {
	const response = await fetch(`${BASE_URL}/api/v1/subject/completed/${uid}/${taxid}?_format=json`);
	const result = await response.json();
	return result;
  }
  
  
export const getLessonCompletion = async (uid: string, field_lesson_ref: string): Promise<lessonid[]> => {
	const response = await fetch(`${BASE_URL}/api/v1/lesson/completed/${uid}/${field_lesson_ref}?_format=json`);
	const result = await response.json();
	return result;
  } 
  
export const getNode = async (uuid = '', bundle = ''): Promise<node> => {
	let params:string = ``;
	  switch (bundle) {
		  case 'lesson': {
		params = `include=field_paragraph_lesson.field_image`;
			  break;
		  }
		  default: {
			  break;
		  }
	  }
	const response = await fetch(`${BASE_URL}/jsonapi/node/${bundle}/${uuid}?${params}`);
	  const data = await response.json();
	  
	  return data;
  }
  
export const getTaxonomyTerm = async (uuid: string): Promise<node> => {
	const response = await fetch(`${BASE_URL}/jsonapi/taxonomy_term/subject/${uuid}`);
	const data = await response.json();
	return data;
  }

  export const getParagraph  = async (paragraphType: string, paragraphId: string): Promise<node> => {
	const response = await fetch(`${BASE_URL}/paragraph/${paragraphType}/${paragraphId}`);
	const data = await response.json();
	return data;
  } 
  
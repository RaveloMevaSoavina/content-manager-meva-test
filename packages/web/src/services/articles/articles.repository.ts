import axios from "axios";
import { ApiResponse } from "types/ApiResponse";
import { Article } from "types/Article";

export const getAllArticles = async (): Promise<ApiResponse<Article[]>> => {
	const { data } = await axios.get('http://localhost:3000/api/articles');
	return data;
};

export const removeOne = async (articleId: number): Promise<ApiResponse<Article>> => {
	const { data } = await axios.delete(`http://localhost:3000/api/articles/${articleId}`);
	return data;
};

export const createOne = async (dataForm: Article): Promise<ApiResponse<Article>> => {
	const { data } = await axios.post(`http://localhost:3000/api/articles`, { ...dataForm });
	return data;
};

export const updateOne = async (dataForm: Article): Promise<ApiResponse<Article>> => {
	const { data } = await axios.put(`http://localhost:3000/api/articles/${dataForm.ArticleID}`, { ...dataForm });
	return data;
}

export const getArticleByCategory = async (categoryID: number) => {
	const { data } = await axios.get(`http://localhost:3000/api/articles/category/${categoryID}`);
	return data;
}

export const getArticleByTag = async (tagID: number) => {
	const { data } = await axios.get(`http://localhost:3000/api/articles/tag/${tagID}`);
	return data;
}
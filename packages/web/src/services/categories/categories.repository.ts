import axios from "axios";
import { Category } from "types/Category";
// import http from "../../services/http";

export const getAllCategory = async (): Promise<any> => {
	const { data } = await axios.get('http://localhost:3000/api/categories');
	return data;
  };

export const getCategoryOfArticle =  (categoriesList: Category[], categoryID: string) => {
	return (categoriesList || []).find((category: any) => category.CategoryID === categoryID)?.Title
}

export const createCategory = async (dataForm: Category) : Promise<any> => {
	const { data } = await axios.post('http://localhost:3000/api/categories', {...dataForm});
	return data;
}

export const removeCategory = async (categoryID: number) : Promise<any> => {
	const { data } = await axios.delete(`http://localhost:3000/api/categories/${categoryID}`,);
	return data;
}

export const updateCategory = async (dataForm: Category) : Promise<any> => {
	const { data } = await axios.put(`http://localhost:3000/api/categories/${dataForm.CategoryID}`, { ...dataForm });
	return data;
}
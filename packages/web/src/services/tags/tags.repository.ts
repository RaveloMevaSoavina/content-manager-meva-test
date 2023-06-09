import axios from "axios";
import { Tag } from "types/Tag";
// import http from "../../services/http";

export const getAllTags = async (): Promise<any> => {
	const { data } = await axios.get('http://localhost:3000/api/tags');
	return data;
  };

  export const createTag = async (dataForm: Tag) : Promise<any> => {
	const { data } = await axios.post('http://localhost:3000/api/tags', {...dataForm});
	return data;
}

export const removeTag = async (tagID: number) : Promise<any> => {
	const { data } = await axios.delete(`http://localhost:3000/api/tags/${tagID}`,);
	return data;
}

export const updateTag = async (dataForm: Tag) : Promise<any> => {
	const { data } = await axios.put(`http://localhost:3000/api/tags/${dataForm.TagID}`, { ...dataForm });
	return data;
}
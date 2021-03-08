import axios from 'axios';

const url = 'http://localhost:8080/posts';


// utilising Axios to make Http request to the server
export const fetchMaterials = () => axios.get(url);
export const createMaterial = (newPost) => axios.post(url, newPost);
export const updateMaterial= (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deleteMaterial = (id) => axios.delete(`${url}/${id}`);

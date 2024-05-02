const API_URL = 'http://localhost:8180/categorias/';

export const fetchCategories = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

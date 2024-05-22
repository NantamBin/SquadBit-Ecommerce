const API_URL = 'http://localhost:8180/meusProdutos/categorias/';

export const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(API_URL + category);
  const data = await response.json();
  return data;
};

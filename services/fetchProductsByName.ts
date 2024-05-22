const API_URL = 'http://localhost:8180/meusProdutos/';

export const fetchProductsByName = async (name: string) => {
  const response = await fetch(API_URL + name);
  const data = await response.json();
  return data;
};

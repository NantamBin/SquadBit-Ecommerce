const API_URL = "http://localhost:8180/meusProdutos/";

export const fetchProducts = async () => {
	const response = await fetch(API_URL);
	const data = await response.json();
	return data;
};

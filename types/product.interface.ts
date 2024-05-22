export interface IProduct {
	produto_id: number;
	nome: string;
	descricao: string;
	preco: number;
	categoria_id?: string;
	estoque?: number;
	unidade: number;
	ativo?: number;
	imagemUrl?: string;
	quantity?: number;
}

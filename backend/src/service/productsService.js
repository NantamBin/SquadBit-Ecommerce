const db = require("./dbService.js");

async function getProdutos(page = 1) {
	const rows = await db.query(`SELECT * from produtos`);

	return rows;
}

async function getProductsByName(name = "") {
	const rows = await db.query(
		`SELECT * from produtos where nome LIKE('%${name}%')`
	);

	return rows;
}

async function getProductsCategories() {
	const rows = await db.query(`SELECT * from categorias`);

	return rows;
}

async function getProductsByCategory(category_id) {
	const rows = await db.query(`SELECT * from produtos where categoria_id=?`, [
		category_id,
	]);

	return rows;
}

async function create(produto) {
	const result = await db.query(
		`INSERT INTO produtos 
    (nome, descricao, preco, categoria_id, estoque, ativo) 
    VALUES 
    (?, ?, ?, ?, ?)`,
		[
			produto.nome,
			produto.descricao,
			produto.preco,
			produto.categoria_id,
			produto.estoque,
			produto.ativo,
		]
	);

	let message = "Erro ao criar os produtos";

	if (result.affectedRows) {
		message = "Produto criado com sucesso";
	}

	return { message };
}

async function update(id, produto) {
	const result = await db.query(
		`UPDATE produtos 
    SET nome=?, descricao=?, preco=?, categoria_id=?, estoque=?, ativo=?
    WHERE id=?`,
		[
			produto.nome,
			produto.descricao,
			produto.preco,
			produto.categoria_id,
			produto.estoque,
			produto.ativo,
		]
	);

	let message = "Erro ao atualizar os produtos";

	if (result.affectedRows) {
		message = "Produto atualizado com sucesso";
	}

	return { message };
}

async function remove(id) {
	const result = await db.query(`DELETE FROM produtos WHERE id=?`, [id]);

	let message = "Erro ao remover os produto";

	if (result.affectedRows) {
		message = "Produto removido com sucesso";
	}

	return { message };
}

module.exports = {
	getProdutos,
	getProductsByName,
	getProductsCategories,
	getProductsByCategory,
	create,
	update,
	remove,
};

const produtoService = require("../service/productsService.js");

async function get(req, res, next) {
	try {
		res.json(await produtoService.getProdutos(req.query.page));
	} catch (err) {
		console.error(`Erro ao obter os produtos`, err.message);
		next(err);
	}
}

async function getByName(req, res, next) {
	try {
		res.json(await produtoService.getProductsByName(req.params.name));
	} catch (err) {
		console.error("Erro ao obter o produto", err.message);
		next(err);
	}
}

async function getCategories(req, res, next) {
	try {
		res.json(await produtoService.getProductsCategories());
	} catch (err) {
		console.error("Erro ao obter as categorias", err.message);
		next(err);
	}
}

async function getByCategory(req, res, next) {
	try {
		res.json(
			await produtoService.getProductsByCategory(req.params.category_id)
		);
	} catch (err) {
		console.error("Erro ao obter o produto", err.message);
		next(err);
	}
}

async function create(req, res, next) {
	try {
		res.json(await produtoService.create(req.body));
	} catch (err) {
		console.error(`Erro ao criar os produtos`, err.message);
		next(err);
	}
}

async function update(req, res, next) {
	try {
		res.json(await produtoService.update(req.params.id, req.body));
	} catch (err) {
		console.error(`Erro ao atualizar os produtos`, err.message);
		next(err);
	}
}

async function remove(req, res, next) {
	try {
		res.json(await produtoService.remove(req.params.id));
	} catch (err) {
		console.error(`Erro ao remover os produtos`, err.message);
		next(err);
	}
}

module.exports = {
	get,
	getByName,
	getCategories,
	getByCategory,
	create,
	update,
	remove,
};

const produtoService = require('../service/productsService.js');

async function get(req, res, next) {
  try {
      res.json(await produtoService.getProdutos(req.query.page));
  } catch (error) {
      console.error(`Erro ao obter os produtos`, error.message);
      next(error);
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
  create,
  update,
  remove
};
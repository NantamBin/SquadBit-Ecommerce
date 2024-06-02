const prisma = require('/media/john/HD/Linux/Trabalho/squad/SquadBit-Ecommerce/ecommerce/api-backend/src/config/prismaDatabase.js');

async function getProdutos(page = 1) {
  const produtos = await prisma.produto.findMany();
  return produtos;
}

async function getProductsByName(name = "") {
  const produtos = await prisma.produto.findMany({
    where: {
      nome: {
        contains: name,
      },
    },
  });
  return produtos;
}

async function getProductsCategories() {
  const categorias = await prisma.categoria.findMany();
  return categorias;
}

async function getProductsByCategory(categoriaId) {
  const produtos = await prisma.produto.findMany({
    where: { categoriaId: categoriaId },
  });
  return produtos;
}

async function create(produto) {
  const newProduto = await prisma.produto.create({
    data: {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoriaId: produto.categoriaId,
      estoque: produto.estoque,
      ativo: produto.ativo,
      unidade: produto.unidade,
      imagemUrl: produto.imagemUrl,
    },
  });

  return { message: "Produto criado com sucesso", produto: newProduto };
}

async function update(id, produto) {
  const updatedProduto = await prisma.produto.update({
    where: { id: id },
    data: {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoriaId: produto.categoriaId,
      estoque: produto.estoque,
      ativo: produto.ativo,
      unidade: produto.unidade,
      imagemUrl: produto.imagemUrl,
    },
  });

  return { message: "Produto atualizado com sucesso", produto: updatedProduto };
}

async function remove(id) {
  await prisma.produto.delete({
    where: { id: id },
  });

  return { message: "Produto removido com sucesso" };
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

const prisma = require('/media/john/HD/Linux/Trabalho/squad/SquadBit-Ecommerce/ecommerce/api-backend/src/config/prismaDatabase.js');

async function create({ nome, email, senha }) {
  const newUser = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha,
    },
  });

  return { message: "Usuário criado com sucesso", user: newUser };
}

async function login({ email, senha }) {
  const user = await prisma.usuario.findFirst({
    where: {
      email,
      senha,
    },
  });

  if (!user) {
    throw new Error("Usuário ou senha inválidos");
  }

  return { message: "Usuário logado com sucesso", user };
}

module.exports = {
  create,
  login,
};

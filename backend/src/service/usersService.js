const db = require("./dbService.js");

async function create({ nome, email, senha }) {
	try {
		const result = await db.query(
			`INSERT INTO usuarios 
			(nome, email, senha) 
			VALUES 
			(?, ?, ?)`,
			[nome, email, senha]
		);

		if (result.affectedRows) {
			return { message: "Usuário criado com sucesso" };
		}
	} catch (err) {
		console.error("Erro ao criar o usuário", err);
		throw err;
	}
}

async function login({ email, senha }) {
	try {
		const result = await db.query(
			`SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
			[email, senha]
		);

		if (!result.length) {
			throw new Error("Usuário ou senha inválidos");
		}
		return { message: "Usuário logado com sucesso" };
	} catch (err) {
		console.error("Erro ao fazer login", err);
		throw err;
	}
}

module.exports = {
	create,
	login,
};

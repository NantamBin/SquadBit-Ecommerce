const usersService = require("../service/usersService.js");

async function create(req, res, next) {
	try {
		const result = await usersService.create(req.body);
		res.json({ message: "Usuário criado com sucesso" });
	} catch (err) {
		console.error("Erro ao cadastrar usuário:", err.message);
		res.status(500).json({ message: "Erro ao cadastrar usuário" });
	}
}

async function login(req, res, next) {
	try {
		const result = await usersService.login(req.body);
		if (!result.length) {
			return res.status(401).json({ message: "Usuário ou senha inválidos" });
		}
		res.json("Usuário logado com sucesso");
	} catch (err) {
		console.error("Erro ao fazer login:", err.message);
		res.status(500).json({ message: "Erro ao fazer login" });
	}
}

module.exports = {
	create,
	login,
};

const userServices = require("../service/usersService");

async function create(req, res) {
	try {
		const { nome, email, senha } = req.body;
		const result = await userServices.create({ nome, email, senha });
		if (result) {
			res.status(201).json("Usuário criado com sucesso");
		}
	} catch (err) {
		console.error("Erro ao criar o usuário", err);
		res.status(500).json({ error: "Erro ao criar o usuário" });
	}
}

async function login(req, res) {
	try {
		const { email, senha } = req.body;
		const result = await userServices.login({ email, senha });
		if (result) {
			res.status(200).json("Usuário logado com sucesso");
		}
	} catch (err) {
		console.error("Erro ao fazer login", err);
		res.status(500).json({ error: "Erro ao fazer login" });
	}
}

module.exports = {
	create,
	login,
};

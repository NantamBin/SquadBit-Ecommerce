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

		return result;
	} catch (err) {
		console.error("Error creating user:", err);
		throw err;
	}
}

async function login({ email, senha }) {
	try {
		const result = await db.query(
			`SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
			[email, senha]
		);

		return result;
	} catch (err) {
		console.error("Error logging in:", err);
		throw err;
	}
}

module.exports = {
	create,
	login,
};

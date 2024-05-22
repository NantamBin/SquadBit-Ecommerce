"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./register.module.css";
import { postForms } from "@/services/postForms";

const createUserSchema = z.object({
	nome: z
		.string()
		.min(3, { message: "Precisa ter no mínimo 3 caracteres" })
		.max(50, { message: "Precisa ter no máximo 50 caracteres" }),
	email: z.string().email({ message: "Email inválido" }),
	senha: z.string().min(8, { message: "Precisa ter no mínimo 8 caracteres" }),
});

type FormData = z.infer<typeof createUserSchema>;

const Registro = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(createUserSchema),
	});

	const [formSuccess, setFormSuccess] = React.useState(false);
	const [formSucessMessage, setFormSucessMessage] = React.useState("");

	const onSubmit = async (data: any) => {
		const response = await postForms("registro/", data);
		if (response.ok) {
			setFormSuccess(true);
			setFormSucessMessage("Registrado com sucesso!");
		} else {
			setFormSuccess(false);
			setFormSucessMessage("Erro ao registrar");
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h1 className={styles.formTitle}>Criar conta</h1>
				<div className={styles.formInputBox}>
					<label htmlFor="nome" className={styles.formLabel}>
						Nome
					</label>
					<input
						{...register("nome")}
						className={errors.nome ? styles.error : styles.formInput}
					/>
					{errors.nome && (
						<span className={styles.errorMessage}>{errors.nome.message}</span>
					)}
				</div>
				<div className={styles.formInputBox}>
					<label htmlFor="email" className={styles.formLabel}>
						Email
					</label>
					<input
						{...register("email")}
						className={errors.email ? styles.error : styles.formInput}
					/>
					{errors.email && (
						<span className={styles.errorMessage}>{errors.email.message}</span>
					)}
				</div>
				<div className={styles.formInputBox}>
					<label htmlFor="password" className={styles.formLabel}>
						Senha
					</label>
					<input
						{...register("senha")}
						className={errors.senha ? styles.error : styles.formInput}
						type="password"
					/>
					{errors.senha && (
						<span className={styles.errorMessage}>{errors.senha.message}</span>
					)}
				</div>
				<button type="submit" className={styles.submitButton}>
					Cadastrar
				</button>
				{formSuccess && (
					<span className={styles.formSucessMessage}>{formSucessMessage}</span>
				)}
				{formSuccess === false && (
					<span className={styles.formErrorMessage}>{formSucessMessage}</span>
				)}
				<a href="/login" className={styles.registerLink}>
					Já tem uma conta? Faça login
				</a>
			</form>
		</div>
	);
};

export default Registro;

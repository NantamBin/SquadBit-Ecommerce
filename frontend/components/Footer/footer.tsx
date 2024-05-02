"use client";
import React from "react";
import styles from "./footer.module.css";

export const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerColumn}>
					<h5>Políticas da Empresa</h5>
					<ul>
						<li>Formas de pagamento</li>
						<li>Termos de uso</li>
						<li>Política de privacidade</li>
						<li>Trocas e Devoluções</li>
					</ul>
				</div>
				<div className={styles.footerColumn}>
					<h5>Acesso Rápido</h5>
					<ul>
						<li>Como funciona</li>
						<li>Sua Conta</li>
						<li>Meus pedidos</li>
					</ul>
				</div>
				<div className={styles.footerColumn}></div>
			</div>
			<div className={styles.disclaimer}>
				<p>
					A venda e o consumo de bebidas alcoólicas são proibidas para menores
					de 18 anos. Aprecie com moderação e se beber não dirija.
				</p>
			</div>
		</footer>
	);
};

export default Footer;

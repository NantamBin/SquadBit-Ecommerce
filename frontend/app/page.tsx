import styles from "./page.module.css";
import { Products } from "@/components/Products/products";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Iniciando o projeto</h1>
			<Products />
		</main>
	);
}

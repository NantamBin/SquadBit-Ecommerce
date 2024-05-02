"use client";
import { IProduct } from "../../types/product.interface";
import styles from "./product.module.css";
import Image from "next/image";
import imageNotFound from "../../public/images/products/main/not-found.jpg";

interface ProductProps {
	product: IProduct;
}

export const Product = ({ product }: ProductProps) => {
	const { produto_id, nome, preco, ativo, imagemUrl } = product;
	if (!ativo) return;

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{nome}</h3>
			<Image
				src={
					imagemUrl === null || imagemUrl === ""
						? imageNotFound
						: imagemUrl || ""
				}
				alt={nome}
				height={0}
				width={0}
				sizes="100vw"
				className={styles.image}
			/>
			<p className={styles.price}>
				<span className={styles.salePrice}>R$ {Number(preco).toFixed(2)}</span>
			</p>
			<div className={styles.quantitySelector}>
				<button
					className={styles.quantityButton}
					onClick={(e) => {
						const quantity = document.getElementById(
							produto_id.toString()
						) as HTMLInputElement;
						if (Number(quantity.value) > 1)
							quantity.value = String(Number(quantity.value) - 1);
					}}
				>
					-
				</button>
				<input
					className={styles.quantityInput}
					type="number"
					defaultValue="1"
					id={produto_id.toString()}
				/>
				<button
					className={styles.quantityButton}
					onClick={(e) => {
						const quantity = document.getElementById(
							produto_id.toString()
						) as HTMLInputElement;
						quantity.value = String(Number(quantity.value) + 1);
					}}
				>
					+
				</button>
			</div>
		</div>
	);
};

"use client";

import { IProduct } from "../../types/product.interface";
import styles from "./product.module.css";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import imageNotFound from "../../public/images/products/main/not-found.jpg";

interface ProductProps {
	product: IProduct;
}

export const Product = ({ product }: ProductProps) => {
	const { produto_id, nome, preco, ativo, imagemUrl } = product;
	const addToCart = useCartStore((state) => state.addToCart);
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
			<QuantitySelector product={product} />
			<button
				className={styles.addToCartButton}
				onClick={() => {
					const quantity = document.getElementById(
						product.produto_id.toString()
					) as HTMLInputElement;
					const input = document.getElementById(
						product.produto_id.toString()
					) as HTMLInputElement;
					addToCart(product, quantity.valueAsNumber);
					input.value = "1";
				}}
			>
				Adicionar
			</button>
		</div>
	);
};

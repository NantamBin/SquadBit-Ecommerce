"use client";

import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/useCartStore";
import styles from "./page.module.css";

export default function CartPage() {
	const cart = useCartStore((state) => state.cart);
	const total = cart.reduce(
		(acc, product) => acc + +product.preco * (product.quantity as number),
		0
	);
	console.log(total);
	console.log(cart);
	return (
		<section className={styles.section}>
			<div
				className={`${styles.container} ${styles.bgSlate} ${styles.padding}`}
			>
				<h1 className={styles.title}>
					{cart.length === 0
						? "Seu carrinho de compras está vazio"
						: "Carrinho de compras"}
				</h1>
				<hr className={styles.hr} />
				<ul className={styles.list}>
					{cart.map((product) => (
						<CartItem key={product.produto_id} product={product} />
					))}
				</ul>
				<div className={styles.flexContainer}>
					<span className={styles.boldText}>Total:</span>
					<span className={`${styles.boldText} ${styles.price}`}>
						R${total.toFixed(2)}
					</span>
				</div>
			</div>
		</section>
	);
}

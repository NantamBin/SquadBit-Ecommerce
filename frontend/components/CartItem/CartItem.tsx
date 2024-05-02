import { useCartStore } from "@/store/useCartStore";
import { IProduct } from "@/types/product.interface";
import Image from "next/image";
import styles from "./cartItem.module.css";

interface ProductProps {
	product: IProduct;
}

function QuantitySelector({ product }: ProductProps) {
	const cartState = useCartStore((state) => state);

	const handleDecrement = () => {
		const quantity = document.getElementById(
			product.produto_id.toString()
		) as HTMLInputElement;
		if (Number(quantity.value) > 1) {
			quantity.value = String(Number(quantity.value) - 1);
			cartState.decrementFromCart(product);
		}
	};

	const handleIncrement = () => {
		const quantity = document.getElementById(
			product.produto_id.toString()
		) as HTMLInputElement;
		quantity.value = String(Number(quantity.value) + 1);
		cartState.addToCart(product, 1);
	};

	return (
		<div className="">
			<button
				className={`${styles.button} ${styles.inherit} ${styles.red} ${styles.hover}`}
				onClick={handleDecrement}
			>
				-
			</button>
			<input
				className={`${styles.input} ${styles.width} ${styles.center} ${styles.rounded}`}
				type="number"
				defaultValue={product.quantity || 1}
				id={product.produto_id.toString()}
				min={1}
			/>
			<button className={styles.buttonAdd} onClick={handleIncrement}>
				+
			</button>
		</div>
	);
}

export default function CartItem({ product }: ProductProps) {
	const cartState = useCartStore((state) => state);

	const handleRemove = () => {
		cartState.removeFromCart(product);
	};

	return (
		<li
			className={`${styles.listItem} ${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.gap4} ${styles.mb2} ${styles.shadowMd} ${styles.padding4}`}
		>
			<div className={styles.flex}>
				<Image
					src={product.imagemUrl || ""}
					alt={product.nome}
					width={100}
					height={100}
					className={styles.image}
				/>
				<div
					className={`${styles.flexColumn} ${styles.marginLeft5} ${styles.textCenter}`}
				>
					<h3>{product.nome}</h3>
					<QuantitySelector product={product} />
				</div>
			</div>
			<div>
				<button
					title="Remove Item"
					className={`${styles.button} ${styles.redText} ${styles.hoverText} ${styles.marginLeft} ${styles.bgGray}`}
					onClick={handleRemove}
				>
					X
				</button>
			</div>
		</li>
	);
}

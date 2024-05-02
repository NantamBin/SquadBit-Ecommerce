"use client";
import { useEffect, useState } from "react";
import { Product } from "../Product/product";
import { IProduct } from "../../types/product.interface";
import { fetchProducts } from "../../services/fetchProducts";
import styles from "./products.module.css";

interface ProductsProps {
	name?: string;
}

export const Products = ({}: ProductsProps) => {
	const [products, setProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		fetchProducts().then((data) => setProducts(data));
	}, []);

	return (
		<div>
			<ul className={styles.listproducts}>
				{products.map((product) => (
					<Product key={product.produto_id} product={product} />
				))}
			</ul>
		</div>
	);
};

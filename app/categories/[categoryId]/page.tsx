"use client";
import { Product } from "@/components/Product/product";
import { fetchProductsByCategory } from "@/services/fetchProductsByCategory";
import { IProduct } from "@/types/product.interface";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

const page = ({ params }: { params: { categoryId: string } }) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [fetchedProducts, setFetchedProducts] = useState(false);
	useEffect(() => {
		fetchProductsByCategory(params.categoryId).then((data) =>
			setProducts(data)
		);
		if (products.length > 0) {
			setFetchedProducts(true);
		}
	});
	return (
		<div>
			{products && (
				<ul className={styles.listproducts}>
					{products.map((product) => (
						<Product key={product.produto_id} product={product} />
					))}
				</ul>
			)}
			{!fetchedProducts && (
				<div className={styles.empty}>
					<h1>Não há nenhum produto nessa categoria</h1>
				</div>
			)}
		</div>
	);
};

export default page;

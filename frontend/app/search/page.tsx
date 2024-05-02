"use client";

import { fetchProductsByName } from "@/services/fetchProductsByName";
import { IProduct } from "@/types/product.interface";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/components/Product/product";
import "./page.css";

function Search() {
	const search = useSearchParams();
	const searchQuery = search ? search.get("q") : null;
	const [products, setProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		if (searchQuery) {
			fetchProductsByName(searchQuery).then((data) => setProducts(data));
		}
	}, [searchQuery]);

	return (
		<div className="container">
			<h1>Search Page</h1>
			{products.length !== 0 ? (
				<div className="productContainer">
					{products.map((product) => (
						<Product key={product.produto_id} product={product} />
					))}
				</div>
			) : (
				<p>Nenhum produto foi encontrado</p>
			)}
		</div>
	);
}

const SearchPage = () => {
	return (
		<Suspense>
			<Search />
		</Suspense>
	);
};

export default SearchPage;

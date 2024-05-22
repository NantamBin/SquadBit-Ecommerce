"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import searchIcon from "@/public/search.svg";
import Image from "next/image";
import "./searchInput.css";

interface Props {
	classNameProps: string;
}

const SearchInput = ({ classNameProps }: Props) => {
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault();

		const encodedSearchQuery = encodeURI(searchQuery);
		router.push(`/search?q=${encodedSearchQuery}`);
	};

	return (
		<form onSubmit={onSearch}>
			<input
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				type="text"
				placeholder="Pesquise no MyStore..."
				className={classNameProps}
				id="search"
				pattern="[^'\x22]+" // Previne a entrada de aspas simples e duplas
			/>
			<button type="submit">
				<Image
					src={searchIcon}
					alt="Cart"
					width={24}
					height={24}
					className="searchIcon"
				/>
			</button>
		</form>
	);
};

export default SearchInput;

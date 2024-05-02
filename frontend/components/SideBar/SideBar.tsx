import React, { useEffect, useState } from "react";
import styles from "./sideBar.module.css";
import { fetchCategories } from "@/services/fetchCategories";
import { ICategory } from "@/types/category.interface";
import Link from "next/link";

interface SideBarProps {
	active: boolean;
}

const SideBar = ({ active }: SideBarProps) => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	useEffect(() => {
		fetchCategories().then((data) => setCategories(data));
	}, []);

	return (
		<div className={active ? styles.active : styles.inactive}>
			<ul className={styles.list}>
				{categories.map((category: ICategory) => (
					<li key={category.categoria_id}>
						<Link href={`/categories/${category.categoria_id}`}>
							{category.nome}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SideBar;

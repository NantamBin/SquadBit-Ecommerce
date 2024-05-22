"use client";

import Link from "next/link";
import MenuButton from "../menuButton/menuButton";
import styles from "./header.module.css";
import cartIcon from "../../public/cart.svg";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import SearchInput from "../SearchInput/SearchInput";
import SideBar from "../SideBar/SideBar";
import { useState } from "react";
import menuIcon from "../../public/menuIcon.svg";
import menuInactiveIcon from "../../public/menuInactiveIcon.svg";

export const Header = () => {
	const cart = useCartStore((state) => state.totalItems);
	const [sideBarActive, setSideBarActive] = useState(false);

	return (
		<>
			<div className={styles.menu}>
				<div className={styles.toggle}>
					<button
						className={styles.menuButton}
						onClick={() => {
							setSideBarActive(!sideBarActive);
						}}
					>
						<Image
							src={sideBarActive ? menuInactiveIcon : menuIcon}
							alt="Menu"
							width={24}
							height={24}
						/>
					</button>
				</div>
				<Link href={"/"} className={styles.freeLink}>
					<h1 className={styles.logo}>Projetão</h1>
				</Link>
				<div className={styles.searchContainer}>
					<SearchInput classNameProps={styles.input} />
				</div>
				<div className={styles.buttonContainer}>
					<MenuButton href="/login" title="Login" />
					<MenuButton href="/register" title="Register" />
					<MenuButton href="/productsManager" title="Gerenciar Produtos" />
					<Link href="/cart" className="link">
						<div className={styles.cart}>
							<Image src={cartIcon} alt="Cart" width={24} height={24} />
							<span className={styles.cartNumber}>{cart as number}</span>
						</div>
					</Link>
				</div>
			</div>
			<SideBar active={sideBarActive} />
		</>
	);
};

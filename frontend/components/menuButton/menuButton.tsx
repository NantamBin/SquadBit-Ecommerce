"use client";
import Link from "next/link";
import styles from "./menuButton.module.css";

interface Props {
	href: string;
	title: string;
}

export default function MenuButton({ href, title }: Props) {
	return (
		<Link href={href} className={styles.link}>
			<button className={styles.menuButton}>{title}</button>
		</Link>
	);
}

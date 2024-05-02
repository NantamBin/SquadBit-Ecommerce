import Hero from "@/components/Hero/hero";
import styles from "./page.module.css";
import { Products } from "@/components/Products/products";

import criancaMascaraImagem from "@/public/images/carrossel/crianca-mascara.avif";
import oculosSolImagem from "@/public/images/carrossel/oculos-sol.avif";
import ovoPascoaImagem from "@/public/images/carrossel/ovo-pascoa.avif";

const heroSlides = [
	{
		title: "Páscoa Feliz",
		description: "Chocolates a partir de: R$ 9,90",
		backgroundImage: ovoPascoaImagem,
	},
	{
		title: "Oferta de Verão",
		description: "Aproveite os dias de sol com descontos especiais",
		backgroundImage: oculosSolImagem,
	},
	{
		title: "Volta às Aulas",
		description: "Tudo o que você precisa para um retorno triunfal",
		backgroundImage: criancaMascaraImagem,
	},
];

export default function Home() {
	return (
		<>
			<Hero slides={heroSlides} />
			<Products />
		</>
	);
}

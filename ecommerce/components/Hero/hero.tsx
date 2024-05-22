"use client";
import React from "react";
import Slider from "react-slick";
import Image, { StaticImageData } from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./hero.module.css";

interface HeroProps {
	slides: {
		title: string;
		description: string;
		backgroundImage: StaticImageData;
	}[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
	};

	return (
		<div className={styles.hero}>
			<Slider {...settings}>
				{slides.map((slide, index) => (
					<div key={index} className={styles.slide}>
						{slide.backgroundImage && (
							<Image
								src={slide.backgroundImage}
								alt={slide.title}
								className={styles.image}
								quality={75}
							/>
						)}
						<div className={styles.content}>
							<h1 className={styles.title}>{slide.title}</h1>
							<p className={styles.description}>{slide.description}</p>
							<button className={styles.cta}>Shop Now</button>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};
export default Hero;

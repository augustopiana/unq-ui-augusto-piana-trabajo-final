import React, { useState } from "react";
import queen from "../../assets/the-queen.webp";
import smiths from "../../assets/the-smiths.webp";
import louder from "../../assets/louder-than.webp";
import strange from "../../assets/strangeaways.webp";
import meat from "../../assets/meat.webp";
import live from "../../assets/live.webp";
import disintegration from "../../assets/disintegration.webp";
import paredes from "../../assets/paredes.webp";

import Card from "../card/card";

const images = [
	{ src: queen, alt: "Queen" },
	{ src: smiths, alt: "The Smiths" },
	{ src: louder, alt: "Louder Than Bombs" },
	{ src: strange, alt: "Strangeways, Here We Come" },
	{ src: meat, alt: "Meat" },
	{ src: live, alt: "Live" },
	{ src: disintegration, alt: "Disintegration" },
	{ src: paredes, alt: "EV" },
];

// Crear pares con un identificador único
const shuffledImagePairs = images
	.flatMap((image, index) => [
		{ ...image, id: `${image.alt}-${index}-0` },
		{ ...image, id: `${image.alt}-${index}-1` },
	])
	.sort(() => Math.random() - 0.5);

const CardGrid = () => {
	const [flippedCards, setFlippedCards] = useState([]);
	const [solvedCards, setSolvedCards] = useState([]);
	const [score, setScore] = useState(0);

	const handleCardClick = (card) => {
		if (flippedCards.includes(card) || solvedCards.includes(card)) {
			return;
		}

		const newFlippedCards = [...flippedCards, card];
		setFlippedCards(newFlippedCards);

		if (newFlippedCards.length === 2) {
			setTimeout(() => {
				if (newFlippedCards[0].src === newFlippedCards[1].src) {
					setSolvedCards((prev) => [
						...prev,
						newFlippedCards[0],
						newFlippedCards[1],
					]);
					setScore((prev) => prev + 1);
				}
				setFlippedCards([]);
			}, 1000);
		}
	};

	const isCardFlipped = (card) => {
		return flippedCards.includes(card) || solvedCards.includes(card);
	};

	return (
		<div>
			<h2 className="text-center text-2xl text-customPink font-bold mt-4">
				Pares Encontrados: {score}
			</h2>
			<div className="grid grid-cols-4 gap-4 p-4">
				{shuffledImagePairs.map((image, index) => (
					<Card
						key={index}
						image={image}
						onClick={() => handleCardClick(image)}
						isFlipped={isCardFlipped(image)}
					/>
				))}
			</div>
		</div>
	);
};

export default CardGrid;

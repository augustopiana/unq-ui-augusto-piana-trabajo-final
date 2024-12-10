import React, { useState, useEffect } from "react";
import queen from "../../assets/the-queen.webp";
import smiths from "../../assets/the-smiths.webp";
import louder from "../../assets/louder-than.webp";
import strange from "../../assets/strangeaways.webp";
import meat from "../../assets/meat.webp";
import live from "../../assets/live.webp";
import disintegration from "../../assets/disintegration.webp";
import paredes from "../../assets/paredes.webp";

import light from "../../assets/audio/light.mp3";

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

const shuffledImagePairs = images
	.flatMap((image, index) => [
		{ ...image, id: `${image.alt}-${index}-0` },
		{ ...image, id: `${image.alt}-${index}-1` },
	])
	.sort(() => Math.random() - 0.5);

const CardGrid = () => {
	const [flippedCards, setFlippedCards] = useState([]);
	const [solvedCards, setSolvedCards] = useState([]);
	const [isVictory, setIsVictory] = useState(false);
	const [score, setScore] = useState(0);
	const [currentAudio, setCurrentAudio] = useState(null);

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

	const playVictorySound = () => {
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		const audio = new Audio(light);
		setCurrentAudio(audio);
		audio.play();
	};

	useEffect(() => {
		if (solvedCards.length === shuffledImagePairs.length) {
			setIsVictory(true);
			playVictorySound();
		}
	}, [solvedCards]);

	const restartGame = () => {
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		setIsVictory(false);
		setFlippedCards([]);
		setSolvedCards([]);
		setScore(0);
		shuffledImagePairs.sort(() => Math.random() - 0.5);
	};

	return (
		<div className="game-container">
			{isVictory ? (
				<div className="victory-screen flex flex-col items-center">
					<h1 className="text-4xl font-bold text-green-500">¡Victoria!</h1>
					<button
						className="mt-4 px-4 py-2 bg-customPink text-white rounded hover:bg-green-950"
						onClick={restartGame}
					>
						Volver a jugar
					</button>
				</div>
			) : (
				<div>
					<h1 className="text-4xl font-bold text-center text-customPink">
						{" "}
						Pares Encontrados: {score}{" "}
					</h1>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
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
			)}
		</div>
	);
};

export default CardGrid;

import alive from "../../assets/images/alive.webp";
import amigos from "../../assets/images/amigos.webp";
import disintegration from "../../assets/images/disintegration.webp";
import imaginary from "../../assets/images/imaginary.webp";
import live from "../../assets/images/live.webp";
import louder from "../../assets/images/louder-than.webp";
import meat from "../../assets/images/meat.webp";
import paredes from "../../assets/images/paredes.webp";
import queen from "../../assets/images/the-queen.webp";
import ramones from "../../assets/images/ramones.webp";
import road from "../../assets/images/road.webp";
import smiths from "../../assets/images/the-smiths.webp";
import strange from "../../assets/images/strangeaways.webp";
import aerial from "../../assets/images/aerial.webp";
import nuevas from "../../assets/images/nuevas.webp";
import biblia from "../../assets/images/biblia.webp";
import massacre from "../../assets/images/massacre.webp";
import sol from "../../assets/images/sol.webp";
import juguete from "../../assets/images/juguetes.webp";
import diferentes from "../../assets/images/diferentes.webp";
import summer from "../../assets/images/summer.webp";
import stadium from "../../assets/images/stadium.webp";
import californication from "../../assets/images/californication.webp";
import way from "../../assets/images/way.webp";
import hot from "../../assets/images/hot.webp";
import you from "../../assets/images/you.webp";
import dream from "../../assets/images/dream.webp";
import division from "../../assets/images/division.webp";
import animals from "../../assets/images/animals.webp";
import moon from "../../assets/images/moon.webp";
import wall from "../../assets/images/wall.webp";
import wishyou from "../../assets/images/wishyou.webp";

import React, { useState, useEffect } from "react";

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
	{ src: alive, alt: "Alive" },
	{ src: amigos, alt: "Amigos" },
	{ src: ramones, alt: "Ramones" },
	{ src: road, alt: "Road" },
	{ src: imaginary, alt: "Imaginary" },
	{ src: massacre, alt: "Massacre" },
	{ src: biblia, alt: "Biblia" },
	{ src: aerial, alt: "Aerial" },
	{ src: nuevas, alt: "12 Nuevas" },
	{ src: sol, alt: "Sol" },
	{ src: juguete, alt: "Juguete" },
	{ src: diferentes, alt: "Diferentes" },
	{ src: summer, alt: "Summer" },
	{ src: stadium, alt: "Stadium" },
	{ src: californication, alt: "Californication" },
	{ src: way, alt: "By The Way" },
	{ src: hot, alt: "Hot" },
	{ src: you, alt: "With You" },
	{ src: dream, alt: "Dream" },
	{ src: division, alt: "Division" },
	{ src: animals, alt: "Animals" },
	{ src: moon, alt: "Moon" },
	{ src: wall, alt: "Wall" },
	{ src: wishyou, alt: "Wish You Were Here" },
];

const CardGrid = ({ gridSize }) => {
	const [flippedCards, setFlippedCards] = useState([]);
	const [solvedCards, setSolvedCards] = useState([]);
	const [isVictory, setIsVictory] = useState(false);
	const [score, setScore] = useState(0);
	const [currentAudio, setCurrentAudio] = useState(null);
	const [shuffledImagePairs, setShuffledImagePairs] = useState([]);

	const numPairs = (gridSize * gridSize) / 2;
	const selectedImages = images.slice(0, numPairs);

	useEffect(() => {
		const shuffled = [...selectedImages, ...selectedImages]
			.map((image, index) => ({ ...image, id: `${image.alt}-${index}` }))
			.sort(() => Math.random() - 0.5);
		setShuffledImagePairs(shuffled);
	}, [gridSize]);

	const isCardFlipped = (card) => {
		return (
			flippedCards.some((flipped) => flipped.id === card.id) ||
			solvedCards.some((solved) => solved.id === card.id)
		);
	};

	const handleCardClick = (card) => {
		if (flippedCards.length === 2) return;
		if (isCardFlipped(card)) return;

		const newFlippedCards = [...flippedCards, card];
		setFlippedCards(newFlippedCards);

		if (newFlippedCards.length === 2) {
			setTimeout(() => {
				const [firstCard, secondCard] = newFlippedCards;
				if (firstCard.src === secondCard.src) {
					setSolvedCards((prev) => [...prev, firstCard, secondCard]);
					setScore((prev) => prev + 1);
				}
				setFlippedCards([]);
			}, 1000);
		}
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

	const restartGame = () => {
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		setIsVictory(false);
		setFlippedCards([]);
		setSolvedCards([]);
		setScore(0);

		const shuffled = [...selectedImages, ...selectedImages]
			.map((image, index) => ({ ...image, id: `${image.alt}-${index}` }))
			.sort(() => Math.random() - 0.5);
		setShuffledImagePairs(shuffled);
	};

	useEffect(() => {
		if (solvedCards.length === selectedImages.length * 2) {
			setIsVictory(true);
			playVictorySound();
		}
	}, [solvedCards, shuffledImagePairs]);

	return (
		<div className="game-container">
			{isVictory ? (
				<div className="victory-screen flex flex-col items-center">
					<h1 className="text-4xl font-bold text-green-500">🎉 ¡Win! 🎉</h1>
					<img src={queen} alt="Queen" className="w-auto mt-16" />
					<text className="text-green-500 font-bold text-2xl">
						There is a Light That Never Goes Out - The Smiths 🎶
					</text>
					<button
						className="mt-16 px-10 py-2 bg-customPink text-white rounded hover:bg-green-950"
						onClick={restartGame}
					>
						Play Again
					</button>
				</div>
			) : (
				<div>
					<h1 className="text-4xl font-bold text-center text-customPink">
						Founded pairs: {score}/{numPairs} 🎯
					</h1>
					<div
						className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 "
						style={{
							gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
							gridTemplateRows: `repeat(${gridSize}, 1fr)`,
						}}
					>
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

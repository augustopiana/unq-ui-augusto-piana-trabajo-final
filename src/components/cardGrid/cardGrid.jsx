import React, { useState, useEffect } from "react";

import light from "../../assets/audio/light.mp3";
import cardSound from "../../assets/audio/card-sounds.mp3";
import win from "../../assets/audio/win-sound.mp3";
import menu from "../../assets/audio/menu-selection.mp3";

import images from "../../assets/images/images";
import Card from "../card/card";

import "./cardGrid.css";

const CardGrid = ({ gridSize }) => {
	const [flippedCards, setFlippedCards] = useState([]);
	const [solvedCards, setSolvedCards] = useState([]);
	const [isVictory, setIsVictory] = useState(false);
	const [score, setScore] = useState(0);
	const [currentAudio, setCurrentAudio] = useState(null);
	const [shuffledImagePairs, setShuffledImagePairs] = useState([]);

	const numPairs = (gridSize * gridSize) / 2;
	const selectedImages = images.slice(0, numPairs);

	const shuffled = [...selectedImages, ...selectedImages]
		.map((image, index) => ({ ...image, id: `${image.alt}-${index}` }))
		.sort(() => Math.random() - 0.5);

	useEffect(() => {
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

		const audio = new Audio(cardSound);
		audio.play();

		const newFlippedCards = [...flippedCards, card];
		setFlippedCards(newFlippedCards);

		if (newFlippedCards.length === 2) {
			setTimeout(() => {
				const [firstCard, secondCard] = newFlippedCards;
				if (firstCard.src === secondCard.src) {
					const audio = new Audio(win);
					audio.play();
					setSolvedCards((prev) => [...prev, firstCard, secondCard]);
					setScore((prev) => prev + 1);
				}
				setFlippedCards([]);
			}, 1000);
		}
	};

	const playVictorySound = () => {
		const winAudio = new Audio(win);
		winAudio.play();

		if (currentAudio) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		const song = new Audio(light);
		setCurrentAudio(song);
		song.play();
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

		const audio = new Audio(menu);
		audio.play();
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
					<img
						src={images[0].src}
						alt="Queen"
						className="w-auto mt-16 wincard"
					/>
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
						Finded pairs: {score}/{numPairs} 🎯
					</h1>
					<div
						className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 grid-container"
						style={{
							gridTemplateColumns: `repeat(${gridSize}, 100px)`,
							gridTemplateRows: `repeat(${gridSize}, 100px)`,
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

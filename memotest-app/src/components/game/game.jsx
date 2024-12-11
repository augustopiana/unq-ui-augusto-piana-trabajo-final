import React, { useState } from "react";
import CardGrid from "../galeriaImagenes/cardGrid";

const Game = () => {
	const [startGame, setStartGame] = useState(false);
	const [gridSize, setGridSize] = useState(0);

	const handleStartGame = (size) => {
		setGridSize(size);
		setStartGame(true);
	};

	const boardSizes = [
		{ size: 2, label: "2x2", description: "Beginner Level", emoji:"🟢"  },
		{ size: 4, label: "4x4", description: "Intermediate Level", emoji:"🟡"},
		{ size: 8, label: "8x8", description: "Expert Level", emoji:"🔴" },
	];

	return (
		<div className="h-screen flex-col items-center justify-center mt-16">
			{!startGame ? (
				<div className="flex-col items-center gap-8">
					
                    <h1 className="text-4xl font-bold text-customPink">
						Select Board Size
					</h1>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
						{boardSizes.map((board) => (
							<div
								key={board.size}
								onClick={() => handleStartGame(board.size)}
								className="cursor-pointer border rounded-lg p-4 bg-customLightGreen hover:bg-customPink shadow-md flex flex-col items-center text-center"
							>
                                <p>{board.emoji}</p>
								<h2 className="text-2xl text-customGreen font-bold">
									{board.label}
								</h2>
								<p className="text-sm text-customGreen">{board.description}</p>
							</div>
						))}
					</div>
				</div>
			) : (
				<CardGrid gridSize={gridSize} />
			)}
		</div>
	);
};

export default Game;

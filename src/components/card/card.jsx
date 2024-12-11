import "../card/card.css";

const Card = ({ image, onClick, isFlipped }) => {
	return (
		<div
			className="card-container cursor-pointer w-full aspect-square"
			onClick={onClick}
		>
			<div className={`card-inner ${isFlipped ? "" : "card-flipped"}`}>
				<div className="card-front">
					<img
						src={image.src}
						alt={image.alt}
						className="w-full h-auto object-cover"
					/>
				</div>
				<div className="card-back flex items-center justify-center text-3xl font-bold bg-gray-800 text-white rounded-lg">
					?
				</div>
			</div>
		</div>
	);
};

export default Card;

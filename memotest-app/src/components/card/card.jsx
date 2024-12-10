import "../card/card.css";

const Card = ({ image, onClick, isFlipped }) => {
  return (
    <div className="card-container cursor-pointer" onClick={onClick}>
      <div className={`card-inner ${ isFlipped ?  "" : "card-flipped"}`}>
        <div className="card-front">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="card-back">?</div>
      </div>
    </div>
  );
};

export default Card;

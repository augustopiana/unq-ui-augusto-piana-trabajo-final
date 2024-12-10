import queen from "../../assets/the-queen.webp";
import smiths from "../../assets/the-smiths.webp";
import louder from "../../assets/louder-than.webp";
import strange from "../../assets/strangeaways.webp";
import search from "https://icongr.am/clarity/search.svg?size=128&color=b9887e";
import { useState } from "react";

const imagenes = [
	{ src: queen, alt: "Queen" },
	{ src: smiths, alt: "The Smiths" },
];

const imagenesJuego = imagenes
	.flatMap((imagen) => [imagen, imagen])
	.sort(() => Math.random() - 0.5);

const GaleriaImagenes = () => {
	const [adivinados, setAdivinados] = useState([]);
	/// const [seleccionados, setSeleccionados] = useState([]);

	return (
		<div className="grid grid-cols-2 gap-4">
			{imagenesJuego.map((imagen) =>
				adivinados.includes(imagen) ? (
					<img
            key={imagen}
            src={imagen}
            alt="Imagen oculta"
            className="w-full h-auto object-cover cursor-pointer"
          />
				) : (
					<img
						key={imagen}
						src={imagen}
						alt={imagen.alt}
						className="w-full h-auto object-cover cursor-pointer"
					/>
				)
			)}
		</div>
	);
};

export default GaleriaImagenes;

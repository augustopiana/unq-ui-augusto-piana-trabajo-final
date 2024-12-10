import "./App.css";
import Game from "./components/game/game";

function App() {
	return (
		<div className="flex flex-col items-center gap-10">
			<div className="h-auto">
				<h1 className="text-center text-6xl text-customPink font-bold mt-2">
					Memotest Game
				</h1>
			</div>
			<Game/>
		</div>
	);
}

export default App;

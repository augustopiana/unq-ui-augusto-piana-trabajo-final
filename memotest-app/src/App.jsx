import "./App.css";
import Game from "./components/game/game";

function App() {
	return (
		<div className="App">
			<h1 className="text-6xl text-customPink font-bold text-center mb-8">
				Memotest Game 🧠
			</h1>
			<Game />
		</div>
	);
}
export default App;

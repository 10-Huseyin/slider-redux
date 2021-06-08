import { Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sliders from "./Pages/Sliders";
import addSlider from "./Pages/addSlider";
import editSlider from "./Pages/editSlider";

function App() {
  return (
    <div className="App">
      <Route exact path="/" strict component={Sliders} />
      <Route exact path="/add/" strict component={addSlider} />
      <Route exact path="/edit/:id" strict component={editSlider} />
    </div>
  );
}

export default App;

import "./css/App.css";
import "./css/base.css";
import "./css/TopNavBar.css";
import "./css/MenuNavBar.css";
import "./css/animations.css";
import MainContainer from "./containers/MainContainer";
import TestContainer from "./containers/TestContainer";

function App() {
    return (
        <div className="App">
            <MainContainer />
            {/* <TestContainer /> */}
        </div>
    );
}

export default App;

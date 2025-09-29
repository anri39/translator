import "./App.css";
import InputBox from "./components/InputBox";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <div className="appcontainer">
      <LanguageSelector />
      <div className="inputs-container">
        <div className="input">
          <InputBox showclearButton showwordCount />
        </div>
        <div className="output">
          <InputBox showclearButton={false} showwordCount={false} readonly />
        </div>
      </div>
    </div>
  );
}

export default App;

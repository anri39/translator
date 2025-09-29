import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const [fromLanguage, setFromLanguage] = useState<string>("");
  const [toLanguage, setToLanguage] = useState<string>("es");
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  return (
    <div className="appcontainer">
      <LanguageSelector
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
        onFromChange={setFromLanguage}
        onToChange={setToLanguage}
      />
      <div className="inputs-container">
        <div className="input">
            <InputBox
              showclearButton
              showwordCount
              value={inputText}
              onChange={setInputText}
            />
        </div>
        <div className="output">
            <InputBox
              showclearButton={false}
              showwordCount={false}
              readonly
              value={outputText}
              onChange={setOutputText}
            />
        </div>
      </div>
    </div>
  );
}

export default App;

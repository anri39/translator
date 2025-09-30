import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const [inputContent, setInputContent] = useState("");
  const [outputContent, setOutputContent] = useState("");
  const [fromWhatLanguage, setFromWhatLanguage] = useState("auto");
  const [toWhatLanguage, setToWhatLanguage] = useState("es");
  let apiKey = "Enter the api key here to use application";
  async function translate(
    fromWhatLanguage: string,
    toWhatLanguage: string,
    inputContent: string
  ): Promise<string> {
    if (!inputContent.trim()) return "";
    if (!toWhatLanguage) return "";

    try {
      const params = new URLSearchParams({
        text: inputContent,
        target_lang: toWhatLanguage.toUpperCase(),
      });

      if (fromWhatLanguage !== "auto") {
        params.append("source_lang", fromWhatLanguage.toUpperCase());
      }

      const res = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key  ${apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (!res.ok) {
        throw new Error(`Translation failed: ${res.status} ${res.statusText}`);
      }

      const data: { translations: { text: string }[] } = await res.json();
      return data.translations[0].text;
    } catch (error) {
      return "Translation failed. Please try again.";
    }
  }

  async function handleTranslate() {
    const translated = await translate(
      fromWhatLanguage,
      toWhatLanguage,
      inputContent
    );
    setOutputContent(translated);
  }

  return (
    <div className="appcontainer">
      <LanguageSelector
        fromWhatLanguage={fromWhatLanguage}
        setFromWhatLanguage={setFromWhatLanguage}
        toWhatLanguage={toWhatLanguage}
        setToWhatLanguage={setToWhatLanguage}
      />
      <div className="inputs-container">
        <div className="input">
          <InputBox
            showclearButton
            showwordCount
            textContent={inputContent}
            setTextContent={setInputContent}
            translateFunction={handleTranslate}
          />
        </div>
        <div className="output">
          <InputBox
            showclearButton={false}
            showwordCount={false}
            readonly
            textContent={outputContent}
            setTextContent={setOutputContent}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./InputBox.css";

type inputboxProps = {
  showwordCount: boolean;
  showclearButton: boolean;
  readonly?: boolean;
  textContent: string;
  setTextContent: (content: string) => void;
  translateFunction?: () => void;
};

export default function InputBox({
  showwordCount,
  showclearButton,
  readonly,
  textContent,
  setTextContent,
  translateFunction,
}: inputboxProps) {
  const [textCount, setTextCount] = useState(0);
  let maxChars = 5000;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (readonly) return;
    const newContent = event.target.value;
    if (newContent.length <= maxChars) {
      setTextContent(newContent);
      setTextCount(newContent.length);
    }
  }
  return (
    <div className="inputcontainer">
      <textarea
        className="inputbox"
        onChange={handleChange}
        value={textContent}
        readOnly={readonly}
        disabled={readonly}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && translateFunction) {
            e.preventDefault();
            await translateFunction();
          }
        }}
      />
      <button
        style={{
          display: showclearButton && textContent.length > 0 ? "block" : "none",
        }}
        className="clear-button"
        onClick={() => {
          setTextContent("");
          setTextCount(0);
        }}
      >
        X
      </button>
      <div
        className="text-count info"
        style={{ display: showwordCount ? "block" : "none" }}
      >
        {textCount} / {maxChars}
      </div>
    </div>
  );
}

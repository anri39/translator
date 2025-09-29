import { useState, useEffect } from "react";
import "./InputBox.css";

type inputboxProps = {
  showwordCount: boolean;
  showclearButton: boolean;
  readonly?: boolean;
  value: string;
  onChange: (value: string) => void;
};

export default function InputBox({
  showwordCount,
  showclearButton,
  readonly,
  value,
  onChange,
}: inputboxProps) {
  const [textCount, setTextCount] = useState(0);
  let maxChars = 5000;

  // Keep textCount in sync with value prop
  useEffect(() => {
    setTextCount(value.length);
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newContent = event.target.value;
    if (newContent.length <= maxChars) {
      onChange(newContent);
    }
  }
  return (
    <div className="inputcontainer">
      <textarea
        className="inputbox"
        onChange={handleChange}
        value={value}
        readOnly={readonly}
        disabled={readonly}
      />
      <button
        style={{
          display: showclearButton && value.length > 0 ? "block" : "none",
        }}
        className="clear-button"
        onClick={() => {
          onChange("");
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

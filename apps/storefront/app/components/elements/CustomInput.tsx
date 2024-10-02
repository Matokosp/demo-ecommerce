import React, { useState } from "react";

import { Arrow } from "./Icons";

interface InputProps {
  type: "text" | "submit";
  placeholder: string;
  submitButton: string;
}

export default function CustomInput({
  type,
  placeholder,
  submitButton,
}: InputProps) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="relative border-[1px] border-transparent border-b-gray">
      <input
        className="text-body w-[calc(100%-102px)] border-transparent bg-transparent py-[6px]"
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {type === "text" && (
        <button
          className="text-body absolute right-0 top-[6px] flex items-center gap-4 duration-300 hover:opacity-50"
          type="submit"
        >
          {submitButton}
          <Arrow />
        </button>
      )}
    </div>
  );
}

import React, { useState, FormEvent } from "react";
import {
  MessageInputForm,
  MessageInputField,
  MessageInputButton,
} from "./MessageInput.styles";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState<string>("");

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <MessageInputForm onSubmit={handleSend}>
      <MessageInputField
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <MessageInputButton type="submit">Send</MessageInputButton>
    </MessageInputForm>
  );
};

export default MessageInput;

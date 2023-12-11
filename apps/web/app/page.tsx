"use client";

import { useState } from "react";
import { useSocket } from "./context/SocketProvider";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <h1>All messages will apear here.</h1>
      </div>
      <div>
        <input
          className={styles.chat_input}
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          onClick={(e) => sendMessage(message)}
          className={styles.btn}
        >
          Send
        </button>
      </div>
      <div>
        <ul>
          {messages.map((message, idx) => (
            <li key={idx}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

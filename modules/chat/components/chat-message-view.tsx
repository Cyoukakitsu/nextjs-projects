"use client";

import { useState } from "react";
import ChatWelcomeTabs from "./chat-welcome-tabs";
import ChatMessageForm from "./chat-message-form";

type ChatMessageViewUser = {
  name: string | null;
  email: string;
  image?: string | null;
  createdAt: Date;
};

type ChatMessageViewProps = {
  user: ChatMessageViewUser | null;
};

const ChatMessageView = ({ user }: ChatMessageViewProps) => {
  const [selectedMessage, setSelectedMessage] = useState("");

  const handleMessageSelect = (message: string) => {
    setSelectedMessage(message);
  };

  const handleMessageDeselect = () => {
    setSelectedMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <ChatWelcomeTabs
        userName={user?.name ?? ""}
        onMessageSelect={handleMessageSelect}
      />
      <ChatMessageForm
        initialMessage={selectedMessage}
        onMessageChange={handleMessageDeselect}
      />
    </div>
  );
};

export default ChatMessageView;

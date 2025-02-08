import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
const Chats = () => {
  const { toTargetId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + toTargetId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages)
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, userId, toTargetId });
    socket.on("newMessageRecieved", ({ firstName, lastName,text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName,lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, toTargetId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName : user.lastName,
      userId,
      toTargetId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                msg.firstName === user.firstName
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className="chat-header">
                {msg.firstName+" "+msg.lastName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          className="flex-1 border border-gray-600 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;

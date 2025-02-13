import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { formatTimestamp } from "./utils/curTime";
import { useLocation } from "react-router-dom";

const Chats = () => {
  const location = useLocation();
  const { toTargetId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionDetails, setConnectionDetails] = useState({
    firstName: "",
    lastName: "",
    photo: "",
  });
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (location.state) {
      setConnectionDetails(location.state);
    }
  }, [location.state]);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + toTargetId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        time: formatTimestamp(createdAt),
      };
    });
    setMessages(chatMessages);
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
    socket.on(
      "newMessageRecieved",
      ({ firstName, lastName, text, createdAt }) => {
        setMessages((messages) => [
          ...messages,
          {
            firstName,
            lastName,
            text,
            time: formatTimestamp(createdAt || Date.now()),
          },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, toTargetId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      toTargetId,
      text: newMessage,
      createdAt: Date.now(),
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg overflow-hidden">
      {/* Header Section with Profile Picture */}
      <div className="flex items-center gap-4 p-5 border-b border-gray-600 bg-gray-800 text-white">
        <img
          src={connectionDetails?.photo
            ? `${BASE_URL}/${connectionDetails.photo}`
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-lg font-semibold">
          {connectionDetails.firstName + " " + connectionDetails.lastName}
        </h1>
      </div>
      {/* Messages Section */}
      <div className="flex-1 overflow-auto p-5 bg-gray-900 text-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.firstName === user.firstName ? "items-end" : "items-start"
            }`}
          >
            <div className="chat-header text-sm text-gray-400">
              {msg.firstName + " " + msg.lastName}
              <time className="text-xs opacity-50 ml-2">{msg.time}</time>
            </div>
            <div
              className={`chat-bubble p-3 rounded-lg text-white ${
                msg.firstName === user.firstName ? "bg-blue-500" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
            <div className="chat-footer text-xs text-gray-400 opacity-50">
              {msg.firstName === user.firstName ? "Sent" : ""}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2 bg-gray-800">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          className="flex-1 border border-gray-600 text-white rounded-lg p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary px-4 py-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;

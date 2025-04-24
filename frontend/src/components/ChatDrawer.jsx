import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../utils/socket";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

const ChatDrawer = ({
  open,
  onOpenChange,
  complaintId,
  complaintUserId,
  complaintOfficerId,
}) => {
  const { user } = useUser();
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket.current || !complaintId) return;

    console.log("Joining room:", complaintId);
    socket.current.emit("joinRoom", complaintId);

    socket.current.on("newMessage", (msg) => {
      console.log("New message received:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.current.off("newMessage");
    };
  }, [complaintId, socket]);

  const sendMessage = () => {
    if (newMsg.trim() && user) {
      const payload = {
        complaintId,
        senderId: user.id,
        citizenId: complaintUserId,
        officerId: complaintOfficerId,
        message: newMsg,
      };

      console.log("Sending message:", payload);
      socket.current.emit("sendMessage", payload);
      setNewMsg("");
    } else {
      console.log("User not authorized to send message or message is empty.");
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="right-0 left-auto w-full max-w-md h-full fixed top-0 z-50 border-l bg-white shadow-lg flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Chat with Officer</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg w-fit max-w-[80%] ${
                msg.senderId === user?.id
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start text-left"
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <DrawerFooter className="border-t p-4 flex gap-2 mb-8">
          <input
            className="flex-1 border rounded-lg p-2"
            placeholder="Type a message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
          />
          <Button onClick={sendMessage}>Send</Button>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;

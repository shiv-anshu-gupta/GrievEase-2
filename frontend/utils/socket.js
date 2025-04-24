import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
const serverUrl = import.meta.env.VITE_SERVER_URL;
const SOCKET_URL = `${serverUrl}`; // adjust if needed

export const useSocket = () => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(SOCKET_URL, {
      withCredentials: true,
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return socket;
};

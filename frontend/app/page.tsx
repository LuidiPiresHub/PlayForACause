'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import api from './axios/api';

interface IMessages {
  message: string;
  userId: string;
  username: string;
}

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const bottomRef = useRef() as React.MutableRefObject<HTMLDivElement>;


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }
    setToken(JSON.parse(storedToken));
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      const { data } = await api.get('/messages');
      setMessages(data);
    };
    fetchMessages();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    const socketConnection = io(API_URL);
    setSocket(socketConnection);

    socketConnection.on('backend', (data: IMessages) => {
      const { message, userId, username } = data;
      setMessages((prevState) => [...prevState, { message, userId, username }]);
    });

    return () => {
      if (socketConnection.connected) {
        socketConnection.disconnect();
      }
    };
  }, [token]);

  useEffect(() => {
    const scrollDown = () => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollDown();
  }, [messages]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() !== '' && socket) {
      socket.emit('message', { message, token });
      setMessage('');
    }
  };

  return (
    <main className='h-screen flex'>
      <section className='flex flex-col justify-between items-center p-4 w-full gap-4'>
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        <section className="border border-black rounded-sm w-full h-full flex flex-col p-4 overflow-y-auto">
          {messages.map(({ message, userId, username }, index) => (
            <div key={index} className={`mb-4 p-2 rounded-md w-fit break-all ${userId === socket?.id ? 'self-end bg-blue-200' : 'bg-slate-300'}`}>
              <span className="messageUser font-semibold text-blue-500">{username}:</span>
              <p>{message}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </section>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className="chatType border border-gray-300 rounded-md p-2 flex-1"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
          />
          <button
            type="submit"
            className="sendBtn bg-blue-500 text-white rounded-md p-2 cursor-pointer"
          >
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
}

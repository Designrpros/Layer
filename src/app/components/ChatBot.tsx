// components/ChatBot.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { CSSProperties } from "react";


// === Theme ===
const theme = {
  colors: {
    background: "#fdf6e3",
    primary: "#2A2A2A",
  },
};


// Styled Components
const ChatbotButton = styled.button`
  background: var(--color-primary);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: var(--color-text-dark);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;

  &:hover {
    background: #e0d8c3; // Consider adding as --color-hover in globals.css
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const ChatWindow = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  width: 350px;
  height: 450px;
  background: #fdf6e3;
  border: 1px solid black;
  border-radius: 8px;
  position: fixed;
  bottom: 90px;
  right: 20px;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 300px;
    height: 400px;
  }

  @media (max-width: 400px) {
    width: 90%;
    height: 350px;
    right: 5%;
  }
`;

const ChatHeader = styled.div`
  background: var(--color-primary);
  color: var(--color-text-dark);
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--color-background-light);
  border-radius: 4px 4px 0 0;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-background-light);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-background-light);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 4px;
  }
`;

const UserMessage = styled.div`
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  background: var(--color-primary);
  color: var(--color-text-dark);
  border-radius: 8px;
  max-width: 80%;
  align-self: flex-end;
  overflow-wrap: break-word;

  & > p {
    margin: 0;
  }
`;

const BotMessage = styled.div`
  margin: 0.5rem 0;
  color: var(--color-text-light);
  max-width: 80%;
  align-self: flex-start;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > p {
    margin: 0;
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background: var(--color-background-light);
  border-top: 1px solid var(--color-primary);
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  font-size: 1rem;
  background: var(--color-background-light);
  color: var(--color-text-light);
  outline: none;
  max-width: 100%;
  overflow-wrap: break-word;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 5px rgba(28, 37, 38, 0.3);
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: var(--color-text-dark);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--color-background-dark);
  }

  &:disabled {
    background: var(--color-background-dark);
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 1rem;
  text-align: center;
  margin: 1rem 0;
  max-width: 100%;
  overflow-wrap: break-word;

  & > p {
    margin: 0;
  }
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 700;
  color: ${theme.colors.background};
  transition: color 0.3s ease;
  flex-shrink: 0;
  z-index: 1001;

  &:hover {
    color: #e0d8c3;
  }
`;

const LogoDark = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 700;
  color: ${theme.colors.primary};
  transition: color 0.3s ease;
  flex-shrink: 0;
  z-index: 1001;

  &:hover {
    color: #e0d8c3;
  }
`;

const syntaxHighlighterStyle: { [key: string]: CSSProperties } = vscDarkPlus;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat history when new messages are added
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
  
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error("OpenRouter API key is not configured");
      }
  
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://prompted-two.vercel.app",
          "X-Title": "Prompted",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick:free",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: input,
                },
              ],
            },
          ],
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Log the full response for debugging
  
      if (!data.choices || !Array.isArray(data.choices) || !data.choices[0]?.message?.content) {
        throw new Error("Unexpected API response format: " + JSON.stringify(data));
      }
  
      const aiResponse = data.choices[0].message.content;
      setMessages((prev) => [...prev, { text: aiResponse, isUser: false }]);
    } catch (err: any) {
      setError(`Failed to get a response: ${err.message}`);
      console.error("Error details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      <ChatbotButton onClick={() => setIsOpen(!isOpen)}>
      <Logo>...</Logo>
      </ChatbotButton>
      <ChatWindow $isOpen={isOpen}>
        <ChatHeader>Chatbot</ChatHeader>
        <ChatHistory ref={chatHistoryRef}>
          {messages.length === 0 && !isLoading && !error && (
            <BotMessage>
              <LogoDark>...</LogoDark>
              <p>Welcome to the Prompted Chatbot! How can I assist you today?</p>
            </BotMessage>
          )}
          {messages.map((message, index) =>
            message.isUser ? (
              <UserMessage key={index}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.text}
                </ReactMarkdown>
              </UserMessage>
            ) : (
              <BotMessage key={index}>
                  <LogoDark>...</LogoDark>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={vscDarkPlus}
                          customStyle={{
                            marginTop: "1rem",
                            borderRadius: "4px",
                            padding: "1rem",
                            backgroundColor: "#1f2937",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </BotMessage>
            )
          )}
          {isLoading && (
            <BotMessage>
              <Logo>...</Logo>
              Thinking...
            </BotMessage>
          )}
          {error && (
            <ErrorMessage>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{error}</ReactMarkdown>
            </ErrorMessage>
          )}
        </ChatHistory>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={isLoading}
          />
          <SendButton onClick={handleSend} disabled={isLoading}>
            Send
          </SendButton>
        </ChatInputContainer>
      </ChatWindow>
    </>
  );
};

export default Chatbot;
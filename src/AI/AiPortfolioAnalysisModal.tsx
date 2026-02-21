import { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AiPortfolioAnalysisModalProps {
  onClose: () => void;
  loading: boolean;
  error: string | null;
  conversation: ChatMessage[];
  onSendQuestion: (question: string) => void;
}

export function AiPortfolioAnalysisModal({
  onClose,
  loading,
  error,
  conversation,
  onSendQuestion,
}: AiPortfolioAnalysisModalProps) {

  const [userInput, setUserInput] = useState("");
  const [typingText, setTypingText] = useState("");
  const [currentAiMessageId, setCurrentAiMessageId] = useState<string | null>(null);

  // Typing effect
  useEffect(() => {
    const lastMessage = conversation[conversation.length - 1];
    if (!lastMessage || lastMessage.role !== "assistant") return;

    setTypingText("");
    setCurrentAiMessageId(lastMessage.id);

    let index = 0;
    const interval = setInterval(() => {
      setTypingText(prev => prev + lastMessage.content.charAt(index));
      index++;
      if (index >= lastMessage.content.length) {
        clearInterval(interval);
        setCurrentAiMessageId(null);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [conversation]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="fixed inset-0 z-[998] flex items-end">
      <div className="bg-white2 absolute w-full bottom-0 top-2 rounded-t-2xl px-6 overflow-y-auto ">

        {/* Header */}
        <div className="fixed bg-white2 shadow-lg shadow-white2 rounded-t-2xl left-0 h-20 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 mx-5">
            <span
              className={`ai-icon-border bg-white rounded-full`}
            >
              <AutoAwesomeIcon style={{ color: "#1B98E0" }}/>  
            </span>
            <span className="text-darkerGray font-semibold">
              AI Portfolio Analysis
            </span>
          </div>

          <button
            className="bg-gray rounded-full h-8 w-8 absolute right-10 text-white2"
            onClick={onClose}
          >
            <KeyboardArrowDownIcon />
          </button>
        </div>

        {/* Chat */}
        <div className="mt-20 pb-40 divide-y divide-gray/15">
          {conversation.map((message) => (
            <div key={message.id} className="py-4">
              <div
                className={`inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full ${
                  message.role === "user"
                    ? "bg-gray/10 text-darkerGray"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {message.role === "user" ? "You" : "AI Assistant"}
              </div>

              <div className="text-sm text-darkerGray mt-2 whitespace-pre-line">
                {currentAiMessageId === message.id
                  ? typingText
                  : message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="py-4 animate-pulse">
              <div className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
                AI Assistant
              </div>
              <div className="text-sm text-darkerGray mt-2">Analyzing...</div>
            </div>
          )}

          {error && <div className="text-red py-4">{error}</div>}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-gray/15 shadow-sm rounded-xl p-4 flex justify-between gap-2 backdrop-blur-md">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask about your portfolio..."
            className="px-4 bg-transparent w-full text-sm outline-none"
          />

          <button
            disabled={!userInput.trim() || loading}
            className={`rounded-full p-2 transition ${
              userInput.trim() && !loading
                ? "text-primary"
                : "text-gray"
            }`}
            onClick={() => {
              onSendQuestion(userInput);
              setUserInput("");
            }}
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}

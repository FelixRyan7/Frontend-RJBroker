import type { AiTermResponse, ChatMessage } from "../@types/ai";
import { Loader } from "../components/utils/Loader";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import '../styles/styles.css';
import { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';

interface MetricItem {
  label: string;
  value: number | undefined;
  key: string;
}
 
interface AiExplanationModalProps {
  onClose: () => void;
  loading: boolean;
  error: string | null;
  conversation: ChatMessage[];
  metrics: MetricItem[];
  usedMetrics: string[]; 
  onMetricClick: (termKey: string) => void;       // handler para clicks en métricas
  onSendQuestion: (question: string) => void;
}
 
 export function AiExplanationModal({ onClose, loading, error, conversation, metrics, usedMetrics, onMetricClick, onSendQuestion }: AiExplanationModalProps) {

  const [userInput, setUserInput] = useState("");
  const [typingText, setTypingText] = useState("");
  const [currentAiMessageId, setCurrentAiMessageId] = useState<string | null>(null);

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
      <div className="bg-white absolute w-full bottom-0 top-12 rounded-t-2xl p-6 overflow-y-auto">
    
        <div className="fixed bg-white shadow-lg shadow-white h-[75px] left-0 w-full top-12 rounded-md  z-[999]">
        <div className="flex justify-between items-center mb-4">
          <div className="">
            <span
              className={`fixed top-[70px] left-8 z-50 ai-button w-8 h-8 rounded-full`}
            >
              <AutoAwesomeIcon style={{ color: "#1B98E0" }}/> 
              
            </span>
            <span className="fixed left-[60px] top-[73px] text-darkerGray filter bg-white/80 backdrop-blur-sm rounded-full w-[80px] text-center">Ask AI</span>
          </div>
           
          <button className="fixed right-5 top-[70px] bg-gray rounded-full h-8 w-8 text-white" onClick={onClose}><KeyboardArrowDownIcon/></button>
        </div>
        </div>

        {conversation.length > 0 && (
          <div className="mt-20 pb-40 divide-y divide-gray/15">
            {conversation.map((message) => (
              <div key={message.id} className="py-4">
                {/* Header */}
                <div className={`inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full ${
                                message.role === "user"
                                ? "bg-gray/10 text-darkerGray"
                                : "bg-primary/10 text-primary"
                                }`
                              }>
                  {message.role === "user" ? "You" : "AI Assistant"}
                </div>

                {/* Content */}
                <div className="text-sm text-darkerGray mt-2 whitespace-pre-line">
                  {currentAiMessageId === message.id ? typingText : message.content}
                </div>
              </div>
            ))}
            {/* Loader como mensaje AI */}
              {loading && (
                <div className="py-4 animate-pulse">
                  <div className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
                    AI Assistant
                  </div>
                  <div className="text-sm text-darkerGray mt-2">Typing...</div>
                </div>
              )}
              {error && (
                <div className="text-red py-4">{error}</div>                
              )}
              <div ref={bottomRef} />
          </div>
        )}

      <div className="bg-white/20 w-full left-1/2 -translate-x-1/2 backdrop-blur-md fixed bottom-0 h-40">
        {/* Other Termkeys */}
        <div className=" w-[90%] left-1/2 -translate-x-1/2 fixed bottom-28 h-12 flex  items-center border-b border-t border-gray/20 text-gray overflow-x-auto overflow-y-hidden hide-scrollbar">
        <span className="flex-shrink-0 text-sm whitespace-nowrap mr-2">Other metrics: </span>
          {metrics
          .filter((metric) => !usedMetrics.includes(metric.key))
          .map((metric) => (
            <span
              key={metric.key}
              className=" flex-shrink-0 text-sm whitespace-nowrap mr-3 bg-gray/15 backdrop-blur-md text-gray p-1 px-2 rounded-full font-semibold cursor-pointer"
              onClick={() => onMetricClick(metric.key)}
            >
              {metric.label}
            </span>
          ))}
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-gray/15 shadow-sm shadow-gray rounded-xl p-4 flex justify-between gap-2 backdrop-blur-md">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask something..."
            className=" px-4 bg-transparent w-full text-sm outline-none"
          />

          <button
            disabled={!userInput.trim() || loading}
            className={`rounded-full p-2 transition ${
              userInput.trim() && !loading
              ? "text-primary"
              : "text-gray"
              }`
            }
            onClick={() => {
              onSendQuestion(userInput); 
              setUserInput("");
            }}
          >
            <SendIcon fontSize="small"/>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}


export type MessageType = "success" | "error" | "info" | "warning";

type messageProps = {
  type: MessageType;
  text: string;
}

export const ToastMessage: React.FC<messageProps> = ({ type , text }) => {
  const baseStyle =
    "p-3 rounded-md font-bold text-sm mb-4 transition-all duration-200";

  const colors: Record<MessageType, string> = {
    success: "bg-green-100 text-green-800 border-green-300 border-l-8",
    error: "bg-red-100 text-red-800 border-red-300 border-l-8",
    info: "bg-blue-100 text-blue-800 border-blue-300 border-l-8",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300 border-l-8",
    
  };

  return <div className={`${baseStyle} ${colors[type]}`}>{text}</div>;
};
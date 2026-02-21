import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import '../styles/styles.css';

interface AiTermProps {
  label: string;
  value: string | number | undefined;
  termKey: string; // "marketCap", "dividend", etc
  aiMode: boolean;
  onClick: (term: string) => void;
}

export function AiTerm({ label, value, termKey, aiMode, onClick }: AiTermProps) {
  const isClickable = aiMode;

  return (
    <div
      onClick={() => isClickable && onClick(termKey)}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          onClick(termKey);
        }
      }}
      className={`
        flex justify-between items-center px-2 py-1
        rounded-md transition-colors duration-200
        ${isClickable ? "cursor-pointer bg-white hover:bg-blue-50" : ""}
      `}
    >
      <div className="flex gap-2 items-center">
        <span
          className={`text-sm font-semibold transition-colors duration-200
            ${isClickable ? "text-primary hover:text-blue-700" : "text-gray"}
          `}
        >
          {label}
        </span>

        {/* Icono o placeholder invisible para evitar salto */}
        <span className="inline-flex w-5 h-5">
          {isClickable && (
            <AutoAwesomeIcon sx={{ fontSize: 20, color: "#1B98E0" }} />
          )}
        </span>
      </div>

      <span className="text-dark font-semibold">
        {value}{['dividendAmount', 'marketCap', 'netIncome'].includes(termKey) ? "€" : ""}
      </span>
    </div>
  );
}



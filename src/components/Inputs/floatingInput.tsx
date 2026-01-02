

type InputFloatingProps = {
  id: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputFloating({
  id,
  label,
  type = "text",
  icon,
  value,
  onChange,
}: InputFloatingProps) {
    const isFilled = value.trim().length > 0;
  return (
    <div className="flex h-20 items-center gap-3 relative">
      {icon && <div className="text-gray">{icon}</div>}

      <div className="relative w-full">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="peer mb-2 p-2 w-full border-b-2 focus:border-primary border-gray bg-transparent focus:outline-none text-base"
        />

        <label
          htmlFor={id}
          className={`absolute text-gray left-2 top-2 transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:-left-1 peer-focus:text-xs peer-focus:text-primary
            ${isFilled && 'top-[-10px] -left-1 text-xs text-gray'}`}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

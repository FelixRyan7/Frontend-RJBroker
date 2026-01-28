import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type InputFloatingRHFProps = {
  id: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  register: UseFormRegisterReturn;
  error?: string;
  value?: string; 
  list?: string;
  options?: Option[];
  disabled?: boolean;
};

export default function InputFloatingRHF({
  id,
  label,
  type = "text",
  icon,
  register,
  error,
  value,
  list,
  options = [],
  disabled = false,
}: InputFloatingRHFProps) {

  const isFilled = !!(value && value.trim().length > 0);
  const isDateInput = type === "date";
  const isSelectInput = type === "select";

  return (
    <div className="flex h-24 items-center gap-3 relative">
      {icon && <div className="text-gray">{icon}</div>}

      <div className={`relative w-full ${disabled ? "opacity-40" : ""}`}>
        {type === "select" ? (
          <select
            id={id}
            {...register}
            disabled={disabled}
            className={`peer mb-2 p-2 w-full border-b-2 bg-transparent text-base
              focus:outline-none focus:border-primary
              ${disabled ? "bg-primary cursor-not-allowed" : ""}
              ${error ? "border-red-500" : "border-gray"}`}
              
          >
            <option value="">Selecciona una opcion</option>
              {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
    ))}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            list={list}
            {...register}
            className={`peer mb-2 p-2 w-full border-b-2 bg-transparent text-base
              focus:outline-none focus:border-primary
              ${error ? "border-red-500" : "border-gray"}`}
          />
        )}

        <label
          htmlFor={id}
          className={`absolute -left-2 -top-2 text-gray transition-all duration-200 ease-in-out
            peer-focus:-top-2 peer-focus:-left-1 text-xs peer-focus:text-primary
            ${(isFilled || isDateInput || isSelectInput) ? "-top-2 -left-1 text-xs text-gray" : ""}`}
        >
          {label}
        </label>

        {error && (
          <p className="text-red-500 text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

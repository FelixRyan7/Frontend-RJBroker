import React, { useState } from "react";
import { getCountryName } from "../../helpers/codeToCountry";
import DoneIcon from '@mui/icons-material/Done';

type FilterBottomSheetProps = {
  type: string; // "country" | "market" | "sector"
  options: string[];
  selected: string[];
  conditioningFilters?: Record<string, string[]>;
  onChange: (values: string[]) => void;
  onClose: () => void;
};

export default function FilterBottomSheet({
  type,
  options,
  selected,
  conditioningFilters = {},
  onChange,
  onClose,
}: FilterBottomSheetProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selected || []);

  const toggleValue = (value: string) => {
    setLocalSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleApply = () => {
    onChange(localSelected);
    onClose();
  };

  const handleClear = () => {
    setLocalSelected([]);
  };

 const isApplyDisabled = () => {
  // deshabilitar Apply si no hay cambios respecto al filtro recibido por props
  return arraysEqual(localSelected, selected);
};

// función para comparar arrays
const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  return a.every(val => b.includes(val));
};


  // Filtra options según los filtros activos (conditioningFilters) excepto el actual
  const filteredOptions = options.filter(opt => {
    // En esta versión dejamos todo simple, porque AssetsList ya filtra según los filtros
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-white2 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 ">
        <h2 className="font-bold text-lg">{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <button onClick={onClose} className="text-gray-500 font-bold text-xl">✕</button>
      </div>

      {/* Condicionado de filtros */}
      <div className="flex flex-wrap gap-2 p-4">
        {Object.entries(conditioningFilters).map(([key, val]) => {
          if (!val || val.length === 0 || key === type) return null;
          return (
            <div
              key={key}
              className="bg-gray-200 text-gray px-2 py-1 rounded-full text-sm"
            >
            {key.charAt(0).toUpperCase() + key.slice(1)}: {val.join(", ")}
            </div>
          );
        })}
      </div>

      {/* Options list */}
      <div className="flex-1 overflow-y-auto p-5 ">
        {filteredOptions.map(opt => {
          const isChecked = localSelected.includes(opt);
          return (
            <label
              key={opt}
              className="flex mb-4 items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
            >
              <span className="font-semibold ">{type === "country" ? getCountryName(opt) : opt }</span>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleValue(opt)}
                className="w-5 h-5 accent-primary"
              />
            </label>
          );
        })}
      </div>

      {/* Buttons */}
      <div className={`flex p-8 gap-4`}>
        {localSelected.length > 0 && (
          <button
            onClick={handleClear}
            className="flex-1 bg-gray/80 text-white2 font-bold text-left p-4 rounded-md transition-colors hover-bg-gray"
          >
            Clear
          </button>
        )}
        <button
          onClick={handleApply}
          disabled={isApplyDisabled()}
          className={`flex justify-between py-4 rounded-md text-white transition-colors p-4 text-left font-bold w-1/2 ml-auto
            ${isApplyDisabled()
              ? 'bg-primary opacity-40 cursor-not-allowed ' 
              : 'bg-primary hover:bg-primary/90  '}`}
        >
          <span>Apply</span> <span className="text-end"><DoneIcon/></span>
        </button>
      </div>
    </div>
  );
}

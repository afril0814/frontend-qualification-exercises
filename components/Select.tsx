import React, { useState, useRef, useEffect } from "react";


interface Option {
    value: string;
    label: string;
  }
  
  
interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left  ${className}`} ref={dropdownRef} >
      <button
        type="button"
        className="inline-flex justify-between items-center w-48 px-4 py-2  border text-secondary text-xs font-medium rounded-md hover:bg-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <svg className="w-4 h-4 ml-2 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-[#0A1117] rounded-md shadow-lg">
          <ul className="py-1 text-xs text-white">
          {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                {option.label}
              </li>
            ))}

          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

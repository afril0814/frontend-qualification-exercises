import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search } from "lucide-react";

interface DropdownSelectionProps {
    label: string;
    placeholder: string;
    options: string[];
    selectedOption: string | null;
    onSelectionChange: (selected: string | null) => void;
}

const DropdownSelection: React.FC<DropdownSelectionProps> = ({
    placeholder,
    options,
    selectedOption,
    onSelectionChange,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(
        () => options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase())),
        [searchTerm, options]
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSelection = (option: string) => {
        onSelectionChange(option === selectedOption ? null : option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full mx-2">
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={selectedOption || searchTerm}
                    onFocus={() => setIsOpen(true)}
                    onChange={handleSearch}
                    className="w-full bg-[#0A171D] text-secondary text-xs border rounded-lg border-secondary px-4 py-2 pr-10"
                />

                <Search className="absolute right-3 top-3 text-gray-400 w-3 h-3" />
            </div>

            {isOpen && (
                <div className="absolute mt-2 bg-[#111] w-full rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto border border-gray-700">
                    {filteredOptions.map((option) => (
                        <label
                            key={option}
                            className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-gray-800"
                        >
                            <input
                                type="checkbox"
                                name="dropdown-selection"
                                checked={selectedOption === option}
                                onChange={() => handleSelection(option)}
                                className="w-4 h-4"
                            />
                            <span className="text-yellow-400 text-xs break-all">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownSelection;
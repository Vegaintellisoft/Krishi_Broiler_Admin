import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi"; // dropdown arrow icon

export const CustomDropdown = ({ label, options, value, onChange, name, statusColor, isDisabled }) => {
    const [search, setSearch] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(opt =>
        opt?.label?.toLowerCase()?.includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full max-w-md " ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

            <div
                onClick={() => {
                    if (!isDisabled) setShowOptions(!showOptions);
                }}
                className={`cursor-pointer p-3 bg-gray-100 rounded-md flex items-center justify-between h-13 overflow-hidden 
    ${statusColor} `}
            >
                <span className="truncate w-[90%]">
                    {value ? options.find(o => o.value === value)?.label : `Select ${label || name}`}
                </span>
                {!isDisabled && <FiChevronDown className="ml-2 text-gray-500" />}
            </div>


            {showOptions && (
                <div className="absolute z-50 mt-1 w-full break-words bg-white shadow  rounded-md max-h-56 overflow-y-auto">
                    <input
                        type="text"
                        placeholder={`Search ${label}...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-2 border-b outline-none"
                    />
                    {filteredOptions.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                if (option?.isAvail ?? true) {
                                    onChange(option.value);
                                    setShowOptions(false);
                                    setSearch('');
                                }
                            }}
                            className={`px-4 py-2 border-b cursor-pointer ${(option?.isAvail ?? true)
                                    ? 'hover:bg-gray-100'
                                    : 'opacity-50 cursor-not-allowed'
                                }`}
                        >
                            {option.label}
                        </div>

                    ))}
                    {filteredOptions.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">No matches found</div>
                    )}
                </div>
            )}
        </div>
    );
};

import { useState } from "react";
import { useFetchData } from "@/utils/useFetchData";

interface DropdownProps {
  label: string;
  apiEndpoint: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, apiEndpoint, selectedValue, onChange }) => {
  const { data, loading, error } = useFetchData<{ _id: string; name: string }[]>(apiEndpoint);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
      >
        {loading ? "Loading..." : data?.find((item) => item._id === selectedValue)?.name || "Select an option"}
        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {error ? (
            <p className="px-4 py-2 text-sm text-red-600">{error}</p>
          ) : (
            <ul className="max-h-40 overflow-y-auto">
              {data?.map((item) => (
                <li
                  key={item._id}
                  onClick={() => {
                    onChange(item._id);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-100 ${
                    selectedValue === item._id ? "bg-blue-200" : ""
                  }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

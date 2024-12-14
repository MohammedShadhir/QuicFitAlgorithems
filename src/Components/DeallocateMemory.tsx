import React from "react";
import Swal from "sweetalert2";

interface DeallocateMemoryProps {
  blockSize: number | "";
  setBlockSize: React.Dispatch<React.SetStateAction<number | "">>;
  blockName: string;
  setBlockName: React.Dispatch<React.SetStateAction<string>>;
  deallocate: (size: number, block: string) => void;
}

const DeallocateMemory: React.FC<DeallocateMemoryProps> = ({
  blockSize,
  setBlockSize,
  blockName,
  setBlockName,
  deallocate,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Deallocate Memory
      </h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Block size (8, 16, 32)"
          value={blockSize}
          onChange={(e) => setBlockSize(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        />
        <input
          type="text"
          placeholder="Block name (e.g., Block_A)"
          value={blockName}
          onChange={(e) => setBlockName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        />
        <button
          onClick={() => {
            if (typeof blockSize === "number" && blockName) {
              deallocate(blockSize, blockName);
              setBlockSize("");
              setBlockName("");
            } else {
              Swal.fire({
                icon: "error",
                title: "Invalid input",
                text: "Please enter a valid block size and block name.",
                confirmButtonText: "OK",
              });
            }
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Deallocate
        </button>
      </div>
    </div>
  );
};

export default DeallocateMemory;

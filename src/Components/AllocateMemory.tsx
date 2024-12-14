import React from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

interface AllocateMemoryProps {
  blockSize: number | "";
  setBlockSize: React.Dispatch<React.SetStateAction<number | "">>;
  allocate: (size: number) => string | null;
}

const AllocateMemory: React.FC<AllocateMemoryProps> = ({
  blockSize,
  setBlockSize,
  allocate,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Allocate Memory
      </h2>
      <div className="flex space-x-4">
        <input
          type="number"
          placeholder="Block size (8, 16, 32)"
          value={blockSize}
          onChange={(e) => setBlockSize(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={() => {
            if (typeof blockSize === "number") {
              const block = allocate(blockSize);
              if (block) {
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: `Allocated ${block}`,
                  confirmButtonText: "OK",
                });
              }
              setBlockSize("");
            } else {
              Swal.fire({
                icon: "error",
                title: "Invalid block size",
                text: "Please enter a valid block size.",
                confirmButtonText: "OK",
              });
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Allocate
        </button>
      </div>
    </div>
  );
};

export default AllocateMemory;

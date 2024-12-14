import React, { useState } from "react";
import Swal from "sweetalert2";
import AllocateMemory from "./AllocateMemory";
import DeallocateMemory from "./DeallocateMemory";
import ViewFreeLists from "./ViewFreeLists";

interface QuickFitAllocatorProps {
  blockSizes: number[];
  initialMemory: Record<number, number>;
}

const QuickFitAllocator: React.FC<QuickFitAllocatorProps> = ({
  blockSizes,
  initialMemory,
}) => {
  // Free lists state
  const [freeLists, setFreeLists] = useState<Record<number, string[]>>(() => {
    const initialFreeLists: Record<number, string[]> = {};
    blockSizes.forEach((size) => {
      initialFreeLists[size] = Array.from(
        { length: initialMemory[size] || 0 },
        (_, i) => `Block_${String.fromCharCode(65 + i)}`
      );
    });
    return initialFreeLists;
  });

  // Allocated blocks state
  const [allocatedBlocks, setAllocatedBlocks] = useState<
    Record<number, string[]>
  >({});

  const allocate = (size: number): string | null => {
    if (freeLists[size]?.length > 0) {
      const block = freeLists[size][0];
      setFreeLists((prev) => ({
        ...prev,
        [size]: prev[size].slice(1),
      }));
      setAllocatedBlocks((prev) => ({
        ...prev,
        [size]: [...(prev[size] || []), block],
      }));
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Allocated ${block}`,
        confirmButtonText: "OK",
      });
      return block;
    } else {
      Swal.fire({
        icon: "error",
        title: "No free blocks available",
        text: `No free block available for size ${size}.`,
        confirmButtonText: "OK",
      });
      return null;
    }
  };

  const deallocate = (size: number, block: string): void => {
    if (allocatedBlocks[size]?.includes(block)) {
      // Remove from allocatedBlocks
      setAllocatedBlocks((prev) => ({
        ...prev,
        [size]: prev[size].filter((b) => b !== block),
      }));

      // Add back to freeLists
      setFreeLists((prev) => ({
        ...prev,
        [size]: [...prev[size], block],
      }));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Deallocated ${block}`,
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Block",
        text: `Block ${block} is not currently allocated.`,
        confirmButtonText: "OK",
      });
    }
  };

  const [action, setAction] = useState<"allocate" | "deallocate" | "view" | "">(
    ""
  );
  const [blockSize, setBlockSize] = useState<number | "">("");
  const [blockName, setBlockName] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Quick Fit Memory Allocation
        </h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setAction("allocate")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Allocate Memory
          </button>
          <button
            onClick={() => setAction("deallocate")}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Deallocate Memory
          </button>
          <button
            onClick={() => setAction("view")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Display Free Lists
          </button>
        </div>

        {action === "allocate" && (
          <AllocateMemory
            blockSize={blockSize}
            setBlockSize={setBlockSize}
            allocate={allocate}
          />
        )}

        {action === "deallocate" && (
          <DeallocateMemory
            blockSize={blockSize}
            setBlockSize={setBlockSize}
            blockName={blockName}
            setBlockName={setBlockName}
            deallocate={deallocate}
          />
        )}

        {action === "view" && <ViewFreeLists freeLists={freeLists} />}
      </div>
    </div>
  );
};

export default QuickFitAllocator;

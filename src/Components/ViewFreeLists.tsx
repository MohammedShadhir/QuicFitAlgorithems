import React, { useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

interface ViewFreeListsProps {
  freeLists: Record<number, string[]>;
}

const ViewFreeLists: React.FC<ViewFreeListsProps> = ({ freeLists }) => {
  const renderFreeLists = (): JSX.Element[] =>
    Object.entries(freeLists).map(([size, blocks]) => (
      <div key={size} className="mb-4">
        <strong className="text-lg font-semibold text-blue-600">
          Size {size}:
        </strong>{" "}
        <span className="text-green-600 text-lg font-semibold ml-4">
          {blocks.length > 0 ? blocks.join(", ") : "No blocks available"}
        </span>
      </div>
    ));

  // Trigger SweetAlert when component is rendered
  useEffect(() => {
    if (Object.values(freeLists).some((blocks) => blocks.length > 0)) {
      Swal.fire({
        icon: "info",
        title: "Free Lists Loaded",
        text: "The free lists have been successfully loaded.",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "No Blocks Available",
        text: "There are no free blocks available at the moment.",
        confirmButtonText: "OK",
      });
    }
  }, [freeLists]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Free Lists</h2>
      <div className="space-y-2">{renderFreeLists()}</div>
    </div>
  );
};

export default ViewFreeLists;

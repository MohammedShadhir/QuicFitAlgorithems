// App.tsx
import React from "react";
import QuickFitAllocator from "./Components/QuickFitAllocator";

const App: React.FC = () => {
  const blockSizes = [8, 16, 32];
  const initialMemory = { 8: 3, 16: 2, 32: 1 };

  return (
    <QuickFitAllocator blockSizes={blockSizes} initialMemory={initialMemory} />
  );
};

export default App;

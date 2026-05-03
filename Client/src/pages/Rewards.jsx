import React from "react";
import { Gift } from "lucide-react";

const Rewards = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-md w-full">

        {/* ICON */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <Gift size={30} className="text-gray-400" />
        </div>

        {/* TITLE */}
        <h1 className="text-xl font-semibold mb-2">
          No Rewards Available
        </h1>

        {/* TEXT */}
        <p className="text-gray-500 text-sm leading-relaxed">
          You don’t have any rewards yet.  
          Keep booking events to unlock exciting offers and benefits.
        </p>

      </div>
    </div>
  );
};

export default Rewards;
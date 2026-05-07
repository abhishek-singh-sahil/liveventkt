import React from "react";
import { Gift, Lock, Star, Zap, Trophy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Rewards = () => {
  const navigate = useNavigate();

  // This would eventually come from your backend
  const hasRewards = false;

  return (
    <div className="min-h-[calc(100vh-104px)] bg-[#eef1f5] py-8 lg:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Rewards</h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">Unlock exclusive perks by attending your favorite events.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 w-max">
            <Star size={18} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-gray-900">0 Points</span>
          </div>
        </div>

        {!hasRewards ? (
          <div className="space-y-10">
            
            {/* 🔥 EMPTY STATE CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-purple-200/20 blur-3xl rounded-full"></div>
              
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 relative z-10">
                <Gift size={36} className="text-gray-300" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No rewards yet</h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed font-medium">
                Every ticket you book brings you closer to exclusive discounts, backstage passes, and early-bird access.
              </p>
              
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
              >
                Browse Events to Earn
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* 🔥 MILESTONES (LOCKED PREVIEW) */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 ml-1">Upcoming Perks</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                
                <LockedRewardCard 
                  title="First Booking Bonus" 
                  desc="Unlock a 10% discount on your next event."
                  points="500 pts"
                />
                
                <LockedRewardCard 
                  title="Early Bird Access" 
                  desc="Get notified 24h before tickets go live."
                  points="1500 pts"
                />

              </div>
            </div>

            {/* 🔥 HOW IT WORKS */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Zap size={20} className="text-purple-400" />
                </div>
                <h4 className="font-bold mb-1">Book Events</h4>
                <p className="text-xs text-gray-400">Earn 10 points for every ₹100 spent on tickets.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Trophy size={20} className="text-purple-400" />
                </div>
                <h4 className="font-bold mb-1">Level Up</h4>
                <p className="text-xs text-gray-400">Reach milestones to unlock higher tier benefits.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Gift size={20} className="text-purple-400" />
                </div>
                <h4 className="font-bold mb-1">Redeem</h4>
                <p className="text-xs text-gray-400">Use points for instant discounts at checkout.</p>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
             {/* Reward cards would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

// 🔥 LOCKED REWARD CARD COMPONENT
const LockedRewardCard = ({ title, desc, points }) => (
  <div className="bg-white/60 border border-white p-6 rounded-3xl flex items-center gap-5 relative overflow-hidden group grayscale opacity-70">
    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
      <Lock size={20} className="text-gray-400" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-bold text-gray-900">{title}</h4>
        <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md uppercase">{points}</span>
      </div>
      <p className="text-xs text-gray-500 font-medium leading-snug">{desc}</p>
    </div>
  </div>
);

export default Rewards;
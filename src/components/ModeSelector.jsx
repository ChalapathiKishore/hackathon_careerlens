import { motion } from 'framer-motion';

const ModeSelector = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center my-8">
      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex relative w-full max-w-md">
        <button
          onClick={() => setMode('A')}
          className={`relative z-10 flex-1 py-3 text-sm font-semibold transition-colors duration-300 ${
            mode === 'A' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Find Best Career
        </button>
        <button
          onClick={() => setMode('B')}
          className={`relative z-10 flex-1 py-3 text-sm font-semibold transition-colors duration-300 ${
            mode === 'B' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Check Readiness
        </button>
        <motion.div
          className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md z-0"
          initial={false}
          animate={{ left: mode === 'A' ? '4px' : 'calc(50% - 4px)' }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>
    </div>
  );
};

export default ModeSelector;

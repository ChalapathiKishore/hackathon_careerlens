import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

const CareerCard = ({ career, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-gray-800">{career.name}</h4>
        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">
          <Star size={14} fill="currentColor" />
          {career.score}% Match
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-6 line-clamp-2">
        {career.description}
      </p>

      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
          <span>Alignment Score</span>
          <span>{career.score}%</span>
        </div>
        <ProgressBar 
          percentage={career.score} 
          color={career.score > 75 ? 'bg-green-500' : career.score > 50 ? 'bg-yellow-500' : 'bg-indigo-500'} 
          height="h-2"
        />
      </div>

      <button className="w-full mt-2 py-2.5 rounded-lg border border-indigo-100 text-indigo-600 font-semibold group-hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm">
        View Full Path <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};

export default CareerCard;

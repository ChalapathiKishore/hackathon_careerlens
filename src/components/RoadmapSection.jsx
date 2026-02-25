import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, CheckCircle, Brain, RefreshCw } from 'lucide-react';

const RoadmapSection = ({ roadmap }) => {
  const [expandedMonth, setExpandedMonth] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="text-indigo-600" />
            6-Month Smart Roadmap
          </h3>
          <p className="text-gray-500 mt-1">AI-tailored using Spaced Repetition & Deep Work</p>
        </div>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
          <RefreshCw size={16} />
          Regenerate
        </button>
      </div>

      <div className="space-y-4">
        {roadmap.map((month, index) => (
          <div key={index} className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50">
            <button
              onClick={() => setExpandedMonth(expandedMonth === index ? null : index)}
              className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">
                  {month.month}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">{month.focus}</h4>
                  <p className="text-sm text-gray-500 hidden sm:block">
                    Milestone: {month.milestone}
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`text-gray-400 transition-transform duration-300 ${expandedMonth === index ? 'rotate-180' : ''}`} 
              />
            </button>

            <AnimatePresence>
              {expandedMonth === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-white border-t border-gray-50"
                >
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-500" /> Weekly Breakdown
                      </h5>
                      <ul className="space-y-3">
                        {month.weeklyFocus.map((week, i) => (
                          <li key={i} className="flex gap-3 text-gray-600 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            {week}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                      <h5 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <Brain size={18} className="text-indigo-600" /> Study Optimization
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-indigo-100/50">
                          <span className="text-indigo-700">Deep Work Weekly</span>
                          <span className="font-bold text-indigo-900">{month.deepWorkWeekly} hrs</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-indigo-100/50">
                          <span className="text-indigo-700">Active Recall Sessions</span>
                          <span className="font-bold text-indigo-900">{month.activeRecallWeekly} / wk</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-indigo-700">Spaced Repetition</span>
                          <span className="font-bold text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm">
                            Days {month.spacedRepetitionDays.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RoadmapSection;

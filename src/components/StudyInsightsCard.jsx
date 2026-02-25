import { motion } from 'framer-motion';
import { Brain, Flame, Activity } from 'lucide-react';

const StudyInsightsCard = ({ insights }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 text-white shadow-xl"
    >
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Brain className="text-indigo-400" />
        AI Study Insights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2">
             Target Deep Work
          </div>
          <div className="text-3xl font-bold">
            {insights.recommendedDeepWorkHours}<span className="text-lg font-normal text-indigo-200">h / wk</span>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2">
            <Activity size={16} /> Focus Score
          </div>
          <div className="text-3xl font-bold">
            {insights.focusScore}<span className="text-lg font-normal text-indigo-200">%</span>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2">
            <Flame size={16} className={insights.burnoutRisk === 'Low' ? 'text-green-400' : 'text-red-400'} /> 
            Burnout Risk
          </div>
          <div className="text-2xl font-bold">
            {insights.burnoutRisk}
          </div>
        </div>
      </div>

      <div className="bg-indigo-950/50 p-4 rounded-xl border border-indigo-500/30">
        <h4 className="font-semibold text-indigo-200 mb-2">Recommended Pattern:</h4>
        <p className="text-sm leading-relaxed">{insights.pattern}</p>
      </div>
    </motion.div>
  );
};

export default StudyInsightsCard;

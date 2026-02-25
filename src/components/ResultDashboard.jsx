import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Target } from 'lucide-react';
import CareerCard from './CareerCard';
import StudyInsightsCard from './StudyInsightsCard';
import RoadmapSection from './RoadmapSection';

const ResultDashboard = ({ mode, data, roadmap }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (data.readiness) {
      // Animate percentage counter
      let start = 0;
      const end = data.readiness;
      const duration = 1500;
      const incrementTime = 20;
      const step = (end - start) / (duration / incrementTime);
      
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [data.readiness]);

  const readinessColor = count > 75 ? 'text-green-500' : count > 50 ? 'text-yellow-500' : 'text-red-500';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 mt-12"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Career Intelligence Report</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">AI has analyzed your profile and generated a personalized readiness score and learning path.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Readiness Score */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
          <h3 className="text-lg font-bold text-gray-700 mb-6">Overall Readiness</h3>
          
          <div className="relative mb-6">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="60" className="stroke-current text-gray-100" strokeWidth="8" fill="transparent" />
              <motion.circle
                initial={{ strokeDashoffset: 377 }}
                animate={{ strokeDashoffset: 377 - (377 * count) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="64" cy="64" r="60"
                className={`stroke-current ${readinessColor}`}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="377"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className={`text-4xl font-extrabold ${readinessColor}`}>{count}%</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm font-medium">
            {count > 75 ? "Excellent! You are highly prepared." : count > 50 ? "Good start. Focus on addressing your skill gaps." : "Needs significant work. Follow the roadmap closely."}
          </p>
        </motion.div>

        {/* Card 3: Missing Skills */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 lg:col-span-2 relative"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertCircle className="text-red-500" /> Critical Skill Gaps
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.missingSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-semibold text-gray-800">{skill.name}</span>
                <span className={`text-xs px-2.5 py-1 font-bold rounded-md ${
                  skill.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {skill.priority} Priority
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl text-sm text-indigo-800 flex gap-3">
             <Target size={20} className="shrink-0 text-indigo-500" />
             <p>AI suggests focusing on <strong>High Priority</strong> skills during your deep work sessions in the first month.</p>
          </div>
        </motion.div>
      </div>

      {mode === 'A' && data.topCareers && data.topCareers.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Recommended Careers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.topCareers.map((career, idx) => (
              <CareerCard key={idx} career={career} index={idx} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <StudyInsightsCard insights={data.studyInsights} />
      </div>

      <div className="mt-12">
        <RoadmapSection roadmap={roadmap} />
      </div>

    </motion.div>
  );
};

export default ResultDashboard;

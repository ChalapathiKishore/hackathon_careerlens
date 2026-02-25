import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Settings, BookOpen, Clock, Target } from 'lucide-react';

const StudentForm = ({ mode, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    skills: '',
    interests: '',
    targetCareer: '',
    outputLanguage: 'English',
    studyHours: 10,
    studyMode: 'Deep Work Focused'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-8 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
          {mode === 'A' ? <Target size={24} /> : <Settings size={24} />}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === 'A' ? 'Find Your Best Career Path' : 'Check Career Readiness'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
              placeholder="Alex Johnson"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Branch / Major</label>
            <select
              name="branch"
              required
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 bg-white"
            >
              <option value="">Select Branch</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="ECE">Electronics (ECE)</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Current Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            required
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
            placeholder="Python, React, Figma, Communication"
          />
        </div>

        {mode === 'A' && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Core Interests</label>
            <input
              type="text"
              name="interests"
              required
              value={formData.interests}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
              placeholder="AI, building websites, designing graphics"
            />
          </div>
        )}

        {mode === 'B' && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Target Career</label>
            <select
              name="targetCareer"
              required
              value={formData.targetCareer}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
            >
              <option value="">Select Target Career</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Web Developer">Web Developer</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Software Developer">Software Developer</option>
            </select>
          </div>
        )}

        <div className="border-t border-gray-100 pt-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-indigo-500" />
            Study Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} /> Weekly Hours
              </label>
              <input
                type="number"
                name="studyHours"
                required
                min="1"
                max="100"
                value={formData.studyHours}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Study Preference Mode</label>
              <select
                name="studyMode"
                value={formData.studyMode}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
              >
                <option value="Deep Work Focused">Deep Work Focused (Long blocks)</option>
                <option value="Balanced">Balanced Mix</option>
                <option value="Light Pomodoro">Light Pomodoro (Short bursts)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200'
            }`}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Send size={20} />
                Analyze AI Readiness
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StudentForm;

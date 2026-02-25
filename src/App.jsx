import { useState } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import StudentForm from './components/StudentForm';
import ResultDashboard from './components/ResultDashboard';
import { analyzeStudentProfile } from './utils/geminiApi';
import { MOCK_API_RESPONSE_MODE_A, MOCK_API_RESPONSE_MODE_B } from './data/mockData';
import { generateRoadmap } from './utils/roadmapGenerator';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [mode, setMode] = useState('A');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setResultData(null);
    setRoadmapData(null);
    setError(null);

    try {
      const gptData = await analyzeStudentProfile(formData, mode);
      
      const { roadmap, ...restData } = gptData;
      setResultData(restData);
      setRoadmapData(roadmap);
      
    } catch (err) {
      console.warn("API Error, falling back to mock data for demo stability:", err);
      // Hackathon Fallback: If API limit is reached, smoothly load mock data
      let fallbackData;
      if (mode === 'A') {
        fallbackData = { ...MOCK_API_RESPONSE_MODE_A };
      } else {
        fallbackData = { ...MOCK_API_RESPONSE_MODE_B };
      }
      
      // Mimic slight Intelligence
      if (formData.studyMode === 'Deep Work Focused') {
        fallbackData.studyInsights.recommendedDeepWorkHours = Math.round(formData.studyHours * 0.8);
      }

      const generatedRoadmap = generateRoadmap(formData.targetCareer || "Software Engineer", formData.studyHours, formData.studyMode);
      
      setResultData(fallbackData);
      setRoadmapData(generatedRoadmap);
      
      // We will show a minor warning toast but won't block the UI
      setError("Note: API Rate Limit Exceeded. Disconnected from Live AI. Displaying Demo Mode Data.");
    } finally {
      setIsSubmitting(false);
      
      // Auto scroll to results
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setResultData(null);
    setRoadmapData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-gray-50 to-white">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative">
        <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute top-40 left-0 -m-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative z-10 text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
          >
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Career Intelligence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover your optimal path, analyze skill gaps, and generate a 6-month highly optimized smart study roadmap.
          </motion.p>
        </div>

        <div className="relative z-10">
          <ModeSelector mode={mode} setMode={handleModeChange} />
          <StudentForm mode={mode} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center">
              {error}
            </motion.div>
          )}

          <AnimatePresence>
            {resultData && roadmapData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pb-20"
              >
                <ResultDashboard mode={mode} data={resultData} roadmap={roadmapData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CareerLens AI. Built for the Hackathon.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

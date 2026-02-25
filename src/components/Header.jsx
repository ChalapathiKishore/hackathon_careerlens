import { Target } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Target size={24} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              CareerLens AI
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Career Paths</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Mentorship</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

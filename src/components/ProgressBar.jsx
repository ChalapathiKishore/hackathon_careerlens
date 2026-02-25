import { motion } from 'framer-motion';

const ProgressBar = ({ percentage, color = "bg-indigo-600", height = "h-3" }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`${height} ${color} rounded-full`}
      />
    </div>
  );
}

export default ProgressBar;

import { FaChartLine } from 'react-icons/fa';

const WelcomeBanner = () => {
  return (
    <div className="gradient-bg text-white rounded-xl p-6 mb-8 relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
        <p className="max-w-lg mb-4 opacity-90">Here's what's happening with your hiring process today. You have 5 new applications to review.</p>
        <button className="px-4 py-2 bg-white text-primary rounded-lg font-medium hover:bg-opacity-90 transition">
          Review Applications
        </button>
      </div>
      <div className="absolute right-4 -bottom-4 opacity-20 md:opacity-100">
        <FaChartLine className="text-[120px] text-white" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
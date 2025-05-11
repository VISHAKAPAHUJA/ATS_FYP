import { useState, useEffect } from 'react';

const ApplicationsChart = () => {
  const [activeTab, setActiveTab] = useState('month');

  useEffect(() => {
    // Simulate chart animation
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
      bar.style.height = '0%';
      setTimeout(() => {
        const targetHeights = ['30%', '50%', '70%', '90%', '60%', '40%', '80%'];
        bar.style.height = targetHeights[index];
      }, index * 100);
    });
  }, [activeTab]);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Applications Overview</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('week')}
            className={`px-3 py-1 text-sm ${activeTab === 'week' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} rounded-lg hover:bg-gray-200`}
          >
            Week
          </button>
          <button 
            onClick={() => setActiveTab('month')}
            className={`px-3 py-1 text-sm ${activeTab === 'month' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} rounded-lg hover:bg-gray-200`}
          >
            Month
          </button>
          <button 
            onClick={() => setActiveTab('year')}
            className={`px-3 py-1 text-sm ${activeTab === 'year' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} rounded-lg hover:bg-gray-200`}
          >
            Year
          </button>
        </div>
      </div>
      <div className="chart-container">
        <div className="flex items-end h-48 mt-8 space-x-2">
          <div className="flex-1 bg-blue-100 rounded-t chart-bar" style={{ height: '0%' }}></div>
          <div className="flex-1 bg-blue-200 rounded-t chart-bar" style={{ height: '0%' }}></div>
          <div className="flex-1 bg-blue-300 rounded-t chart-bar" style={{ height: '0%' }}></div>
          <div className="flex-1 bg-blue-400 rounded-t chart-bar" style={{ height: '0%' }}></div>
          <div className="flex-1 bg-blue-500 rounded-t chart-bar" style={{ height: '0%' }}></div>
          <div className="flex-1 bg-blue-600 rounded-t chart-bar" style={{ height: '0%' }}></div>
          <div className="flex-1 bg-blue-700 rounded-t chart-bar" style={{ height: '0%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Total Applications</p>
          <p className="text-lg font-bold text-gray-800">124</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <p className="text-lg font-bold text-gray-800">4.8%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg. Time to Hire</p>
          <p className="text-lg font-bold text-gray-800">23 days</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsChart;
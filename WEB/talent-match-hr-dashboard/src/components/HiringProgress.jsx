import { useEffect } from 'react';

const HiringProgress = () => {
  const progressItems = [
    { title: 'Senior Developer', filled: 3, total: 5 },
    { title: 'UX Designer', filled: 1, total: 2 },
    { title: 'Data Scientist', filled: 1, total: 1 },
    { title: 'Marketing Manager', filled: 0, total: 1 }
  ];

  useEffect(() => {
    // Simulate progress bar animation
    const progressBars = document.querySelectorAll('.progress-fill-animate');
    progressBars.forEach(bar => {
      const currentWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = currentWidth;
      }, 300);
    });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Hiring Progress</h2>
        <a href="#" className="text-sm text-primary font-medium hover:underline">View Details</a>
      </div>
      <div className="space-y-6">
        {progressItems.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.title}</span>
              <span className="text-sm font-medium text-gray-700">{item.filled}/{item.total}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill progress-fill-animate" 
                style={{ width: `${(item.filled / item.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Open Positions</p>
            <p className="text-lg font-bold text-gray-800">9</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Filled Positions</p>
            <p className="text-lg font-bold text-gray-800">5</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-lg font-bold text-gray-800">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringProgress;
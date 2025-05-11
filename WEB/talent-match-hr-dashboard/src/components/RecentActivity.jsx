const RecentActivity = () => {
    const activities = [
      {
        type: 'New application received',
        description: 'John Smith applied for Senior Developer',
        time: '10 minutes ago',
        bgColor: 'bg-blue-50'
      },
      {
        type: 'Interview scheduled',
        description: 'Interview with Jane Doe for UX Designer',
        time: '2 hours ago',
        bgColor: 'bg-green-50'
      },
      {
        type: 'Offer accepted',
        description: 'Michael Brown accepted Data Scientist offer',
        time: '1 day ago',
        bgColor: 'bg-purple-50'
      },
      {
        type: 'New job posted',
        description: 'Backend Engineer position published',
        time: '2 days ago',
        bgColor: 'bg-yellow-50'
      }
    ];
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-dot"></div>
              <div className={`${activity.bgColor} p-3 rounded-lg`}>
                <p className="text-sm font-medium text-gray-800">{activity.type}</p>
                <p className="text-xs text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm text-primary font-medium rounded-lg border border-primary hover:bg-primary/10 transition">
          View All Activity
        </button>
      </div>
    );
  };
  
  export default RecentActivity;
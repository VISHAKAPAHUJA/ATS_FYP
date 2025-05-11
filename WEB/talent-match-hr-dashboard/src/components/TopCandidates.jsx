const TopCandidates = () => {
    const candidates = [
      {
        initials: 'JS',
        name: 'John Smith',
        position: 'Senior Frontend Developer',
        status: 'New',
        statusColor: 'bg-green-100 text-green-800',
        applied: 'Applied 2 days ago'
      },
      {
        initials: 'JD',
        name: 'Jane Doe',
        position: 'UX/UI Designer',
        status: 'Interview',
        statusColor: 'bg-yellow-100 text-yellow-800',
        applied: 'Scheduled for tomorrow'
      },
      {
        initials: 'MB',
        name: 'Michael Brown',
        position: 'Data Scientist',
        status: 'Hired',
        statusColor: 'bg-blue-100 text-blue-800',
        applied: 'Started yesterday'
      }
    ];
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Top Candidates</h2>
          <a href="#" className="text-sm text-primary font-medium hover:underline">View All</a>
        </div>
        <div className="space-y-4">
          {candidates.map((candidate, index) => (
            <div key={index} className="candidate-card flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer">
              <div className={`w-12 h-12 rounded-full ${index === 0 ? 'bg-blue-100 text-blue-800' : index === 1 ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'} flex items-center justify-center mr-4`}>
                <span className="text-lg font-medium">{candidate.initials}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{candidate.name}</h3>
                <p className="text-sm text-gray-500">{candidate.position}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 ${candidate.statusColor} rounded-full`}>{candidate.status}</span>
                <p className="text-xs text-gray-500 mt-1">{candidate.applied}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TopCandidates;
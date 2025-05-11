const StatsCard = ({ title, value, icon: Icon, borderColor, bgColor, textColor, change }) => {
    return (
      <div className={`stats-card bg-white rounded-xl shadow p-6 border-l-4 ${borderColor}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          </div>
          <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
            <Icon className={`${textColor} text-xl`} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <span className="text-green-500">{change}</span> from last week
        </p>
      </div>
    );
  };
  
  export default StatsCard;
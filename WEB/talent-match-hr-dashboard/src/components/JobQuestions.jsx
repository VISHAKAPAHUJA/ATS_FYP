import { useEffect, useState } from 'react';
import { 
  FaArrowLeft, 
  FaSpinner, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle,
  FaExclamationTriangle 
} from 'react-icons/fa';

const JobQuestions = ({ jobId, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/questions`);
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Invalid response format: ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch questions');
      }
      
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      console.error('Fetch questions error:', err);
      setError(err.message.includes('Unexpected token') 
        ? 'Server returned an invalid response. Check your API endpoint.'
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-gray-50 rounded-lg">
        <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
        <span className="text-lg text-gray-700">Loading questions...</span>
        <p className="text-gray-500 mt-2">Please wait while we fetch the data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-red-50 rounded-lg">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading Questions</h3>
        <p className="text-red-600 text-center mb-6 max-w-md">{error}</p>
        <div className="flex space-x-4">
          <button
            onClick={fetchQuestions}
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center"
          >
            <FaSpinner className="mr-2" /> Retry
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto max-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Screening Questions</h2>
          <p className="text-gray-500 mt-1">
            {questions.length} question{questions.length !== 1 ? 's' : ''} for this position
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center text-primary hover:text-primary-dark transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Jobs
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-12 bg-gray-50 rounded-lg">
          <FaExclamationTriangle className="text-yellow-500 text-4xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Questions Found</h3>
          <p className="text-gray-500 max-w-md text-center">
            This job posting doesn't have any screening questions yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {questions.map((question, index) => (
            <div key={question._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <span className="bg-primary/10 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-medium text-gray-800">
                    {question.questionText}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition"
                    title="Edit question"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition"
                    title="Delete question"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-11">
                {question.options.map((option, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg transition ${
                      question.correctAnswer === i + 1 
                        ? 'border-2 border-green-500 bg-green-50 shadow-sm' 
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-medium mr-3 text-gray-600">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <span className="flex-1">{option}</span>
                      {question.correctAnswer === i + 1 && (
                        <FaCheckCircle className="ml-2 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobQuestions;
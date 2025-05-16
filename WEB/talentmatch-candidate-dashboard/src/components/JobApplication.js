import { useRef, useState } from 'react';
import axios from 'axios';

const JobApplication = ({ jobId }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleApplyClick = () => {
    setUploadError(null);
    setUploadSuccess(false);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file type
  if (file.type !== 'application/pdf') {
    setUploadError('Please upload a PDF file only');
    return;
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    setUploadError('File size should be less than 5MB');
    return;
  }

  try {
    setUploading(true);
    
    // Debug: Log all localStorage contents
    console.log("All localStorage contents:", {
      keys: Object.keys(localStorage),
      values: Object.keys(localStorage).map(key => ({
        key,
        value: localStorage.getItem(key)
      }))
    });

    // Try alternative token keys
    const token = localStorage.getItem('token') || 
                 localStorage.getItem('authToken') ||
                 localStorage.getItem('userToken');

    if (!token) {
      const availableKeys = Object.keys(localStorage);
      throw new Error(
        `No auth token found. Available keys: ${availableKeys.join(', ')}. ` +
        `Please login again.`
      );
    }

    // Rest of your upload code...
  } catch (error) {
    // Enhanced error reporting
    console.error('Upload failed:', {
      error,
      localStorageContents: Object.keys(localStorage).map(key => ({
        key,
        value: localStorage.getItem(key)
      })),
      timestamp: new Date().toISOString()
    });
    
    setUploadError(
      error.message.includes('Available keys') ? 
      'Session expired. Please login again.' :
      error.message
    );
  } finally {
    setUploading(false);
    e.target.value = '';
  }
};

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      {uploadError && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {uploadError}
        </div>
      )}
      {uploadSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          CV uploaded successfully!
        </div>
      )}

      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleApplyClick}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Apply Now'}
      </button>
    </>
  );
};

export default JobApplication;
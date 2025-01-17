import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function RefugeeForm({ 
  formData, 
  handleChange, 
  handleSubmit, 
  onCancel, 
  isUpdate = false,
  isLoading = false 
}) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name fields
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate usernames
    if (!formData.youtubeUsername?.trim()) {
      newErrors.youtubeUsername = 'YouTube username is required';
    }
    if (!formData.tiktokUsername?.trim()) {
      newErrors.tiktokUsername = 'TikTok username is required';
    }

    // Validate known for fields
    if (!formData.knownFor_1?.trim()) {
      newErrors.knownFor_1 = 'This field is required';
    }
    if (!formData.knownFor_2?.trim()) {
      newErrors.knownFor_2 = 'This field is required';
    }
    if (!formData.knownFor_3?.trim()) {
      newErrors.knownFor_3 = 'This field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    handleSubmit(e);
  };

  const renderInput = (label, name, placeholder, maxLength = undefined) => {
    const isUsername = name.toLowerCase().includes('username');
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className={`relative ${isUsername ? 'mt-1' : ''}`}>
          {isUsername && (
            <span className="absolute left-3 top-2.5 text-gray-500">@</span>
          )}
          <input
            type="text"
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full ${isUsername ? 'pl-8' : 'px-4'} py-2.5 rounded-lg border
              ${errors[name] ? 'border-red-500' : 'border-gray-300'}
              focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20
              disabled:bg-gray-50 disabled:text-gray-500`}
            disabled={isLoading}
          />
          {errors[name] && (
            <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} className="max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-[#17616f] pb-2 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('First Name', 'firstName', 'Enter your first name')}
            {renderInput('Last Name', 'lastName', 'Enter your last name')}
          </div>
        </div>

        {/* Social Media Profiles */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-[#17616f] pb-2 mb-4">
            Social Media Profiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('YouTube Username', 'youtubeUsername', 'your.youtube.username')}
            {renderInput('TikTok Username', 'tiktokUsername', 'your.tiktok.username')}
          </div>
        </div>

        {/* About You */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-[#17616f] pb-2 mb-4">
            About You
          </h3>
          <div className="space-y-4">
            {renderInput('Known For (1)', 'knownFor_1', 'First thing you\'re known for...', 50)}
            {renderInput('Known For (2)', 'knownFor_2', 'Second thing you\'re known for...', 50)}
            {renderInput('Known For (3)', 'knownFor_3', 'Third thing you\'re known for...', 50)}
          </div>
        </div>
      </div>

      {/* Form Actions - Fixed at bottom */}
      <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200">
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#17616f] text-white rounded-lg hover:bg-[#124c57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isUpdate ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}
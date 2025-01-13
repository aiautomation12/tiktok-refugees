export default function RefugeeForm({ formData, handleChange, handleSubmit, onCancel }) {
    return (
      <form onSubmit={handleSubmit} className="max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-[#17616f] pb-2 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                  required
                />
              </div>
            </div>
          </div>
  
          {/* Social Media Profiles */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-[#17616f] pb-2 mb-4">
              Social Media Profiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">@</span>
                  <input
                    type="text"
                    name="tiktokUsername"
                    value={formData.tiktokUsername}
                    onChange={handleChange}
                    placeholder="your.tiktok.username"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">@</span>
                  <input
                    type="text"
                    name="instagramUsername"
                    value={formData.instagramUsername}
                    onChange={handleChange}
                    placeholder="your.instagram"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RedNote Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">@</span>
                  <input
                    type="text"
                    name="redNoteUsername"
                    value={formData.redNoteUsername}
                    onChange={handleChange}
                    placeholder="your.rednote"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SnapChat Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">@</span>
                  <input
                    type="text"
                    name="snapchatUsername"
                    value={formData.snapchatUsername}
                    onChange={handleChange}
                    placeholder="your.snapchat"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flip Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">@</span>
                  <input
                    type="text"
                    name="flipUsername"
                    value={formData.flipUsername}
                    onChange={handleChange}
                    placeholder="your.flip.username"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Bio</label>
                <input
                  type="text"
                  name="linkedinBio"
                  value={formData.linkedinBio}
                  onChange={handleChange}
                  placeholder="Your LinkedIn profile URL"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                  required
                />
              </div>
            </div>
          </div>
  
          {/* About You */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-[#17616f] pb-2 mb-4">
              About You
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I am known for</label>
              <textarea
                name="knownFor"
                value={formData.knownFor}
                onChange={handleChange}
                placeholder="Tell us what makes you unique..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#17616f] focus:ring-2 focus:ring-[#17616f] focus:ring-opacity-20"
                rows="4"
                required
              />
            </div>
          </div>
        </div>
  
        {/* Form Actions - Fixed at bottom */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#17616f] text-white rounded-lg hover:bg-[#124c57] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
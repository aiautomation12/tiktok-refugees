import React from "react";
import { X, User } from "lucide-react";

const RefugeeDetailsModal = ({ selectedRefugee, onClose }) => {
  const SOCIAL_MEDIA_ICONS = {
    youtube:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
    tiktok:
      "https://img.freepik.com/premium-vector/set-tiktok-app-icons-social-media-logo-vector-illustration_277909-592.jpg?semt=ais_hybrid",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-2xl w-full mx-auto border border-gray-200 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-gray-100">
            <User className="text-gray-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {selectedRefugee.firstName} {selectedRefugee.lastName}
          </h2>
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17616f]"
          onClick={onClose}
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Social Media Section */}
      <div className="space-y-6">
        {[
          { platform: "YouTube", icon: SOCIAL_MEDIA_ICONS.youtube, username: selectedRefugee.youtubeUsername },
          { platform: "TikTok", icon: SOCIAL_MEDIA_ICONS.tiktok, username: selectedRefugee.tiktokUsername },
        ].map((media, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center bg-white">
              <img
                src={media.icon}
                alt={`${media.platform} Icon`}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {media.platform}
              </h3>
              <p className="text-gray-600 truncate">
                {media.username || "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefugeeDetailsModal;

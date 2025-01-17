import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import HighlightText from './HighlightText';

const SOCIAL_MEDIA_ICONS = {
  youtube: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
  instagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
  snapchat: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1920px-Snapchat_logo.svg.png",
  tiktok: "https://img.freepik.com/premium-vector/set-tiktok-app-icons-social-media-logo-vector-illustration_277909-592.jpg?semt=ais_hybrid",
  rednote: "https://play-lh.googleusercontent.com/cvxZysz34aPGO1l__roDVapiQTNFeWpQ1tKD2YNO3RodNqBF3bI8cNQkDm1EVxY9CiM=w240-h480-rw",
  flip: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Akmwh1atLQr-Rguoc-x19j5-5RdG7F0fRw&s"
};

const SocialMediaLink = ({ icon, username, label, highlight }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 relative">
      <Image
        src={SOCIAL_MEDIA_ICONS[icon]}
        alt={label}
        fill
        className="object-contain rounded"
        sizes="(max-width: 768px) 20px, 24px"
      />
    </div>
    <span className="text-gray-700 text-xs md:text-sm truncate">
      <HighlightText text={username} highlight={highlight} />
    </span>
  </div>
);

const RefugeeCard = ({ refugee, onModalOpen, searchTerms }) => {
  const maskUsername = (username) => {
    if (!username) return '';
    if (username.startsWith('@')) {
      return username.slice(0, -3) + '***';
    }
    return '@' + username.slice(0, -3) + '***';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 border border-gray-100 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 hover:border-gray-300">
      <div className="flex justify-between items-center mb-2 md:mb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate max-w-[75%]">
          <HighlightText 
            text={`${refugee.firstName} ${refugee.lastName}`} 
            highlight={searchTerms.nameSearch} 
          />
        </h3>
        <ExternalLink className="cursor-pointer" onClick={() => onModalOpen(refugee)} />
      </div>

      <div className="space-y-1.5 md:space-y-2">
        <SocialMediaLink
          icon="youtube"
          username={maskUsername(refugee.youtubeUsername)}
          label="YouTube"
          highlight={searchTerms.socialSearch}
        />
        <SocialMediaLink
          icon="tiktok"
          username={maskUsername(refugee.tiktokUsername)}
          label="TikTok"
          highlight={searchTerms.socialSearch}
        />
        <div className="mt-2 pt-2 md:mt-3 md:pt-3 border-t border-gray-200">
          <h4 className="text-xs font-bold text-gray-700 mb-1.5 md:mb-2">Known For:</h4>
          <div className="space-y-1">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-start">
                <span className="text-gray-600 text-xs w-4 flex-shrink-0">{num}.</span>
                <p className="text-gray-600 text-xs overflow-wrap-break-word">
                  <HighlightText 
                    text={refugee[`knownFor_${num}`]} 
                    highlight={searchTerms.categorySearch}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RefugeeTable({ refugees, onModalOpen,searchTerms }) {
  return (
    <div className="mt-4 md:mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {refugees.map((refugee, index) => (
          <RefugeeCard key={index} refugee={refugee} onModalOpen={onModalOpen}   searchTerms={searchTerms} />
        ))}
      </div>
    </div>
  );
}
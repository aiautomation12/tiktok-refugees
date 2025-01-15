import Image from 'next/image';

const SOCIAL_MEDIA_ICONS = {
  youtube: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
  instagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
  snapchat: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1920px-Snapchat_logo.svg.png",
  tiktok: "https://img.freepik.com/premium-vector/set-tiktok-app-icons-social-media-logo-vector-illustration_277909-592.jpg?semt=ais_hybrid",
  rednote: "https://play-lh.googleusercontent.com/cvxZysz34aPGO1l__roDVapiQTNFeWpQ1tKD2YNO3RodNqBF3bI8cNQkDm1EVxY9CiM=w240-h480-rw",
  flip: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Akmwh1atLQr-Rguoc-x19j5-5RdG7F0fRw&s"
};

const SocialMediaLink = ({ icon, username, label }) => (
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
      {username}
    </span>
  </div>
);

const RefugeeCard = ({ refugee }) => {
  const maskUsername = (username) => {
    if (!username) return '';
    if (username.startsWith('@')) {
      return username.slice(0, -3) + '***';
    }
    return '@' + username.slice(0, -3) + '***';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 border border-gray-100">
      {/* Header with Name and Avatar */}
      <div className="flex justify-between items-start mb-2 md:mb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate max-w-[75%]">
          {refugee.firstName} {refugee.lastName}
        </h3>
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#17616f] flex items-center justify-center text-white text-sm md:text-base flex-shrink-0">
          {refugee.firstName?.[0]?.toUpperCase()}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="space-y-1.5 md:space-y-2">
        <SocialMediaLink
          icon="youtube"
          username={maskUsername(refugee.tiktokUsername)}
          label="YouTube"
        />
        <SocialMediaLink
          icon="instagram"
          username={maskUsername(refugee.instagramUsername)}
          label="Instagram"
        />
        <SocialMediaLink
          icon="snapchat"
          username={maskUsername(refugee.snapchatUsername)}
          label="Snapchat"
        />
        <SocialMediaLink
          icon="tiktok"
          username={maskUsername(refugee.tiktokUsername)}
          label="TikTok"
        />
        <SocialMediaLink
          icon="rednote"
          username={maskUsername(refugee.redNoteUsername)}
          label="RedNote"
        />
        <SocialMediaLink
          icon="flip"
          username={maskUsername(refugee.flipUsername)}
          label="Flip"
        />

        {/* Known For Section */}
        <div className="mt-2 pt-2 md:mt-3 md:pt-3 border-t border-gray-200">
          <h4 className="text-xs font-bold text-gray-700 mb-1.5 md:mb-2">Known For:</h4>
          <div className="space-y-1">
            <div className="flex items-start">
              <span className="text-gray-600 text-xs w-4 flex-shrink-0">1.</span>
              <p className="text-gray-600 text-xs overflow-wrap-break-word">
                {refugee.knownFor_1}
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-xs w-4 flex-shrink-0">2.</span>
              <p className="text-gray-600 text-xs overflow-wrap-break-word">
                {refugee.knownFor_2}
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-xs w-4 flex-shrink-0">3.</span>
              <p className="text-gray-600 text-xs overflow-wrap-break-word">
                {refugee.knownFor_3}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RefugeeTable({ refugees }) {
  return (
    <div className="mt-4 md:mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {refugees.map((refugee, index) => (
          <RefugeeCard key={index} refugee={refugee} />
        ))}
      </div>
    </div>
  );
}
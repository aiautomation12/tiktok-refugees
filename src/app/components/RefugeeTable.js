export default function RefugeeTable({ refugees }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#17616f]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">TikTok Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Instagram Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">RedNote Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">SnapChat Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Flip Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">LinkedIn Bio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Known For</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {refugees.map((refugee, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.tiktokUsername}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.instagramUsername}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.redNoteUsername}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.snapchatUsername}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.flipUsername}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.linkedinBio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refugee.knownFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
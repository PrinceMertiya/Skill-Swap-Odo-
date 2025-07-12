export default function UserCard({ user }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.location}</p>
          </div>
        </div>
        <span className="text-yellow-500 font-semibold">⭐ {user.rating}</span>
      </div>

      <div className="mb-2">
        <p className="text-sm font-semibold">Skills Offered</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {user.skillsOffered.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <p className="text-sm font-semibold">Skills Wanted</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {user.skillsWanted.map(skill => (
            <span key={skill} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3">Availability: <span className="font-medium">{user.availability}</span></p>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        🚀 Request Skill Exchange
      </button>
    </div>
  );
}

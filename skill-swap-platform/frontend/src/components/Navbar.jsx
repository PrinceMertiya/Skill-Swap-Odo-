export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">SkillSwap</h1>
      <div className="space-x-6 hidden md:flex">
        <a href="/" className="text-gray-700 hover:text-blue-600">Browse</a>
        <a href="/requests" className="text-gray-700 hover:text-blue-600">My Requests</a>
        <a href="/profile" className="text-gray-700 hover:text-blue-600">Profile</a>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">P</div>
        <span className="text-sm font-medium">Prince Mertiya</span>
      </div>
    </nav>
  );
}

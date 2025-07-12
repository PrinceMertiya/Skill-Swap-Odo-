import UserCard from '../components/UserCard';

const dummyUsers = [
  {
    name: "Alice Johnson",
    location: "New York, NY",
    rating: 4.8,
    skillsOffered: ["React", "JavaScript", "Node.js"],
    skillsWanted: ["Python", "Machine Learning", "+1 more"],
    availability: "Weekends, Evenings"
  },
  {
    name: "Bob Smith",
    location: "San Francisco, CA",
    rating: 4.9,
    skillsOffered: ["Python", "Data Science", "Machine Learning"],
    skillsWanted: ["React", "Frontend Development"],
    availability: "Weekdays, Mornings"
  }
];

export default function Home() {
  return (
    <div className="px-6 py-6 space-y-6">
      <h1 className="text-3xl font-bold">Browse Skills</h1>
      <p className="text-gray-600">Discover talented people and exchange skills with them</p>

      <input
        type="text"
        placeholder="Search for skills..."
        className="w-full max-w-md border rounded-md px-4 py-2"
      />

      <div className="flex flex-wrap gap-6">
        {dummyUsers.map((user, idx) => (
          <UserCard key={idx} user={user} />
        ))}
      </div>
    </div>
  );
}

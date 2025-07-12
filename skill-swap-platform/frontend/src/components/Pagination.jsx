export default function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      {[...Array(totalPages).keys()].map(i => (
        <button
          key={i}
          className={`px-3 py-1 rounded-md border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

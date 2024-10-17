import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const genres = [
    'Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic',
    'R&B', 'Country', 'Blues', 'Folk', 'Metal', 'Reggae'
  ];

  return (
    <div className="p-6">
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="w-full py-3 pl-12 pr-4 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:bg-white/20"
        />
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Browse All</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded-lg cursor-pointer"
            style={{
              backgroundColor: `hsl(${index * 30}, 70%, 50%)`,
            }}
          >
            <span className="absolute inset-4 text-xl font-bold text-white">{genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
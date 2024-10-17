import { Mic2, Music2, Radio } from 'lucide-react';
const Home = () => {
  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold text-white mb-6">
        Welcome to <span className="text-purple-400">GRS-Player</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: <Mic2 size={24} />, title: 'Voice Match', desc: 'Find songs by best matches' },
          { icon: <Music2 size={24} />, title: 'Smart Mix', desc: 'AI-powered playlist creation' },
          { icon: <Radio size={24} />, title: 'Live Sessions', desc: 'Join live listening parties' }
        ].map((feature, index) => (
          <div key={index} className="bg-purple-900 backdrop-blur-sm rounded-xl p-6 hover:bg-purple-900/40 transition-all cursor-pointer">
            <div className="text-purple-400 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Home;
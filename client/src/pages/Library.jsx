import React, { useState, useEffect, useRef } from 'react';
import { musicApi } from '../services/api';
import { 
  PlayCircle, 
  PauseCircle, 
  Plus, 
  Trash2, 
  Music, 
  AlertCircle,
  Loader,
  Volume2,
  VolumeX
} from 'lucide-react';

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [newSong, setNewSong] = useState({ title: '', artist: '', duration: '', audioUrl: '' });
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    fetchSongs();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const data = await musicApi.getAllSongs();
      setSongs(data);
    } catch (err) {
      setError('Failed to fetch songs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    try {
      const addedSong = await musicApi.addSong(newSong);
      setSongs([...songs, addedSong]);
      setNewSong({ title: '', artist: '', duration: '', audioUrl: '' });
    } catch (err) {
      setError('Failed to add song');
    }
  };

  const handleDeleteSong = async (id) => {
    try {
      await musicApi.deleteSong(id);
      if (currentlyPlaying && currentlyPlaying.id === id) {
        audioRef.current.pause();
        setCurrentlyPlaying(null);
      }
      setSongs(songs.filter(song => song.id !== id));
    } catch (err) {
      setError('Failed to delete song');
    }
  };

  const togglePlay = async (song) => {
    try {
      if (currentlyPlaying && currentlyPlaying.id === song.id) {
        audioRef.current.pause();
        setCurrentlyPlaying(null);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current.src = song.audioUrl;
        
        try {
          await audioRef.current.play();
          setCurrentlyPlaying(song);
        } catch (playError) {
          console.error('Playback failed:', playError);
          setError('Failed to play audio. Please check the audio URL.');
        }
      }
    } catch (err) {
      console.error('Audio handling error:', err);
      setError('An error occurred while handling audio playback');
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin h-12 w-12 text-purple-500" />
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Playlist</h1>
      
      {error && (
        <div className="flex items-center bg-red-500 text-white p-4 rounded-lg mb-4">
          <AlertCircle className="mr-2" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleAddSong} className="mb-8 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Song title"
          value={newSong.title}
          onChange={(e) => setNewSong({...newSong, title: e.target.value})}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          placeholder="Artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          placeholder="Duration (e.g., 3:45)"
          value={newSong.duration}
          onChange={(e) => setNewSong({...newSong, duration: e.target.value})}
          className="w-32 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="url"
          placeholder="Audio URL"
          value={newSong.audioUrl}
          onChange={(e) => setNewSong({...newSong, audioUrl: e.target.value})}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button 
          type="submit"
          className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Song
        </button>
      </form>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {songs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Music size={48} className="mb-4" />
            <p>No songs in your playlist yet</p>
          </div>
        ) : (
          <>
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-purple-500 transition-colors focus:outline-none"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            <ul>
              {songs.map((song, index) => (
                <li 
                  key={song.id} 
                  className={`flex items-center justify-between p-4 ${
                    index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'
                  } hover:bg-gray-600 transition-colors`}
                >
                  <div className="flex items-center flex-1">
                    <button 
                      onClick={() => togglePlay(song)}
                      className="mr-4 text-purple-500 hover:text-purple-400 focus:outline-none"
                    >
                      {currentlyPlaying && currentlyPlaying.id === song.id ? (
                        <PauseCircle size={24} />
                      ) : (
                        <PlayCircle size={24} />
                      )}
                    </button>
                    <div>
                      <h3 className="font-semibold text-white">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-4">{song.duration}</span>
                    <button 
                      onClick={() => handleDeleteSong(song.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Playlist;
import axios from 'axios';

const URL = 'https://66e526da5cc7f9b6273c6a32.mockapi.io';

export const musicApi = {
  getAllSongs: async () => {
    const response = await axios.get(`${URL}/music`);
    return response.data;
  },
  
  addSong: async (songData) => {
    const response = await axios.post(`${URL}/music`, songData);
    return response.data;
  },
  
  deleteSong: async (songId) => {
    const response = await axios.delete(`${URL}/music/${songId}`);
    return response.data;
  },
  
  updateSong: async (songId, songData) => {
    const response = await axios.put(`${URL}/music/${songId}`, songData);
    return response.data;
  }
};
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const CHANNEL_ID = 'UCp2UwspaBTvuEDMe9kx3aoA'; // Your channel ID
  const API_KEY = process.env.YOUTUBE_API_KEY;   // Already in Vercel

  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return res.status(404).json({error: 'No videos found'});
    }

    const video = data.items[0];
    const videoId = video.id.videoId;
    const title = video.snippet.title;

    res.status(200).json({ videoId, title });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video', details: err.message });
  }
}
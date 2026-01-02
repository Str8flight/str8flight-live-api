import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const CHANNEL_ID = 'UCp2UwspaBTvuEDMe9kx3aoA';
    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: 'Missing API key' });
    }

    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'No videos found', details: data });
    }

    const video = data.items[0];
    res.status(200).json({
      videoId: video.id.videoId,
      title: video.snippet.title
    });
  } catch (error) {
    console.error('LATESTVIDEO ERROR:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
// api/checkLive.js

export default async function handler(req, res) {
  const CHANNEL_ID = "UCp2UwspaBTvuEDMe9kx3aoA"; // Your YouTube Channel ID
  const API_KEY = process.env.YOUTUBE_API_KEY;    // Secure key stored in Vercel

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;
    
    // Use native fetch (no import needed)
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      res.status(200).json({ live: true, videoId: data.items[0].id.videoId });
    } else {
      res.status(200).json({ live: false });
    }
  } catch (err) {
    res.status(500).json({ live: false, error: err.message });
  }
}
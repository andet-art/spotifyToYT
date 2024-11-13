// Spotify OAuth 2.0 Authorization Request
const clientId = 'YOUR_CLIENT_ID';  // Replace with your Spotify Client ID
const redirectUri = 'https://yourappname.netlify.app/callback';  // Replace with your Redirect URI
const scopes = 'playlist-read-private playlist-modify-public';  // Scopes you need (e.g., access playlists)

// Optional: Generate a random state to prevent CSRF attacks
function generateState() {
  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return randomString;
}

const state = generateState();

// Construct the authorization URL
const authUrl = `https://accounts.spotify.com/authorize?` +
  `client_id=${clientId}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  `&scope=${encodeURIComponent(scopes)}` +
  `&state=${state}`;

console.log("Redirect URL for Spotify Authorization: ", authUrl);

// Redirect the user to the Spotify Authorization URL
window.location.href = authUrl;

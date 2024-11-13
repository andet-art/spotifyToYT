// Callback page handler (e.g., callback.js)

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state');

// Your saved state value from the original request
const savedState = localStorage.getItem('spotifyAuthState');

// Check if the state matches (for CSRF protection)
if (state !== savedState) {
  console.error('State mismatch, potential CSRF attack!');
  alert('State mismatch, potential CSRF attack!');
  return;
}

// If the state is valid, proceed to exchange the code for an access token
if (code) {
  // Define your client credentials
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET'; // Keep this private
  const redirectUri = 'https://yourappname.netlify.app/callback';

  // Prepare the request to exchange the authorization code for an access token
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const codeVerifier = localStorage.getItem('spotifyAuthCodeVerifier');  // The code verifier used in the initial request

  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('code', code);
  data.append('redirect_uri', redirectUri);
  data.append('client_id', clientId);
  data.append('code_verifier', codeVerifier);

  // Send POST request to exchange code for token
  fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) // Basic authentication for client credentials
    },
    body: data.toString()
  })
  .then(response => response.json())
  .then(data => {
    if (data.access_token) {
      // Store the access token for later API calls
      localStorage.setItem('access_token', data.access_token);
      alert('Authorization successful!');
      // Redirect the user to the main app page or perform API calls
      window.location.href = 'https://yourappname.netlify.app/';  // Redirect to your app
    } else {
      console.error('Error obtaining access token:', data);
      alert('Failed to obtain access token');
    }
  })
  .catch(error => {
    console.error('Error during token exchange:', error);
    alert('Error during token exchange');
  });
} else {
  console.error('No authorization code received');
  alert('No authorization code received');
}

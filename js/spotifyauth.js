// Function to exchange the authorization code for an access token
function exchangeCodeForToken(code) {
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET'; // Keep this private
    const redirectUri = 'https://yourappname.netlify.app/callback';
  
    const tokenUrl = 'https://accounts.spotify.com/api/token';
  
    // Prepare the request body for token exchange
    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('redirect_uri', redirectUri);
    data.append('client_id', clientId);
  
    // Send POST request to exchange code for token
    fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) // Basic authentication
      },
      body: data.toString()
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        // Store the access token for later API calls
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token); // Store refresh token for later use
        alert('Authorization successful!');
        // Redirect to the main app page or make API calls
        window.location.href = 'https://yourappname.netlify.app/';
      } else {
        console.error('Error obtaining access token:', data);
        alert('Failed to obtain access token');
      }
    })
    .catch(error => {
      console.error('Error during token exchange:', error);
      alert('Error during token exchange');
    });
  }
  
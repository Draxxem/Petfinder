const secret = require('../functions/secrets-manager.js');

let generatedToken = '';

export async function getToken(request) {
    
    let secretManager = await secret.getSecrets(request);

    const formData = new URLSearchParams();

    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', secretManager.clientId);
    formData.append('client_secret', secretManager.clientSecret);

    try {
        const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            const accessToken = data.access_token;
            generatedToken = accessToken;

        } else {
            console.error('Error fetching access token:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return generatedToken;
}


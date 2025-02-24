const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
const clientId = 'SxYG14fyLWuLer7kJfCZJIt47nCYSeJ8CiKXsQK2ZUb8UoBmAT';
const clientSecret = 'JhOnYv2ahQxt1vPfJkpNXFf8lbwtZJD4Z4YrAdgs';
const redirectUri = 'https://api.petfinder.com/v2/types';

const formData = new URLSearchParams();
formData.append('grant_type', 'client_credentials');
//formData.append('code', authorizationCode);
formData.append('redirect_uri', redirectUri);
formData.append('client_id', clientId);
formData.append('client_secret', clientSecret);

let generatedToken = '';

let token = {
    getToken: async function (request) {
        try {
            const response = await fetch(tokenUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                const accessToken = data.access_token;
                generatedToken = accessToken;
                //console.log('Access Token:', accessToken);
                // Store the access token for future API calls
            } else {
                console.error('Error fetching access token:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        return generatedToken;
    }
}
module.exports = token;
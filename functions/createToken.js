const CLIENT_ID = 'SxYG14fyLWuLer7kJfCZJIt47nCYSeJ8CiKXsQK2ZUb8UoBmAT';
const CLIENT_SECRET = 'JhOnYv2ahQxt1vPfJkpNXFf8lbwtZJD4Z4YrAdgs';

const formData = new URLSearchParams();
formData.append('grant_type', 'client_credentials');
formData.append('client_id', CLIENT_ID);
formData.append('client_secret', CLIENT_SECRET);

let generatedToken = '';

const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

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
require('dotenv').config();

const HCP_CLIENT_ID = process.env.HCP_CLIENT_ID;
const HCP_CLIENT_SECRET = process.env.HCP_CLIENT_SECRET;
const HCP_TOKEN_ENDPOINT = process.env.HCP_TOKEN_ENDPOINT
const HCP_ENDPOINT = process.env.HCP_ENDPOINT

export let client_id = ''
export let client_secret = ''

const formData = new URLSearchParams();
formData.append('grant_type', 'client_credentials');
formData.append('client_id', HCP_CLIENT_ID);
formData.append('client_secret', HCP_CLIENT_SECRET);

let generatedToken = '';
let hclSecret = '';

export async function getSecrets(request) {
    try {
        const response = await fetch(HCP_TOKEN_ENDPOINT, {
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

    const secrets = await request.get(HCP_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${generatedToken}`
        }
    });

    hclSecret = JSON.parse(await secrets.body());
    let clientId = hclSecret.secrets[0].static_version.value;
    let clientSecret = hclSecret.secrets[1].static_version.value;

    client_id = clientId;
    client_secret = clientSecret

    const secretManager = {
        clientId: client_id,
        clientSecret: client_secret
    }
    return secretManager;
}

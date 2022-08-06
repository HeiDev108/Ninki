/* eslint-disable no-undef */
const axios = require('axios');

const auth = async () => {
  try {
    const token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`, 'utf8').toString('base64');
    const data = qs.stringify({
      grant_type: 'client_credentials',
    });
    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: '__Host-device_id=AQAZTSufnFZzSXCjX6F2r44SEwEDv-PZiYuJJcGVgIV8Wsi5GZPGMj7D2-SyGN1dBdvydYrdGpt2lCL7UA8j9oadaKF8TEJUJgY; sp_tr=false',
      },
      data,
    };

    const fetchedData = await axios(config, (err, reply) => {
      if (err || !reply) {
        return json('Unauthorised');
      }
      return reply.json();
    });
    return fetchedData;
  } catch (error) {
    return error;
  }
};

export default async (req, res) => {
  try {
    const authResponse = await auth();
    const token = authResponse.data.access_token;

    const url = `https://api.spotify.com/v1/tracks/${req.headers.song}`;

    const reqOpt = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      },
    };

    return axios.get(url, reqOpt)
      .then((response) => res.send(response.data))
      .catch((error) => {
        console.log(error);
        res.status(400).json('Unable to get song');
      });
  } catch (error) {
    console.log(error);
    return res.status(400).send(JSON.stringify(error));
  }
};

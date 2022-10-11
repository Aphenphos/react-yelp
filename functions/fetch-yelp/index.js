const fetch = require('node-fetch');
require('dotenv').config({ path: `.env` });

const handler = async (event) => {
  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;

  try {
    const resp = await fetch(
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&query=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        },
      }
    );
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};

module.exports = { handler };

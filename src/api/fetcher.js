const axios = require('axios');

exports.fetcher_tiqwa = async (url, params = {}) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.TIQWA_FLIGHT_API}${url}`,
      headers: { Authorization: `Bearer ${process.env.TIQWA_BEARER_TOKEN}` },
      params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

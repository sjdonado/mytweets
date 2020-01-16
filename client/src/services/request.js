import { API_URL } from '../environment';

/**
 * Request to API wrapper
 * @param {String} endpoint
 * @param {Object} data
 * @param {'GET'|'POST'} method
 */
async function request(endpoint, data, method = 'GET') {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    Object.assign(options, {
      body: JSON.stringify(data),
    });
  }
  const response = await fetch(`${API_URL}/${endpoint}`, options);

  return response.json();
}

export default request;

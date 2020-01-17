import { API_URL } from '../environment';

/**
 * Request to API wrapper
 * @param {String} endpoint
 * @param {'GET'|'POST'} method
 * @param {Object} data
 */
async function request(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    credentials: 'include',
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

  if (response.status !== 200) {
    const error = new Error(response.statusText);
    error.statusCode = response.status;
    throw error;
  }

  return response.json();
}

export default request;

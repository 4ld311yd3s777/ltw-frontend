// /**
//  * fetchModel - Fetch a model from the web server.
//  *
//  * @param {string} url      The URL to issue the GET request.
//  *
//  */
// function fetchModel(url) {
//   const models = null;
//   return models;
// }

// export default fetchModel;
/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise<Object>} Resolves to the JSON response from the server.
 */
function fetchModel(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}

export default fetchModel;

export function getInfo(id = 1, type = "ANIME") {
  var query = `
  query ($id: Int) {
    Media (id: $id, type: ${type}) {
      description
    }
  }
  `;
  var variables = {
    id: id
  };

  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };

  return fetch(url, options)
    .then(response => {
      return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
      });
    })
    .then(responseJson => {
      return responseJson;
    })
    .catch(e => console.log(e));
}

export function getEntryinfo(type = "ANIME", sort = "POPULARITY_DESC") {
  var query = `
  query ($perPage: Int) {
    Page(perPage: $perPage) {
      media (type: ${type}, sort: ${sort}){
        id
        coverImage {
          large
        }
        title {
          romaji
        }
      }
    }
  }
  `;

  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    };

  return fetch(url, options)
    .then(response => {
      return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
      });
    })
    .then(responseJson => {
      return responseJson;
    })
    .catch(e => console.log(e));
}

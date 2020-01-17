import React from "react";
import {AsyncStorage} from "react-native";

export function getInfo(id = 1, type = "ANIME") {
  var query = `
  query ($id: Int) {
    Media (id: $id, type: ${type}) {
      bannerImage
      coverImage {
        large
      }
      title {
        romaji
      }
      description
      averageScore
      genres
      episodes
      chapters
      volumes
      relations {
        edges {
          node {
            coverImage {
              large
            }
            title {
              romaji
            }
            id
            type
          }
          id
          relationType
        }
      }
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
      console.log(responseJson);
      return responseJson;
    })
    .catch(e => console.log(e));
}

export function getEntryinfo(type = "ANIME", sort = "POPULARITY_DESC") {
  let query = `
          query ($perPage: Int) {
            Page(perPage: $perPage) {
              media (type: ${type}, sort: ${sort}){
                id
                type
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

  let url = "https://graphql.anilist.co",
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

export function searchRecommendations(mediatype = "ANIME", search) {
  return AsyncStorage.getItem("@Settings:value").then(value => {
    var query = `
          query ($page: Int, $perPage: Int, $search: String) {
            Page (page: $page, perPage: $perPage) {
              media (search: $search, type: ${mediatype}, isAdult: ${value}) {
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
    console.log(search);

    var variables = {
      search: search,
      page: 1,
      perPage: 5
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
      });
  });
}

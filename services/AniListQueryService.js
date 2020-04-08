import React from "react";
import {AsyncStorage, Alert} from "react-native";
import {showMessage, hideMessage} from "react-native-flash-message";

export function getInfo(id = 1, type = "ANIME") {
  var query = `
  query ($id: Int) {
    Media (id: $id, type: ${type}) {
      id
      bannerImage
      coverImage {
        large
        extraLarge
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
      characters (sort: ROLE){
        edges {
          role
          node {
            id
            image {
              medium
            }
            name {
              full
              native
            }
          }
          voiceActors {
            id
            image {
              medium
            }
            name {
              full
              native
            }
          }
        }
      }
      recommendations {
        edges {
          node {
            id
            mediaRecommendation {
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
    .catch(e => console.log(e));
}

export function searchMediaRecommendations(mediatype, search) {
  return AsyncStorage.getItem("@Settings:value").then(value => {
    var query = `
          query ($page: Int, $perPage: Int, $search: String) {
            Page (page: $page, perPage: $perPage) {
              media (search: $search, type: ${mediatype}, isAdult: ${value}) {
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

    return fetch(url, options).then(response => {
      return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
      });
    });
  });
}

export function searchStaffRecommendations(search) {
  return AsyncStorage.getItem("@Settings:value").then(value => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        staff (search: $search) {
          id
          name {
            first
            last
            full
            native
          }
          image {
            large
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

    return fetch(url, options).then(response => {
      return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
      });
    });
  });
}

export function searchCharacterRecommendations(search) {
  return AsyncStorage.getItem("@Settings:value").then(value => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        characters (search: $search) {
          id
          name {
            first
            last
            full
            native
          }
          image {
            large
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

    return fetch(url, options).then(response => {
      return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
      });
    });
  });
}

export function addEntryToList(
  mediaId,
  status,
  score,
  progress,
  startday,
  startmonth,
  startyear,
  finishday,
  finishmonth,
  finishyear,
  notes
) {
  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    let query = `
      mutation {
        SaveMediaListEntry (mediaId: ${mediaId}, status: ${status}, score: ${score}, progress: ${progress}, startedAt: {year: ${startyear}, month: ${startmonth}, day: ${startday}}, completedAt: {year: ${finishyear}, month: ${finishmonth}, day: ${finishday}}, notes: """${notes}""") {
          id
          status
        }
      }
    `;

    let url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
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
      .catch(error => console.log(error.message));
  });
}

export function deleteEntryFromList(id) {
  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    let query = `
    mutation {
      DeleteMediaListEntry(id: ${id}) {
        deleted
      }
    }
    `;

    let url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: query
        })
      };
    return fetch(url, options).then(response => {
      return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
      });
    });
  });
}

export function getUserMediaList(type) {
  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    let query = `
      {
        MediaListCollection(userId: 341284, type: ${type}) {
          lists {
            name
            isSplitCompletedList
            status
            entries {
              mediaId
              media {
                coverImage {
                  medium
                  large
                }
                title {
                  romaji
                }
                type
              }
            }
          }
        }
      }
      `;

    let url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: query
        })
      };
    return fetch(url, options).then(response => {
      return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
      });
    });
  });
}

export function getUserEntryData(mediaId) {
  return AsyncStorage.getItem("@AccessToken:key")
    .then(accessToken => {
      let query = `
      query {
        MediaList(userId: 341284, mediaId_in: ${mediaId}) {
          id
          status
          score
          progress
          progressVolumes
          repeat
          private
          notes
          startedAt {
            year
            month
            day
          }
          completedAt {
            year
            month
            day
          }
          mediaId
          media {
            id
            coverImage {
              extraLarge
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
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        };
      return fetch(url, options).then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      });
    })
    .catch(error => {
      return error;
    });
}

export function getCharacterInfo(id) {
  let query = `
    query ($id: Int) {
    Character(id: $id) {
      description(asHtml: false)
      image {
        large
      }
      name {
        first
        last
        full
        native
      }
      media {
        edges {
          characterRole
          node {
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
    }
  }`;

  let variables = {
    id: id
  };

  let url = "https://graphql.anilist.co",
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
    .catch(e => console.log(e));
}

export function getStaffInfo(id) {
  let query = `
    query($id: Int) {
      Staff(id: $id) {
        name {
          full
          native
        }
        image {
          large
          medium
        }
        id
        description
        staffMedia{
          nodes{
            type
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            coverImage {
              medium
            }
          }
        }
      }
    }`;

  let variables = {
    id: id
  };

  let url = "https://graphql.anilist.co",
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

  return fetch(url, options).then(response => {
    return response.json().then(function(json) {
      return response.ok ? json : Promise.reject(json);
    });
  });
}
export function getViewerId() {
  return AsyncStorage.getItem("@AccessToken:key")
    .then(accessToken => {
      let query = `query {
        Viewer {
          id
          name
        }
      }`;

      let url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        };
      return fetch(url, options).then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      });
    })
    .catch(error => {
      return error;
    });
}
export function getBasicUserInfo() {
  return AsyncStorage.getItem("@AccessToken:key")
    .then(accessToken => {
      let query = `query {
        User (id: ${341284}) {
          name
          avatar {
            medium
            large
          }
        }
      }`;

      let url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        };
      return fetch(url, options).then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      });
    })
    .catch(error => {
      return error;
    });
}

export function getUserActivity(id) {
  return AsyncStorage.getItem("@AccessToken:key")
    .then(accessToken => {
      let query = `
      query {
        Page {
          ListFields: activities(userId: ${id}, sort: ID_DESC) {
            ... on ListActivity {
              id
              progress
              status
              media {
                id
                type
                title {
                  romaji
                }
                coverImage {
                  medium
                }
              }
            }
          }
        }
      }
      `;

      let url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        };
      return fetch(url, options).then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      });
    })
    .catch(error => {
      return error;
    });
}

export function getThreads() {
  return AsyncStorage.getItem("@AccessToken:key")
    .then(accessToken => {
      let query = `
      query {
        Page {
          threads(sort: UPDATED_AT_DESC) {
            id
            title
            body (asHtml: false)
            user {
              name
              avatar {
                medium
              }
            }
          }
        }
      }`;

      let url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        };
      return fetch(url, options).then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      });
    })
    .catch(error => {
      return error;
    });
}

export function getThreadComments(id) {
  return AsyncStorage.getItem("@AccessToken:key")
    .then(accessToken => {
      let query = `
      query {
        Page {
          threadComments (threadId: ${id}) {
            id
            comment (asHtml: false)
          }
        }
      }`;

      let url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        };
      return fetch(url, options).then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      });
    })
    .catch(error => {
      return error;
    });
}

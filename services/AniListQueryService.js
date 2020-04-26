import React from "react";
import {AsyncStorage, Alert} from "react-native";
import {showMessage, hideMessage} from "react-native-flash-message";

export function getMediaInfo(id, mediaType) {
  var query = `
    query ($id: Int, $mediaType: MediaType) {
      Media(id: $id, type: $mediaType) {
        id
        bannerImage
        coverImage {
          large
          extraLarge
        }
        title {
          userPreferred
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
                userPreferred
              }
              id
              type
            }
            id
            relationType
          }
        }
        characters(sort: ID) {
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
                alternative
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
                alternative
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
                  userPreferred
                }
              }
            }
          }
        }
      }
    }
    `;

  var variables = {
    id: id,
    mediaType: mediaType
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getDiscoverInfo(mediaType, sortType) {
  let query = `
    query ($mediaType: MediaType, $sortType: [MediaSort], $perPage: Int) {
      Page(perPage: $perPage) {
        media(type: $mediaType, sort: $sortType) {
          id
          type
          coverImage {
            large
          }
          title {
            userPreferred
          }
        }
      }
    }
    `;

  let variables = {
    mediaType: mediaType,
    sortType: sortType
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function searchMedia(mediaType, search) {
  var query = `
    query ($page: Int, $perPage: Int, $search: String, $mediaType: MediaType) {
      Page(page: $page, perPage: $perPage) {
        media(search: $search, type: $mediaType) {
          id
          type
          coverImage {
            medium
          }
          title {
            userPreferred
          }
        }
      }
    }
    `;

  var variables = {
    search: search,
    page: 1,
    perPage: 5,
    mediaType: mediaType
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function searchStaff(search) {
  var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        staff (search: $search) {
          id
          name {
            full
            native
            alternative
          }
          image {
            medium
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

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function searchCharacters(search) {
  var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        characters(search: $search) {
          id
          name {
            full
            native
            alternative
          }
          image {
            medium
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

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function addEntryToList(editData) {
  let query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $score: Float, $progress: Int, $startDate: FuzzyDateInput, $completeDate: FuzzyDateInput, $notes: String) {
      SaveMediaListEntry(mediaId: $mediaId, status: $status, score: $score, progress: $progress, startedAt: $startDate, completedAt: $completeDate, notes: $notes) {
        id
        mediaId
        status
        score
        progress
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
        notes
      }
    }
    `;

  let variables = {
    mediaId: editData.mediaId,
    status: editData.status,
    score: editData.score,
    progress: editData.progress,
    startDate: editData.startDate,
    completeDate: editData.completeDate,
    notes: editData.notes
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function deleteEntryFromList(mediaListId) {
  let query = `
    mutation ($mediaListId: Int) {
      DeleteMediaListEntry(id: $mediaListId) {
        deleted
      }
    }
    `;

  let variables = {
    mediaListId: mediaListId
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getUserMediaList(userId, mediaType) {
  let query = `
      query ($userId: Int, $mediaType: MediaType) {
        MediaListCollection(userId: $userId, type: $mediaType) {
          hasNextChunk
          lists {
            name
            isCustomList
            isSplitCompletedList
            status
            entries {
              id
              mediaId
              status
              progress
              media {
                coverImage {
                  medium
                }
                title {
                  userPreferred
                }
                type
              }
            }
          }
        }
      }
      `;

  let variables = {
    userId: userId,
    mediaType: mediaType
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getUserEntryData(userId, mediaId) {
  let query = `
    query ($userId: Int, $mediaId: [Int]) {
      MediaList(userId: $userId, mediaId_in: $mediaId) {
        id
        mediaId
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
      }
    }
    `;

  let variables = {
    userId: userId,
    mediaId: mediaId
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getCharacterInfo(characterId) {
  let query = `
    query ($characterId: Int) {
      Character(id: $characterId) {
        description(asHtml: false)
        isFavourite
        image {
          large
        }
        name {
          full
          native
          alternative
        }
        media(sort: POPULARITY_DESC) {
          edges {
            characterRole
            voiceActors {
              id
              name
              language
              image {
                medium
              }
            }
            node {
              id
              type
              coverImage {
                large
              }
              title {
                userPreferred
              }
            }
          }
        }
      }
    }
    `;

  let variables = {
    characterId: characterId
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getStaffInfo(staffId) {
  let query = `
    query ($staffId: Int) {
      Staff(id: $staffId) {
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
        staffMedia {
          nodes {
            type
            id
            title {
              userPreferred
            }
            coverImage {
              medium
            }
          }
        }
        characters {
          edges {
            node {
              id
              name {
                full
              }
              image {
                medium
              }
            }
            id
            role
            media {
              id
              title {
                userPreferred
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

  let variables = {
    staffId: staffId
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getViewerId() {
  let query = `
    query {
      Viewer {
          id
          name
        }
      }
      `;

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, {}, accessToken);
    } else {
      return unauthorizedRequest(query, {});
    }
  });
}

export function getBasicUserInfo(userId) {
  let query = `
    query ($userId: Int) {
      User (id: $userId) {
        name
        avatar {
          medium
          large
        }
      }
    }
    `;

  let variables = {
    userId: userId
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getUserActivity(userId) {
  let query = `
    query ($userId: Int) {
      Page {
        ListFields: activities(userId: $userId, sort: ID_DESC) {
          ... on ListActivity {
            id
            progress
            status
            media {
              id
              type
              title {
                userPreferred
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

  let variables = {
    userId: userId
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getUserOptions(userId) {
  let query = `
  query ($userId: Int){
    User (id: $userId) {
      name
      options {
        titleLanguage
        displayAdultContent
        airingNotifications
        profileColor
        notificationOptions {
          enabled
          type
        }
      }
      mediaListOptions {
        scoreFormat
        rowOrder
        animeList {
          sectionOrder
          splitCompletedSectionByFormat
          customLists
          advancedScoring
          advancedScoringEnabled
        }
        mangaList {
          sectionOrder
          splitCompletedSectionByFormat
          customLists
          advancedScoring
          advancedScoringEnabled
        }
      }
    }
  }
  `;

  let variables = {
    userId: userId
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getThreads() {
  let query = `
    {
      Page {
        threads(sort: IS_STICKY) {
          id
          body
          title
        }
      }
    }
    `;

  let variables = {};

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

export function getThreadComments(threadId, order) {
  let query = `
    query ($threadId: Int, $order: [ThreadCommentSort]){
      Page {
        threadComments(threadId: $threadId, sort: $order) {
          id
          comment
        }
      }
    }
    `;

  let variables = {
    threadId: threadId,
    order: order
  };

  return AsyncStorage.getItem("@AccessToken:key").then(accessToken => {
    if (accessToken !== null) {
      return authorizedRequest(query, variables, accessToken);
    } else {
      return unauthorizedRequest(query, variables);
    }
  });
}

function unauthorizedRequest(query, variables) {
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
}

function authorizedRequest(query, variables, accessToken) {
  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
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

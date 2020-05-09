import { AsyncStorage } from "react-native";

//Primitive Types
interface MediaListStatus {
  value:
    | "CURRENT"
    | "PLANNING"
    | "COMPLETED"
    | "DROPPED"
    | "DROPPED"
    | "PAUSED"
    | "REPEATING";
}

interface FuzzyDateInput {
  day: number;
  month: number;
  year: number;
}

interface LikeData {
  animeId?: number;
  mangaId?: number;
  characterId?: number;
  staffId?: number;
  studioId?: number;
}

interface EditData {
  mediaId?: number;
  status?: MediaListStatus;
  score?: number;
  progress?: number;
  startDate?: FuzzyDateInput;
  completeDate?: FuzzyDateInput;
  notes?: string;
}

interface ThreadOrder {
  order: "ID" | "ID_DESC";
}

interface MediaType {
  type: "ANIME" | "MANGA";
}

export async function getMediaInfo(mediaId: number, mediaType: MediaType) {
  var query = `
    query ($id: Int, $mediaType: MediaType) {
      Media(id: $id, type: $mediaType) {
        id
        isFavourite
        favourites
        bannerImage
        coverImage {
          large
          extraLarge
          color
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
    id: mediaId,
    mediaType: mediaType,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getDiscoverInfo(mediaType: MediaType, sortType: String) {
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
    sortType: sortType,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function searchMedia(mediaType: MediaType, search: String) {
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
    mediaType: mediaType,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function searchStaff(search: String) {
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
    perPage: 5,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function searchCharacters(search: String) {
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
    perPage: 5,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function addEntryToList(editData: EditData) {
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
    notes: editData.notes,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function deleteEntryFromList(mediaListId: number) {
  let query = `
    mutation ($mediaListId: Int) {
      DeleteMediaListEntry(id: $mediaListId) {
        deleted
      }
    }
    `;

  let variables = {
    mediaListId: mediaListId,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getUserMediaList(userId: number, mediaType: MediaType) {
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
    mediaType: mediaType,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getUserEntryData(userId: number, mediaId: number) {
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
    mediaId: mediaId,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getCharacterInfo(characterId: number) {
  let query = `
    query ($characterId: Int) {
      Character(id: $characterId) {
        id
        description(asHtml: false)
        isFavourite
        favourites
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
              name {
                full
                native
                alternative
              }
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
    characterId: characterId,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getStaffInfo(staffId: number) {
  let query = `
    query ($staffId: Int) {
      Staff(id: $staffId) {
        isFavourite
        favourites
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
          edges {
            staffRole
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
    staffId: staffId,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getViewerId() {
  let query = `
    query {
      Viewer {
          id
          name
        }
      }
      `;

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, {}, accessToken);
  } else {
    return unauthorizedRequest(query, {});
  }
}

export async function getBasicUserInfo(userId: number) {
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
    userId: userId,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getUserActivity(userId: number) {
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
    userId: userId,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getUserOptions(userId: number) {
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
    userId: userId,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getThreads() {
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

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getThreadComments(threadId: number, order: ThreadOrder) {
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
    order: order,
  };

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function toggleLike(variables: LikeData) {
  let query = `
    mutation($animeId: Int, $mangaId: Int, $characterId: Int, $staffId: Int, $studioId: Int) {
      ToggleFavourite(animeId: $animeId, mangaId: $mangaId, characterId: $characterId, staffId: $staffId, studioId: $studioId) {
        anime {
          nodes {
            id
          }
        }
        manga {
          nodes {
            id
          }
        }
        characters {
          nodes {
            id
          }
        }
        staff {
          nodes {
            id
          }
        }
        studios {
          nodes {
            id
          }
        }
      }
    }
    `;

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, variables, accessToken);
  } else {
    return unauthorizedRequest(query, variables);
  }
}

export async function getNotifications() {
  let query = `
    {
      Page {
        notifications {
          ... on AiringNotification {
            type
            id
            animeId
            episode
            contexts
            media {
              title {
                userPreferred
              }
            }
          }
          ... on FollowingNotification {
            type
            id
            userId
            context
          }
          ... on ActivityMessageNotification {
            type
            id
            userId
            context
          }
          ... on ActivityMentionNotification {
            type
            id
            userId
            context
          }
          ... on ActivityReplyNotification {
            type
            id
            userId
            context
          }
          ... on ActivityReplySubscribedNotification {
            type
            id
            userId
            context
          }
          ... on ActivityLikeNotification {
            type
            id
            userId
            context
          }
          ... on ActivityReplyLikeNotification {
            type
            id
            userId
            context
          }
          ... on ThreadCommentMentionNotification {
            type
            id
            userId
            context
          }
          ... on ThreadCommentReplyNotification {
            type
            id
            userId
            context
          }
          ... on ThreadCommentSubscribedNotification {
            type
            id
            userId
            context
          }
          ... on ThreadCommentLikeNotification {
            type
            id
            userId
            context
          }
          ... on ThreadLikeNotification {
            type
            id
            userId
            threadId
            context
          }
          ... on RelatedMediaAdditionNotification {
            type
            id
            mediaId
            context
            media {
              title {
                userPreferred
              }
            }
          }
        }
      }
    }
    `;

  const accessToken = await AsyncStorage.getItem("@AccessToken:key");
  if (accessToken !== null) {
    return authorizedRequest(query, {}, accessToken);
  } else {
    return unauthorizedRequest(query, {});
  }
}

async function unauthorizedRequest(query: String, variables: Object) {
  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return response.ok ? json : Promise.reject(json);
  } catch (error) {
    return error;
  }
}

async function authorizedRequest(
  query: String,
  variables: Object,
  accessToken: Object
) {
  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return response.ok ? json : Promise.reject(json);
  } catch (error) {
    return error;
  }
}

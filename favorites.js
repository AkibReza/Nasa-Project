document.addEventListener("DOMContentLoaded", function () {
  // Get the authenticated user
  const authenticatedUser = getAuthenticatedUser();

  // Check if the user is authenticated
  if (authenticatedUser) {
    // Get the username of the authenticated user
    const username = authenticatedUser.username;

    // Get the users data from localStorage
    const usersData = getUsersData();

    // Find the user with the same username as the authenticated user
    const user = usersData.find((user) => user.username === username);

    // Get the favorites data for the user
    const favorites = user ? user.favorites : [];

    // Get the container to display favorites
    const favoritesContainer = document.getElementById("favorites-container");

    // Clear existing content
    favoritesContainer.innerHTML = "";

    // Check if the user has any favorites
    if (favorites && favorites.length > 0) {
      // Loop through each favorite and create HTML elements to display them
      favorites.forEach((favorite) => {
        const favoriteElement = createFavoriteElement(favorite);
        favoritesContainer.appendChild(favoriteElement);
      });
    } else {
      // If the user has no favorites, display a message
      favoritesContainer.innerHTML = "<p>No favorites found.</p>";
    }
  } else {
    // If the user is not authenticated, redirect them to the login page
    window.location.href = "login.html";
  }
});

// Function to create HTML elements for a favorite APOD
function createFavoriteElement(favorite) {
  const favoriteElement = document.createElement("div");
  favoriteElement.classList.add("favorite-item");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("apod-title");
  titleElement.textContent = favorite.title;

  const explanationElement = document.createElement("p");
  explanationElement.classList.add("apod-explanation");
  explanationElement.textContent = favorite.explanation;

  const mediaElement =
    favorite.media_type === "image"
      ? createImageElement(favorite.url)
      : createVideoElement(favorite.url);

  favoriteElement.appendChild(titleElement);
  favoriteElement.appendChild(explanationElement);
  favoriteElement.appendChild(mediaElement);

  return favoriteElement;
}

// Function to create an image element
function createImageElement(url) {
  const imageElement = document.createElement("img");
  imageElement.src = url;
  imageElement.classList.add("favorite-media");
  imageElement.classList.add("apod-image");
  return imageElement;
}

// Function to create a video element
function createVideoElement(url) {
  const videoElement = document.createElement("iframe");
  videoElement.src = url;
  videoElement.width = "640";
  videoElement.height = "360";
  videoElement.frameBorder = "0";
  videoElement.allowFullScreen = true;
  videoElement.classList.add("favorite-media");
  return videoElement;
}

// Function to get the authenticated user
function getAuthenticatedUser() {
  const authenticatedUserData = localStorage.getItem("authenticatedUser");
  return authenticatedUserData ? JSON.parse(authenticatedUserData) : null;
}

// Function to get the users data from localStorage
function getUsersData() {
  const usersData = localStorage.getItem("users");
  return usersData ? JSON.parse(usersData) : [];
}

// Function to render the favorites
function renderFavorites() {
  // Get the authenticated user
  const authenticatedUser = getAuthenticatedUser();

  // Check if the user is authenticated
  if (authenticatedUser) {
    // Get the favorites data for the authenticated user
    const favorites = authenticatedUser.favorites;

    // Get the container to display favorites
    const favoritesContainer = document.getElementById("favorites-container");

    // Clear existing content
    favoritesContainer.innerHTML = "";

    // Check if the user has any favorites
    if (favorites && favorites.length > 0) {
      // Loop through each favorite and create HTML elements to display them
      favorites.forEach((favorite) => {
        const favoriteElement = createFavoriteElement(favorite);
        favoritesContainer.appendChild(favoriteElement);
      });
    } else {
      // If the user has no favorites, display a message
      favoritesContainer.innerHTML = "<p>No favorites found.</p>";
    }
  } else {
    // If the user is not authenticated, redirect them to the login page
    window.location.href = "login.html";
  }
}

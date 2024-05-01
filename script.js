document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "AehO9UCWSmES4c7gIZtWW4W5dlqKKkUgvqNIMGwY";
  const apiUrl = "https://api.nasa.gov/planetary/apod";

  const apodContainer = document.getElementById("apod-container");
  const apodTitle = document.getElementById("apod-title");
  const apodExplanation = document.getElementById("apod-explanation");
  const getRandomApodBtn = document.getElementById("get-random-apod-btn");

  let active = false;
  getRandomApodBtn.textContent = "Show an APOD";

  // Function to generate a random date within a specified range
  const getRandomDate = () => {
    const startDate = new Date("1995-06-16"); // APOD started on June 16, 1995
    const endDate = new Date(); // Today's date
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    return randomDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  };

  // Function to fetch a random APOD
  const fetchRandomApod = async () => {
    try {
      const randomDate = getRandomDate();
      const url = `${apiUrl}?api_key=${apiKey}&date=${randomDate}`;
      console.log(url);

      const response = await fetch(url);
      const data = await response.json();

      // Update the title with the fetched APOD title
      apodTitle.textContent = data.title;
      apodExplanation.textContent = data.explanation;

      getRandomApodBtn.classList.remove("apod-btn-fadein");
      if (!active) {
        getRandomApodBtn.textContent = "Show another APOD";
        getRandomApodBtn.classList.add("apod-btn-hidden");
        setTimeout(() => {
          getRandomApodBtn.classList.remove("apod-btn-hidden");
          getRandomApodBtn.classList.add("apod-btn-active");
        }, 500);
        active = true;
      }

      console.log(data.title);
      console.log(apodTitle);

      // Check if the APOD is an image or a video
      if (data.media_type === "image") {
        // Create an image element and set its attributes
        const apodImage = document.createElement("img");
        apodImage.classList.add("apod-image");
        apodImage.classList.add("skeleton");
        apodImage.src = data.url;
        apodImage.alt = data.title;

        // Clear the container and append the image
        apodContainer.innerHTML = "";
        apodContainer.appendChild(apodImage);
      } else if (data.media_type === "video") {
        // Create an iframe element and set its attributes
        const apodVideo = document.createElement("iframe");
        apodVideo.src = data.url;
        apodVideo.width = "640";
        apodVideo.height = "360";
        apodVideo.frameborder = "0";
        apodVideo.allowfullscreen = true;

        // Clear the container and append the video
        apodContainer.innerHTML = "";
        apodContainer.appendChild(apodVideo);
      }
    } catch (error) {
      console.error("Error fetching APOD:", error);
    }
  };

  // Add event listener to the button to fetch a random APOD on click
  getRandomApodBtn.addEventListener("click", fetchRandomApod);
});

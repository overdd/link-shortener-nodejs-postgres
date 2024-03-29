async function shortenUrl() {
  const longUrlInput = document.getElementById("longUrl").value;
  const urlError = document.getElementById("urlError");

  if (!longUrlInput) {
    alert("Please enter a URL");
    return;
  }

  try {
    const response = await fetch("/short", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl: longUrlInput }),
    });
    urlError.style.display = "none";

    const data = await response.json();

    if (response.status === 200) {
      const shortenedUrl = document.getElementById("shortenedUrl");
      shortenedUrl.innerHTML = `Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
    } else {
      urlError.style.display = "block";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

function resetPlaceholder() {
  const input = document.getElementById("longUrl");
  const value = input.value.trim();

  if (value !== "" && !value.startsWith("https://")) {
    input.value = "https://" + value;
  }
}

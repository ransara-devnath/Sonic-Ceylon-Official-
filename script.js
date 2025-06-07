const githubRepo = "ransara-devnath/Sonic-Ceylon-Official-";

async function searchSongs() {
    const searchInput = document.getElementById("searchInput");
    const songList = document.getElementById("song-list");

    // Add searching animation
    searchInput.classList.add("searching");

    const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/uploads`);
    const songs = await response.json();

    songList.innerHTML = "";
    let found = false;

    songs.forEach(song => {
        let folderName = song.name.toLowerCase();
        if (folderName.includes(searchInput.value.toLowerCase())) {
            let songPath = `https://raw.githubusercontent.com/${githubRepo}/main/uploads/${song.name}/song.mp3`;
            let imagePath = `https://raw.githubusercontent.com/${githubRepo}/main/uploads/${song.name}/song.jpg`;

            let songItem = document.createElement("div");
            songItem.className = "song-item";
            songItem.innerHTML = `
                <img src="${imagePath}" alt="Song Preview" width="150">
                <h2 onclick="openPlayer('${songPath}', '${imagePath}', '${song.name}')">${song.name} (SonicCeylon)</h2>
            `;

            songList.appendChild(songItem);
            found = true;
}
});

    if (!found) {
        songList.innerHTML = `<p style="color: red;">❌ No matching song found.</p>`;
}

    // Remove animation once search is complete
    setTimeout(() => {
        searchInput.classList.remove("searching");
}, 1000);
}

function openPlayer(songUrl, imageUrl, songName) {
    // Clear previous search results
    document.getElementById("song-list").innerHTML = "";

    // Set player values
    document.getElementById("player-image").src = imageUrl;
    document.getElementById("player-title").innerText = songName;
    document.getElementById("player-source").src = songUrl;

    const audio = document.getElementById("audio-player");
    audio.load(); // Load new song
}

function startDownload(songUrl, songName) {
    let countdown = 10;
    const downloadButton = document.querySelector("button");

    // Disable button during countdown
    downloadButton.disabled = true;

    const interval = setInterval(() => {
        downloadButton.innerText = `⬇️ Download MP3 (${countdown}s)`;
        countdown--;

        if (countdown === 0) {
            clearInterval(interval);
            downloadButton.innerText = "⬇️ Click to Download";
            downloadButton.disabled = false; // Enable button after countdown
            downloadButton.onclick = () => window.location.href = songUrl;
}
}, 1000);
}
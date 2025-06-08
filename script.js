const githubRepo = "ransara-devnath/Sonic-Ceylon-Official-";

// Remove looping text animation when clicked
document.getElementById("looping-text").addEventListener("click", () => {
    document.getElementById("looping-text").style.animation = "none";
});

// Search Songs Function
async function searchSongs() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const songList = document.getElementById("song-list");

    const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/uploads`);
    const songs = await response.json();

    songList.innerHTML = "";
    let found = false;

    songs.forEach(song => {
        let folderName = song.name.toLowerCase();
        if (folderName.includes(searchInput)) {
            let songPath = `https://raw.githubusercontent.com/${githubRepo}/main/uploads/${song.name}/song.mp3`;
            let imagePath = `https://raw.githubusercontent.com/${githubRepo}/main/uploads/${song.name}/song.jpg`;

            let songItem = document.createElement("div");
            songItem.className = "song-item";
            songItem.innerHTML = `
                <img src="${imagePath}" alt="Song Preview" width="150">
                <h2 onclick="selectSong('${songPath}', '${imagePath}', '${song.name}')">${song.name} (SonicCeylon)</h2>
            `;

            songList.appendChild(songItem);
            found = true;
}
});

    if (!found) {
        songList.innerHTML = `<p style="color: red;">❌ No matching song found.</p>`;
}
}

// Function to Select a Song and Remove Other Results
function selectSong(songUrl, imageUrl, songName) {
    document.getElementById("song-list").innerHTML = ""; // Remove other search results
    openPlayer(songUrl, imageUrl, songName);
}

// Open Custom Music Player
function openPlayer(songUrl, imageUrl, songName) {
    document.getElementById("player").innerHTML = `
        <img src="${imageUrl}" alt="Song Preview" width="200">
        <h2>${songName} (SonicCeylon)</h2>
        <audio id="audio-player" controls>
            <source src="${songUrl}" type="audio/mp3">
        </audio>
        <button onclick="startDownload('${songUrl}', '${songName}')">⬇️ Download MP3</button>
    `;

    const audio = document.getElementById("audio-player");
    audio.play(); // Auto-play music

    audio.addEventListener("play", () => {
        document.getElementById("player").style.animation = "pulse 1s infinite";
});

    audio.addEventListener("pause", () => {
        document.getElementById("player").style.animation = "none";
});
}

// Start Download with Countdown
function startDownload(songUrl, songName) {
    let countdown = 10;
    const downloadButton = document.querySelector("button");
   const interval = setInterval(() => {
        downloadButton.innerText = `⬇️ Download MP3 (${countdown}s)`;
        countdown--;

        if (countdown === 0) {
            clearInterval(interval);
            downloadButton.innerText = "⬇️ Click to Download";
            downloadButton.onclick = () => window.location.href = songUrl;
}
}, 1000);
}
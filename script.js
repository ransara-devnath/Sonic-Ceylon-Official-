const githubRepo = "ransara-devnath/Sonic-Ceylon-Official-";

// Search Function
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
                <img src="${imagePath}" alt="Song Preview" width="150" onclick="openPlayer('${songPath}', '${imagePath}', '${song.name}')">
                <h2>${song.name} (SonicCeylon)</h2>
            `;

            songList.appendChild(songItem);
            found = true;
}
});

    if (!found) {
        songList.innerHTML = `<p style="color: red;">❌ No matching song found.</p>`;
}
}

// **Open Player When Song is Played**
function openPlayer(songUrl, imageUrl, songName) {
    const playerSection = document.getElementById("player");

    // Show Loading Animation
    playerSection.innerHTML = `<p class="loading-animation">🎶 Loading...</p>`;

    // Simulate Loading Delay
    setTimeout(() => {
        playerSection.innerHTML = `
            <img src="${imageUrl}" alt="Song Preview" width="200" onclick="togglePlay()">
            <h2>${songName} (SonicCeylon)</h2>
            <audio controls id="audio-player">
                <source src="${songUrl}" type="audio/mp3">
            </audio>
            <button onclick="startDownload('${songUrl}', '${songName}')">⬇️ Download MP3</button>
        `;

        playerSection.style.animation = "fadeIn 0.5s ease-in-out";
}, 1200);

    // Clear search results when song plays
    document.getElementById("song-list").innerHTML = "";
}

// **Toggle Play/Pause Function**
function togglePlay() {
    const audio = document.getElementById("audio-player");

    if (audio.paused) {
        audio.play();
        document.getElementById("player").style.opacity = "0.6";
} else {
        audio.pause();
        document.getElementById("player").style.opacity = "1";
}
}
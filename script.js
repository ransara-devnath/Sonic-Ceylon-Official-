const githubRepo = "ransara-devnath/Sonic-Ceylon-Official-";

window.onload = function() {
    setTimeout(() => {
        document.getElementById("loading-animation").style.display = "none";
}, 2000);
};

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
    audio.play(); // Auto-play the selected song

    // Make sure player becomes visible
    document.getElementById("custom-player").style.display = "block";
}

document.getElementById("play-pause").addEventListener("click", function() {
    const audio = document.getElementById("audio-player");
   if (audio.paused) {
        audio.play();
        this.innerText = "⏸️";
} else {
        audio.pause();
        this.innerText = "▶️";
}
});

function startDownload() {
    const audioPlayer = document.getElementById("audio-player");
    const songUrl = document.getElementById("player-source").src;
    const songName = document.getElementById("player-title").innerText;

    let countdown = 10;
    const downloadButton = document.querySelector("#custom-player button");

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
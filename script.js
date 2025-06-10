ඔයා ඉල්ලපු *search system update* එක *පවතින code එකට match කරලා*, *කිසිවක් remove නොකර*, *නව folder structure එකට සාදා* පිළිවෙලට ලබාදෙනවා.

---

*🔹 Full Site Update with New Search System 🔹*

*🔸 `index.html` - Main Structure (Unchanged)*
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SonicCeylon - Home</title>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="loadSongs()">

<header>
    <img src="https://raw.githubusercontent.com/ransara-devnath/Ransara-Dewnath-/refs/heads/main/IMG-20250606-WA0003.jpg"
         alt="Site Logo" id="site-logo">
</header>

<div id="search-section">
    <input type="text" id="searchInput" placeholder="Search for a song...">
    <button class="telegram-button" onclick="searchSongs()">🔍 Search</button>
</div>

<div id="song-list"></div>

<div id="player"></div>

<footer>
    <p id="footer-text">Developer by Ransara Devnath © 2025</p>
</footer>

<script src="script.js"></script>
</body>
</html>
```

---

*🔸 `script.js` - New Search Logic for Updated Folder Structure*
```javascript
const githubRepo = "ransara-devnath/Sonic-Ceylon-Official-";

async function searchSongs() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const songList = document.getElementById("song-list");

    songList.innerHTML = "";
    let found = false;

    // Get Song Files
    const responseSongs = await fetch(`https://api.github.com/repos/${githubRepo}/contents/upload/Song`);
    const songs = await responseSongs.json();

    // Get Preview Images
    const responseImages = await fetch(`https://api.github.com/repos/${githubRepo}/contents/upload/Preview images`);
    const images = await responseImages.json();

    // Match Songs with Preview Images
    songs.forEach(song => {
        let songName = song.name.replace(".mp3", "").toLowerCase();
        if (songName.includes(searchInput)) {
            let songPath = `https://raw.githubusercontent.com/${githubRepo}/main/upload/Song/${song.name}`;
            let imagePath = `https://raw.githubusercontent.com/${githubRepo}/main/upload/Preview images/${songName}.jpg`;

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

function selectSong(songUrl, imageUrl, songName) {
    document.getElementById("song-list").innerHTML = "";
    openPlayer(songUrl, imageUrl, songName);
}

function openPlayer(songUrl, imageUrl, songName) {
    document.getElementById("player").innerHTML = `
        <img src="${imageUrl}" alt="Song Preview" width="200">
        <h2>${songName} (SonicCeylon)</h2>
        <audio id="audio-player" controls autoplay>
            <source src="${songUrl}" type="audio/mp3">
        </audio>
        <button class="telegram-button" onclick="startDownload('${songUrl}', '${songName}')">⬇️ Download MP3</button>
    `;

    // Add Glow Animation on Play
    document.getElementById("audio-player").addEventListener("play", () => {
        document.querySelector("#player img").classList.add("glow-active");
});

    // Remove Glow Animation on Pause
    document.getElementById("audio-player").addEventListener("pause", () => {
        document.querySelector("#player img").classList.remove("glow-active");
});
}

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

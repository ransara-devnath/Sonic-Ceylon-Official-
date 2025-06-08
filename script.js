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
    document.getElementById("song-title").innerText = songName;
    document.getElementById("album-cover").src = imageUrl;
    document.getElementById("audio-player").src = songUrl;

    const audio = document.getElementById("audio-player");
    audio.play(); // Auto-play when song loads
}

// Music Player Controls
function playAudio() { document.getElementById("audio-player").play();}
function pauseAudio() { document.getElementById("audio-player").pause();}
function stopAudio() { let audio = document.getElementById("audio-player"); audio.pause(); audio.currentTime = 0;}
function repeatSong() { let audio = document.getElementById("audio-player"); audio.loop =!audio.loop;}
function shuffleSongs() { /* Implement shuffle logic here _/}
function prevSong() { /_ Implement previous song logic _/}
function nextSong() { /_ Implement next song logic */}
function startDownload() { let audio = document.getElementById("audio-player").src; window.location.href = audio;}
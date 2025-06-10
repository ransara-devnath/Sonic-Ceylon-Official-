const githubRepo = "ransara-devnath/Sonic-Ceylon-Official-";

function searchSongs() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const songList = document.getElementById("song-list");

    songList.innerHTML = "";
    let found = false;

    // Define available songs list manually
    const songNames = ["Sadamali", "Prarthana", "Hitha Mage"]; // Add more songs here

    songNames.forEach(songName => {
        if (songName.toLowerCase().includes(searchInput)) {
            let songPath = `upload/Song/${songName}.mp3`;
            let imagePath = `upload/Preview images/${songName}.jpg`;

            let songItem = document.createElement("div");
            songItem.className = "song-item";
            songItem.innerHTML = `
                <img src="${imagePath}" alt="Song Preview" width="150">
                <h2 onclick="selectSong('${songPath}', '${imagePath}', '${songName}')">${songName} (SonicCeylon)</h2>
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

    document.getElementById("audio-player").addEventListener("play", () => {
        document.querySelector("#player img").classList.add("glow-active");
});

    document.getElementById("audio-player").addEventListener("pause", () => {
        document.querySelector("#player img").classList.remove("glow-active");
});
}

document.getElementById("searchInput").addEventListener("focus", function() {
    document.getElementById("looping-text").style.display = "none";
});

document.getElementById("searchInput").addEventListener("blur", function() {
    document.getElementById("looping-text").style.display = "block";
});

const githubRepo = "ransara-devnath/Sonic-Ceylon-Official-";

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
                <h2 onclick="openPlayer('${songPath}', '${imagePath}', '${song.name}')">${song.name} (SonicCeylon)</h2>
            `;

            songList.appendChild(songItem);
            found = true;
}
});

    if (!found) {
        songList.innerHTML = `<p style="color: red;">❌ No matching song found.</p>`;
}
}

function openPlayer(songUrl, imageUrl, songName) {
    document.getElementById("player").innerHTML = `
        <img src="${imageUrl}" alt="Song Preview" width="200">
        <h2>${songName} (SonicCeylon)</h2>
        <audio controls>
            <source src="${songUrl}" type="audio/mp3">
        </audio>
        <button onclick="startDownload('${songUrl}', '${songName}')">⬇️ Download MP3</button>
    `;
        }

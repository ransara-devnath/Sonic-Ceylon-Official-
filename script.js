const githubToken = "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";  // Replace this with your actual GitHub PAT
const githubUsername = "ransara-devnath";
const repoName = "Sonic-Ceylon-Official-";

async function loadSongs() {
    const songList = document.getElementById("song-list");

    const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/uploads/songs`);
    const songs = await response.json();

    songList.innerHTML = "";
    songs.forEach(song => {
        let songName = song.name.replace(".mp3", "");

        let songItem = document.createElement("div");
        songItem.className = "song-item";
        songItem.innerHTML = `<p>${songName}</p>`;
        songItem.onclick = () => openPlayer(song.download_url, songName);

        songList.appendChild(songItem);
});
}

function openPlayer(songUrl, songName) {
    document.getElementById("player").innerHTML = `
        <h2>${songName}</h2>
        <audio controls>
            <source src="${songUrl}" type="audio/mp3">
        </audio>
        <a href="${songUrl}" download="${songName}.mp3">
            <button>⬇️ Download MP3</button>
        </a>
    `;
}

async function uploadSong() {
    const songFile = document.getElementById("songInput").files[0];
    const songName = document.getElementById("songName").value;

    if (!songFile ||!songName) {
        alert("Please fill all fields and select a song!");
        return;
}

    const filePath = `uploads/${songName}/${songName}.mp3`;

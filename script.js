const githubToken = "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";  // Add your actual GitHub token here
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
        alert("Please enter a song name and select a file!");
        return;
}

    const filePath = `uploads/${songName}/${songName}.mp3`;
    uploadToGitHub(songFile, filePath);
}

async function uploadToGitHub(file, filePath) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async function () {
        const base64File = btoa(String.fromCharCode(...new Uint8Array(reader.result)));

        const url = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `token ${githubToken}`,
                "Content-Type": "application/json"
},
            body: JSON.stringify({
                message: `Uploading ${file.name}`,
                content: base64File
})
});

        if (response.ok) {
            alert(`"${file.name}" uploaded successfully!`);
} else {
            alert("Upload failed! Check API permissions.");
}
};
}

function searchSongs() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let songList = document.getElementById("song-list");

    songList.innerHTML = `<p>Searching for "${searchInput}"...</p>`;
    }

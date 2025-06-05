function uploadSong() {
    const songFile = document.getElementById("songInput").files[0];
    const thumbnailFile = document.getElementById("thumbnailInput").files[0];

    if (!songFile ||!thumbnailFile) {
        alert("Please select a song and a thumbnail!");
        return;
}

    const formData = new FormData();
    formData.append("song", songFile);
    formData.append("thumbnail", thumbnailFile);

    fetch("/upload", { method: "POST", body: formData})
.then(response => response.json())
.then(data => {
        if (data.success) {
        document.getElementById("songList").innerHTML += `
                <div class="song-item">
                    <img src="${data.thumbnailPath}" alt="Thumbnail">
                    <audio controls>
                        <source src="${data.songPath}" type="audio/mp3">
                    </audio>
                    <button onclick="downloadSong('${data.songPath}')">⬇️ Download</button>
                </div>
            `;
}
});
}

function updateClock() {
    const options = { timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true};
    document.getElementById("time").textContent = new Date().toLocaleTimeString("en-US", options);
}

// Update time every second
setInterval(updateClock, 1000);
updateClock();
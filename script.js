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
    formData.append("songName", songFile.name); // Store song name for search

    fetch("/upload", { method: "POST", body: formData})
.then(response => response.json())
.then(data => {
        if (data.success) {
            document.getElementById("songList").innerHTML += `
                <div class="song-item" data-song-name="${songFile.name.toLowerCase()}">
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

// 🔥 Search Function Fix
function searchSong() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let songs = document.querySelectorAll(".song-item");

    songs.forEach(song => {
        let songName = song.getAttribute("data-song-name");
        song.style.display = songName.includes(searchInput)? "block": "none";
});
}

// 🔥 Typing Animation Function
const typingText = document.getElementById("typing-text");
const messages = [
    "🎧 Discover Music",
    "📀 Download Hits",
    "🎶 Feel the Rhythm",
    "🔥 Non-Stop Vibes",
    "💻 Developed with ❤️ by Ransara Devnath • 🇱🇰 Powered by SonicCeylon © 2025"
];

let messageIndex = 0;
let charIndex = 0;
let typingSpeed = 100;
let erasingSpeed = 50;
let delayBetweenTexts = 2000;

function typeText() {
    if (charIndex < messages[messageIndex].length) {
        typingText.textContent += messages[messageIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
} else {
        setTimeout(eraseText, delayBetweenTexts);
}
}

function eraseText() {
    if (charIndex> 0) {
        typingText.textContent = messages[messageIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, erasingSpeed);
} else {
        messageIndex = (messageIndex + 1) % messages.length;
        setTimeout(typeText, typingSpeed);
}
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeText, typingSpeed);
});

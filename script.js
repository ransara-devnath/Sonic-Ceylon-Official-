document.addEventListener("click", function() {
    document.getElementById("looping-text").style.display = "none";
});

document.getElementById("searchInput").addEventListener("focus", function() {
    document.getElementById("looping-text").style.display = "none";
});
document.getElementById("searchInput").addEventListener("blur", function() {
    document.getElementById("looping-text").style.display = "block";
});

function openPlayer(songUrl, imageUrl, songName) {
    document.getElementById("player").innerHTML = `
        <img src="${imageUrl}" alt="Song Preview" width="200">
        <h2>${songName} (SonicCeylon)</h2>
        <audio controls id="audio-player">
            <source src="${songUrl}" type="audio/mp3">
        </audio>
        <div id="dj-animation"></div>
    `;

    const audioPlayer = document.getElementById("audio-player");
    const djAnimation = document.getElementById("dj-animation");

    audioPlayer.addEventListener("play", function() {
        djAnimation.innerHTML = "🔥🎧 DJ Mode ON!";
        djAnimation.style.animation = "djEffect 1s infinite alternate";
});

    audioPlayer.addEventListener("pause", function() {
        djAnimation.innerHTML = "";
        djAnimation.style.animation = "none";
});
}
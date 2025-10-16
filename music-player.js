document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('background-music');
    
    if (!audioPlayer) {
        return;
    }

    const musicTime = sessionStorage.getItem('musicTime');
    const isMusicPlaying = sessionStorage.getItem('isMusicPlaying');

    if (isMusicPlaying === 'true' && musicTime) {
        audioPlayer.currentTime = parseFloat(musicTime);
        audioPlayer.play().catch(e => console.error("Autoplay was prevented:", e));
    }

    window.addEventListener('beforeunload', function() {
        if (!audioPlayer.paused) {
            sessionStorage.setItem('isMusicPlaying', 'true');
            sessionStorage.setItem('musicTime', audioPlayer.currentTime);
        } else {
            sessionStorage.setItem('isMusicPlaying', 'false');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LOGIKA UNTUK PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
    });

    const photoGrid = document.getElementById('gallery-grid');
    const videoGrid = document.getElementById('video-grid');

    galleryData.forEach(item => {
        // Jika tipe item adalah 'photo'
        if (item.type === 'photo') {
            const photoItem = document.createElement('div');
            photoItem.className = 'gallery-item';
            
            photoItem.innerHTML = `
                <img src="${item.url}" alt="${item.alt}">
                <div class="caption">${item.caption}</div>
            `;
            
            photoGrid.appendChild(photoItem);
        }
        
        // Jika tipe item adalah 'video'
        else if (item.type === 'video') {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            
            videoItem.innerHTML = `
                <iframe 
                    src="${item.url}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                <div class="caption">${item.caption}</div>
            `;
            
            videoGrid.appendChild(videoItem);
        }
    });

});
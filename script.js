document.addEventListener('DOMContentLoaded', function() {

    // ===== LOGIKA UNTUK PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
    });

    // ===== LOGIKA UNTUK MENU NAVIGASI =====
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // ===== LOGIKA UNTUK POP UP PETUNJUK MENU =====
    const menuHintPopup = document.getElementById('menu-hint-popup');
    
    function showMenuHint() {
        setTimeout(() => {
            menuHintPopup.classList.add('show');
            setTimeout(() => {
                menuHintPopup.classList.remove('show');
            }, 5000);
        }, 1000);
    }

    // ===== LOGIKA UNTUK POP UP AWALAN =====
    const welcomeModal = document.getElementById('welcomeModal');
    const closeWelcomeBtn = document.getElementById('closeWelcomeBtn');

    if (sessionStorage.getItem('welcomePopupClosed')) {
        welcomeModal.style.display = 'none';
    } else {
        welcomeModal.style.display = 'flex';
        setTimeout(() => {
            welcomeModal.classList.add('show');
        }, 100);
    }

    closeWelcomeBtn.addEventListener('click', function() {
        const audioPlayer = document.getElementById('background-music');
        if (audioPlayer.paused) {
            audioPlayer.play().catch(e => console.error("Autoplay dicegah:", e));
            sessionStorage.setItem('isMusicPlaying', 'true');
        }
        welcomeModal.classList.remove('show');
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 500);
        sessionStorage.setItem('welcomePopupClosed', 'true');
        showMenuHint(); 
    });

    // ===== LOGIKA UNTUK MODAL DETAIL ANGGOTA =====
    const detailModal = document.getElementById('detailModal');
    const closeDetailBtn = detailModal.querySelector('.close-button');
    const clickableItems = document.querySelectorAll('.clickable');
    const modalContent = detailModal.querySelector('.modal-content');

    const modalImg = document.getElementById('modalImg');
    const modalNama = document.getElementById('modalNama');
    const modalJabatan = document.getElementById('modalJabatan');
    const modalSangga = document.getElementById('modalSangga');
    const modalTingkatan = document.getElementById('modalTingkatan');

    clickableItems.forEach(item => {
        item.addEventListener('click', function() {
            const nama = item.getAttribute('data-nama');
            const jabatan = item.getAttribute('data-jabatan');
            const sangga = item.getAttribute('data-sangga');
            const tingkatan = item.getAttribute('data-tingkatan');
            const imgSrc = item.getAttribute('data-img');

            if (sangga.includes('PA')) {
                modalImg.style.borderColor = '#4299e1'; // Biru
            } else if (sangga.includes('PI')) {
                modalImg.style.borderColor = '#e53e3e'; // Merah
            } else {
                modalImg.style.borderColor = '#718096'; // Abu-abu
            }

            modalImg.src = imgSrc;
            modalNama.textContent = nama;
            modalJabatan.textContent = jabatan;
            modalSangga.textContent = sangga;
            modalTingkatan.textContent = tingkatan;

            detailModal.style.display = 'flex';
            setTimeout(() => {
                detailModal.classList.add('show');
                modalContent.classList.add('show');
            }, 10);
        });
    });

    function closeDetailModal() {
        modalContent.classList.remove('show');
        setTimeout(() => {
            detailModal.classList.remove('show');
            detailModal.style.display = 'none';
        }, 300);
    }

    closeDetailBtn.addEventListener('click', closeDetailModal);
    window.addEventListener('click', function(event) {
        if (event.target == detailModal) {
            closeDetailModal();
        }
    });

    // ===== LOGIKA UNTUK MODAL LIHAT FOTO =====
    const imageModal = document.getElementById('imageModal');
    const modalImageFull = document.getElementById('modalImageFull');
    const closeImageBtn = imageModal.querySelector('.close-image-button');

    modalImg.addEventListener('click', function() {
        modalImageFull.src = this.src;
        imageModal.style.display = 'flex';
        setTimeout(() => imageModal.classList.add('show'), 10);
    });

    function closeImageModal() {
        imageModal.classList.remove('show');
        setTimeout(() => imageModal.style.display = 'none', 300);
    }
    
    closeImageBtn.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', function(event) {
        if (event.target == imageModal) {
            closeImageModal();
        }
    });

    // ===== LOGIKA UNTUK ANIMASI SCROLL BERULANG =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    const animatedElements = document.querySelectorAll('.card, .member-card, .vision-mission');
    animatedElements.forEach((el) => observer.observe(el));
});
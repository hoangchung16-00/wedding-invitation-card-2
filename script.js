// Danh sách ảnh cho album (những ảnh còn lại – sửa tên file theo ảnh bạn có)
// Đã dùng riêng: DEN09774.jpg (nền), DEN09792.jpg (cô dâu), DEN09838.jpg (chú rể), DEN00562.jpg (thư mời)
const albumImages = [
    'DEN00414.JPG', 'DEN00499.jpg', 'DEN00640.jpg', 'DEN00729.jpg','DEN00448.jpg', 'DEN00700.jpg', 
    'DEN09537.jpg', 'DEN09572.jpg',
    'DEN00017.jpg', 'DEN00221.jpg', 'DEN00313.jpg', 'DEN00004.jpg', 
]

function buildGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const imageBase = 'image/';
    albumImages.forEach((filename, i) => {
        const src = imageBase + filename;
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const num = i + 1;
        item.innerHTML = '<img src="' + src + '" alt="Album ' + num + '" onerror="this.style.display=\'none\'; this.nextElementSibling.classList.add(\'show\');">' +
            '<div class="gallery-image-placeholder"><p class="placeholder-text">' + filename + '</p></div>';
        grid.appendChild(item);
    });
    // Gắn lại click và observer cho item mới
    grid.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => console.log('Gallery item clicked'));
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2026-04-04T11:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.padding = '15px 0';
    }
    
    lastScroll = currentScroll;
});

// Popup "Gửi thiệp mừng" – mở/đóng
const modalWishes = document.getElementById('modalWishes');
const btnSendWishes = document.getElementById('btnSendWishes');
const modalClose = document.getElementById('modalClose');

function openWishesModal() {
    if (modalWishes) {
        modalWishes.classList.add('show');
        modalWishes.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeWishesModal() {
    if (modalWishes) {
        modalWishes.classList.remove('show');
        modalWishes.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

if (btnSendWishes) {
    btnSendWishes.addEventListener('click', openWishesModal);
}
if (modalClose) {
    modalClose.addEventListener('click', closeWishesModal);
}
if (modalWishes) {
    modalWishes.addEventListener('click', function(e) {
        if (e.target === modalWishes) closeWishesModal();
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe intro và thư mời (album được tạo trong buildGallery)
document.querySelectorAll('.intro-item, .invitation-card, .invitation-day').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Tạo album từ danh sách ảnh còn lại
buildGallery();

// Music Player Toggle
const musicToggle = document.getElementById('musicToggle');
const weddingMusic = document.getElementById('weddingMusic');

if (musicToggle && weddingMusic) {
    const playIcon = musicToggle.querySelector('.play-icon');
    const pauseIcon = musicToggle.querySelector('.pause-icon');

    if (playIcon && pauseIcon) {
        musicToggle.addEventListener('click', () => {
            if (weddingMusic.paused) {
                weddingMusic.play().catch(err => {
                    console.log('Audio playback failed:', err);
                });
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                musicToggle.setAttribute('aria-label', 'Tạm dừng nhạc');
            } else {
                weddingMusic.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                musicToggle.setAttribute('aria-label', 'Phát nhạc');
            }
        });

        // Tự phát nhạc khi vào trang
        function startMusic() {
            weddingMusic.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                musicToggle.setAttribute('aria-label', 'Tạm dừng nhạc');
            }).catch(() => {});
        }
        startMusic();

        // Nếu trình duyệt chặn autoplay: phát nhạc ngay khi user click/chạm lần đầu
        const once = { click: false, touch: false };
        document.addEventListener('click', () => {
            if (!once.click && weddingMusic.paused) {
                once.click = true;
                startMusic();
            }
        }, { once: true });
        document.addEventListener('touchstart', () => {
            if (!once.touch && weddingMusic.paused) {
                once.touch = true;
                startMusic();
            }
        }, { once: true });
    }
}
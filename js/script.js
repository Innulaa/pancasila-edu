document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true, // Whether animation should happen only once - while scrolling down
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Header Active Link & Login State Management ---
    const navLinks = document.querySelectorAll('.header nav ul li a');
    const loginStatus = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('loggedInUser');
    const userAvatar = localStorage.getItem(`${username}_userAvatar`) || 'fas fa-user';
    const headerNav = document.querySelector('.header nav ul');

    function updateHeaderNav() {
        if (loginStatus === 'true' && username) {
            headerNav.innerHTML = `
                <li><a href="index.html">Beranda</a></li>
                <li><a href="materi.html">Materi</a></li>
                <li><a href="kuis.html">Kuis</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="profile.html" id="profileLink">Profil <i class="${userAvatar} profile-icon"></i></a></li>
                <li><a href="#" id="logoutBtn" class="btn btn-primary">Logout</a></li>
            `;
            headerNav.querySelector('#logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('loggedInUser');
                window.location.href = 'index.html'; // Redirect to home after logout
            });
        } else {
            headerNav.innerHTML = `
                <li><a href="index.html">Beranda</a></li>
                <li><a href="materi.html">Materi</a></li>
                <li><a href="kuis.html">Kuis</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="login.html">Login</a></li>
            `;
        }
        // Re-apply active class based on current page
        document.querySelectorAll('.header nav ul li a').forEach(link => {
            if (link.href === window.location.href || (link.getAttribute('href') === 'index.html' && (window.location.pathname === '/' || window.location.pathname.endsWith('/pancasila_edu/')))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateHeaderNav(); // Initial call

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const currentDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', currentDarkMode);
        darkModeToggle.innerHTML = currentDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // --- BGM (Optional) ---
    // You can uncomment and customize this section if you want BGM
    /*
    const bgmAudio = new Audio('path/to/your/nationalism_bgm.mp3'); // Replace with your audio file
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3; // Adjust volume as needed

    const bgmToggle = document.createElement('button');
    bgmToggle.id = 'bgm-toggle';
    bgmToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    document.body.appendChild(bgmToggle);

    let isBgmPlaying = localStorage.getItem('isBgmPlaying') === 'true';

    function toggleBGM() {
        if (isBgmPlaying) {
            bgmAudio.pause();
            bgmToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            bgmAudio.play().catch(e => console.log("BGM autoplay blocked:", e));
            bgmToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isBgmPlaying = !isBgmPlaying;
        localStorage.setItem('isBgmPlaying', isBgmPlaying);
    }

    bgmToggle.addEventListener('click', toggleBGM);

    // Autoplay BGM if previously playing, but handle browser restrictions
    if (isBgmPlaying) {
        bgmAudio.play().catch(e => {
            console.log("BGM autoplay blocked. User interaction needed.", e);
            // Optionally, show a message to the user to click to play BGM
        });
    }
    */

    // --- Popup Utility (for Daily Challenge, Quiz Results) ---
    window.showPopup = (title, message, type = 'info', callback = null) => {
        let popupOverlay = document.getElementById('global-popup-overlay');
        if (!popupOverlay) {
            popupOverlay = document.createElement('div');
            popupOverlay.id = 'global-popup-overlay';
            popupOverlay.className = 'popup-overlay';
            popupOverlay.innerHTML = `
                <div class="popup-content">
                    <h3 id="popup-title"></h3>
                    <p id="popup-message"></p>
                    <button id="popup-close-btn" class="btn btn-primary">Tutup</button>
                </div>
            `;
            document.body.appendChild(popupOverlay);
        }

        document.getElementById('popup-title').innerText = title;
        document.getElementById('popup-message').innerText = message;

        const closeBtn = document.getElementById('popup-close-btn');
        closeBtn.onclick = () => {
            popupOverlay.classList.remove('active');
            if (callback) callback();
        };

        popupOverlay.classList.add('active');
    };
});

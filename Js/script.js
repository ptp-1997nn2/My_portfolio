document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Logic ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- 2. Header Scroll Logic ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
            navbar.classList.remove('py-6', 'bg-transparent');
            // Nếu đang ở trang contact (dark mode), chỉnh lại màu nền header cho hợp
            if(document.body.classList.contains('bg-[#0a0a0a]')) {
                 navbar.classList.remove('bg-white/90', 'shadow-sm');
                 navbar.classList.add('bg-black/80', 'border-b', 'border-white/10');
            }
        } else {
            navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4', 'bg-black/80', 'border-b', 'border-white/10');
            navbar.classList.add('py-6', 'bg-transparent');
        }
    });

    // --- 3. Scroll Reveal Animation ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Skill bars
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-target');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));


    // --- 4. 3D TILT CARD LOGIC (Chỉ chạy trên Desktop > 768px) ---
    const card = document.querySelector('.tilt-card');
    const cardWrap = document.querySelector('.tilt-card-wrap');

    // Kiểm tra kích thước màn hình
    if (card && cardWrap && window.innerWidth > 768) {
        cardWrap.addEventListener('mousemove', (e) => {
            const rect = cardWrap.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const xRotation = -1 * ((y - rect.height / 2) / 20); 
            const yRotation = (x - rect.width / 2) / 20;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        cardWrap.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }

    // --- 5. REAL-TIME CLOCK ---
    const timeDisplay = document.getElementById('local-time');
    if (timeDisplay) {
        const updateTime = () => {
            const now = new Date();
            const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' };
            timeDisplay.textContent = now.toLocaleTimeString('en-US', options);
        };
        setInterval(updateTime, 1000);
        updateTime();
    }

    // --- 6. COPY EMAIL ---
    const emailContainer = document.getElementById('contact-card');
    const emailText = document.getElementById('email-text');
    const toast = document.getElementById('toast');

    if (emailContainer && emailText && toast) {
        emailContainer.addEventListener('click', () => {
            const email = emailText.innerText;
            navigator.clipboard.writeText(email).then(() => {
                toast.classList.remove('translate-y-20', 'opacity-0');
                setTimeout(() => {
                    toast.classList.add('translate-y-20', 'opacity-0');
                }, 2000);
            });
        });
    }

});
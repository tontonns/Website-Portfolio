document.addEventListener("DOMContentLoaded", function() {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    const navbar = document.querySelector(".navbar");
    const scrollProgress = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("back-to-top");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    let lastScrollY = window.scrollY;


    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    
        if (currentScrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
        
        lastScrollY = currentScrollY;
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", () => {
            let currentSectionId = "";
            const scrollY = window.pageYOffset; 

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const triggerPoint = sectionTop - 75; 

                if (scrollY >= triggerPoint) {
                    currentSectionId = section.getAttribute("id");
                }
            });
            
            const isAtBottom = (window.innerHeight + scrollY) >= document.body.offsetHeight - 5;

            if (isAtBottom) {
                currentSectionId = sections[sections.length - 1].getAttribute("id");
            }

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + currentSectionId) {
                    link.classList.add("active");
                }
            });
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                if (entry.target.classList.contains('section')) {
                    entry.target.classList.add('show');
                }

                if (entry.target.classList.contains('skills-section')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width;
                        }, index * 200);
                    });
                }

                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animated');
                }
            } 
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    const sectionsToObserve = document.querySelectorAll('.section');
    sectionsToObserve.forEach((section) => observer.observe(section));

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const projectGrid = document.getElementById("project-grid");

    if (prevBtn && nextBtn && projectGrid) {
        
        const scrollAmount = 350 + 32; 

        nextBtn.addEventListener("click", () => {
            projectGrid.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        });

        prevBtn.addEventListener("click", () => {
            projectGrid.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            });
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        projectGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            projectGrid.classList.add('active');
            startX = e.pageX - projectGrid.offsetLeft;
            scrollLeft = projectGrid.scrollLeft;
        });

        projectGrid.addEventListener('mouseleave', () => {
            isDown = false;
            projectGrid.classList.remove('active');
        });

        projectGrid.addEventListener('mouseup', () => {
            isDown = false;
            projectGrid.classList.remove('active');
        });

        projectGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectGrid.offsetLeft;
            const walk = (x - startX) * 2;
            projectGrid.scrollLeft = scrollLeft - walk;
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(247, 193, 59, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animation = `particleFloat ${5 + Math.random() * 10}s linear infinite`;
        
        hero.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    setInterval(createParticle, 2000);

}); 
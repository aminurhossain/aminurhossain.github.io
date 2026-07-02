document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower trail with requestAnimationFrame
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-tag, .stat-card, .filter-btn, input, textarea');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case page is loaded scrolled
    handleScroll();

    // ==========================================
    // ACTIVE NAVIGATION LINKS ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const activeNavOnScroll = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', activeNavOnScroll);

    // ==========================================
    // DARK / LIGHT THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const root = document.documentElement;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        if (current === 'light') {
            root.removeAttribute('data-theme');
            localStorage.setItem('portfolio-theme', 'dark');
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio-theme', 'light');
            themeIcon.className = 'fa-solid fa-sun';
        }
    });

    // ==========================================
    // TYPING ANIMATION
    // ==========================================
    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Full-Stack Developer',
        'UI/UX Enthusiast',
        'Creative Problem Solver',
        'Open-Source Contributor'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 45;
    const PAUSE_AFTER_TYPED = 2000;
    const PAUSE_AFTER_DELETED = 400;

    function typePhrase() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            // Typing
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                // Done typing - pause then start deleting
                isDeleting = true;
                setTimeout(typePhrase, PAUSE_AFTER_TYPED);
                return;
            }
            setTimeout(typePhrase, TYPING_SPEED);
        } else {
            // Deleting
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                // Done deleting - move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typePhrase, PAUSE_AFTER_DELETED);
                return;
            }
            setTimeout(typePhrase, DELETING_SPEED);
        }
    }

    // Start typing animation
    setTimeout(typePhrase, 1000);

    // ==========================================
    // SCROLL REVEAL (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // PROJECTS PORTFOLIO FILTER
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.currentTarget.classList.add('active');

            const filterValue = e.currentTarget.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Animating transitions
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Trigger reflow to restart animation
                        card.offsetHeight; 
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // ==========================================
    // PROJECT DETAIL MODAL
    // ==========================================
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalGithub = document.getElementById('modal-github');
    const modalDemo = document.getElementById('modal-demo');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent modal from opening when clicking on direct overlay links
            if (e.target.closest('.project-link-icon')) return;

            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const tech = card.getAttribute('data-tech');
            const github = card.getAttribute('data-github');
            const demo = card.getAttribute('data-demo');
            const tag = card.querySelector('.project-tag')?.textContent || '';

            modalTag.textContent = tag;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalGithub.href = github;
            modalDemo.href = demo;

            // Populate tech tags
            modalTech.innerHTML = '';
            tech.split(',').forEach(t => {
                const span = document.createElement('span');
                span.textContent = t.trim();
                modalTech.appendChild(span);
            });

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // CONTACT FORM INTERACTIVE SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Check if action placeholder is set, if so, showcase custom UI success instead of posting to placeholder
            const action = contactForm.getAttribute('action');
            if (action.includes('placeholder')) {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                // Show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                
                // Simulate network latency
                setTimeout(() => {
                    // Success state
                    submitButton.style.background = 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)';
                    submitButton.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                    
                    // Reset Form
                    contactForm.reset();
                    
                    // Reset Button after timeout
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                        submitButton.textContent = originalText;
                    }, 3000);
                }, 1500);
            }
        });
    }

    // ==========================================
    // SCROLL TO ABOUT ON CLICKING MOUSE INDICATOR
    // ==========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

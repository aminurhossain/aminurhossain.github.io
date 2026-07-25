document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        const setNavOpen = (isOpen) => {
            navToggle.classList.toggle('open', isOpen);
            navMenu.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

            if (isOpen) {
                window.requestAnimationFrame(() => navLinks[0]?.focus());
            }
        };

        navToggle.addEventListener('click', () => {
            setNavOpen(!navMenu.classList.contains('open'));
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setNavOpen(false);
                if (window.matchMedia('(max-width: 1024px)').matches) {
                    navToggle.focus();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (navMenu.classList.contains('open') &&
                !navMenu.contains(event.target) &&
                !navToggle.contains(event.target)) {
                setNavOpen(false);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('open')) {
                setNavOpen(false);
                navToggle.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && navMenu.classList.contains('open')) {
                setNavOpen(false);
            }
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
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        link.removeAttribute('aria-current');
                    });
                    navLink.classList.add('active');
                    navLink.setAttribute('aria-current', 'page');
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
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('portfolio-theme');
    } catch (error) {
        console.warn('Theme preference storage is unavailable.', error);
    }

    const updateThemeControl = () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        themeToggle.setAttribute('aria-pressed', String(isLight));
    };

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }
    updateThemeControl();

    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        if (current === 'light') {
            root.removeAttribute('data-theme');
            try {
                localStorage.setItem('portfolio-theme', 'dark');
            } catch (error) {
                console.warn('Theme preference could not be saved.', error);
            }
        } else {
            root.setAttribute('data-theme', 'light');
            try {
                localStorage.setItem('portfolio-theme', 'light');
            } catch (error) {
                console.warn('Theme preference could not be saved.', error);
            }
        }
        updateThemeControl();
    });

    // ==========================================
    // TYPING ANIMATION
    // ==========================================
    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Deep Learning Researcher',
        'Computer Vision Scientist',
        'Remote Sensing Expert',
        'Quantum ML Researcher'
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

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typedElement.textContent = phrases[0];
    } else {
        setTimeout(typePhrase, 1000);
    }

    // ==========================================
    // SCROLL REVEAL (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
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
    } else {
        revealElements.forEach(el => el.classList.add('revealed'));
    }

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
    const modalFocusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let lastFocusedElement = null;

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    const openProjectModal = (card, trigger) => {
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

        modalTech.innerHTML = '';
        tech.split(',').forEach(t => {
            const span = document.createElement('span');
            span.textContent = t.trim();
            modalTech.appendChild(span);
        });

        lastFocusedElement = trigger;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        window.requestAnimationFrame(() => modalClose.focus());
    };

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const detailsButton = e.target.closest('.project-details-btn');
            if (e.target.closest('.project-link-icon') && !detailsButton) return;

            openProjectModal(card, detailsButton || document.activeElement);
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keep keyboard focus inside the open modal.
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;

        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        if (e.key === 'Tab') {
            const focusableElements = [...modal.querySelectorAll(modalFocusableSelector)];
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

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

    // ==========================================
    // BIBTEX COPY TO CLIPBOARD
    // ==========================================
    const bibtexButtons = document.querySelectorAll('.bibtex-btn');
    const copyStatus = document.getElementById('copy-status');

    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        const previouslyFocused = document.activeElement;
        document.body.appendChild(textArea);
        textArea.select();

        const copied = document.execCommand('copy');
        textArea.remove();
        previouslyFocused?.focus();

        if (!copied) {
            throw new Error('The browser rejected the copy command.');
        }
    };

    bibtexButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const bibtexText = btn.getAttribute('data-bibtex');
            const originalHTML = btn.innerHTML;
            btn.disabled = true;
            copyStatus.textContent = '';

            try {
                await copyText(bibtexText);
                btn.classList.add('copy-success');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                copyStatus.textContent = 'BibTeX citation copied to the clipboard.';
            } catch (err) {
                console.error('Could not copy BibTeX: ', err);
                btn.classList.add('copy-error');
                btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Copy failed';
                copyStatus.textContent = 'The citation could not be copied. Please try again.';
            }

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copy-success', 'copy-error');
                btn.disabled = false;
            }, 2000);
        });
    });

    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const contactSubmit = document.getElementById('contact-submit');
    const contactFormStatus = document.getElementById('contact-form-status');

    if (contactForm && contactSubmit && contactFormStatus) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            contactSubmit.disabled = true;
            contactSubmit.textContent = 'Sending...';
            contactFormStatus.textContent = '';
            contactFormStatus.removeAttribute('data-state');

            const ajaxEndpoint = contactForm.action.replace(
                'https://formsubmit.co/',
                'https://formsubmit.co/ajax/'
            );

            try {
                const response = await fetch(ajaxEndpoint, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    },
                    body: new FormData(contactForm)
                });
                const result = await response.json();

                if (!response.ok || result.success === false) {
                    throw new Error(result.message || 'The message could not be sent.');
                }

                contactForm.reset();
                contactFormStatus.dataset.state = 'success';
                contactFormStatus.textContent = 'Your message was sent successfully.';
            } catch (error) {
                console.error('Contact form submission failed:', error);
                contactFormStatus.dataset.state = 'error';
                contactFormStatus.textContent = 'Unable to send your message. Please email me directly instead.';
            } finally {
                contactSubmit.disabled = false;
                contactSubmit.textContent = 'Send Message';
            }
        });
    }
});

        // Theme toggle functionality with localStorage
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');

        // Set initial theme based on localStorage or system preference
        if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.checked = false;
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }

        // Toggle theme on button click
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
                
        // Change navigation style on scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
                
        // Highlight active section in navbar
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
                
        window.addEventListener('scroll', function() {
            let current = '';
                        
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
                        
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
                
        // Animation on scroll
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-card');
                        
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Initialize elements with opacity 0 for animation
        document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
                
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Form validation
        document.getElementById('contact-form').addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);
            const statusElement = document.getElementById('form-status');

            try {
                const response = await fetch("https://formspree.io/f/xldnqodb", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusElement.textContent = "Thank you! Your message has been sent.";
                    statusElement.style.color = "#0f0";
                    form.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        statusElement.textContent = data.errors.map(e => e.message).join(", ");
                    } else {
                        statusElement.textContent = "Oops! Something went wrong.";
                    }
                    statusElement.style.color = "#f00";
                }
            } catch (error) {
                statusElement.textContent = "Error submitting the form.";
                statusElement.style.color = "#f00";
            }
        });

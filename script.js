document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
   
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('header-scrolled');
            backToTop.classList.remove('active');
        }
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger icon to X when menu is open
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset hamburger icon
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Smooth scrolling for all hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle brochure download buttons
    const brochureButtons = document.querySelectorAll('#download-brochure, #mobile-brochure');
    brochureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real site, you would link to an actual PDF file
            // For this demo, just show an alert
            alert('Thank you for your interest! The brochure would download here in a real implementation.');
            
            // Optional: Open a form to collect user information before download
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-select the brochure option in the dropdown
                const interestSelect = document.getElementById('interest');
                if (interestSelect) {
                    // Add an option for brochure if it doesn't exist
                    let brochureOption = Array.from(interestSelect.options).find(option => option.value === 'brochure');
                    
                    if (!brochureOption) {
                        brochureOption = new Option('Download Brochure', 'brochure');
                        interestSelect.add(brochureOption);
                    }
                    
                    interestSelect.value = 'brochure';
                }
            }
        });
    });
    
    // Form submission handling
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // In a real implementation, you would send this data to a server
            console.log('Form data:', formDataObj);
            
            // Show success message
            this.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle" style="font-size: 48px; color: var(--accent); margin-bottom: 20px;"></i>
                    <h3>Thank you for your inquiry!</h3>
                    <p>We've received your information and will contact you shortly.</p>
                    <button type="button" class="btn btn-accent" id="reset-form" style="margin-top: 20px;">Submit Another Inquiry</button>
                </div>
            `;
            
            // Add event listener to the reset button
            document.getElementById('reset-form').addEventListener('click', function() {
                location.reload();
            });
        });
    }
    
    // Current year for copyright
    const yearElement = document.querySelector('.footer-bottom span.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Optional: Image lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }

     // Initialize tab functionality
     initFloorPlanTabs();
    
     // Initialize table row click events
     initTableRowClicks();
     
     // Initialize floor plan download buttons
     initFloorPlanDownloads();

     function initFloorPlanTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const planDetails = document.querySelectorAll('.plan-details');
        
        if (tabButtons.length === 0) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                planDetails.forEach(plan => plan.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const planType = this.getAttribute('data-plan');
                document.getElementById(`${planType}-plan`).classList.add('active');
                
                // Scroll to top of content on mobile
                if (window.innerWidth < 992) {
                    const planContainer = document.querySelector('.floor-plan-container');
                    planContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initTableRowClicks() {
        const tableRows = document.querySelectorAll('.table-row');
        
        tableRows.forEach(row => {
            row.addEventListener('click', function() {
                const planType = this.getAttribute('data-plan');
                
                // Find the corresponding tab button and trigger click
                const targetButton = document.querySelector(`.tab-btn[data-plan="${planType}"]`);
                if (targetButton) {
                    targetButton.click();
                    
                    // Scroll to the floor plan section
                    const floorPlanSection = document.getElementById('floor-plans');
                    if (floorPlanSection) {
                        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                        const scrollTarget = floorPlanSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: scrollTarget,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    function initFloorPlanDownloads() {
        const downloadButtons = document.querySelectorAll('.download-floor-plan');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const planType = this.getAttribute('data-plan');
                
                // In a real implementation, you'd link to actual floor plan PDFs
                // For demo purposes, we'll show an alert
                alert(`Thank you for your interest in the ${planType.charAt(0).toUpperCase() + planType.slice(1)} Office floor plan! In a real implementation, the floor plan would download now.`);
                
                // Optional: Track floor plan downloads
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({
                        'event': 'floor_plan_download',
                        'floor_plan_type': planType
                    });
                }
            });
        });
    }

    // Hero Section

    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
      heroVideo.addEventListener('ended', () => {
        heroVideo.pause();
      });
    }

        // Gallery Slider
        const slides = document.querySelectorAll('.gallery-slide');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const prevSlide = document.getElementById('prev-slide');
        const nextSlide = document.getElementById('next-slide');
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Function to show a specific slide
        function showSlide(n) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Show the current slide
            slides[n].classList.add('active');
            thumbnails[n].classList.add('active');
            currentSlide = n;
        }
        
        // Event for previous slide button
        prevSlide.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slideCount - 1;
            }
            showSlide(currentSlide);
        });
        
        // Event for next slide button
        nextSlide.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= slideCount) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
        
        // Add click event to thumbnails
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
            });
        });
        
        // Automatic slideshow
        function autoSlide() {
            currentSlide++;
            if (currentSlide >= slideCount) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }
        
        // Change slide every 5 seconds
        let slideInterval = setInterval(autoSlide, 5000);
        
        // Pause slideshow when hovering over the gallery
        const galleryContainer = document.querySelector('.gallery-container');
        
        galleryContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        galleryContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(autoSlide, 5000);
        });
        
        // Floor Plan Tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        const planContents = document.querySelectorAll('.plan-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the plan id
                const plan = this.getAttribute('data-plan');
                
                // Hide all plan contents first
                planContents.forEach(content => {
                    content.classList.remove('active');
                    // Remove any inline styles that might be interfering
                    content.style.display = 'none';
                });
                
                // Show the selected plan content
                const selectedPlan = document.getElementById(plan);
                selectedPlan.classList.add('active');
                // Ensure the content is visible
                selectedPlan.style.display = 'flex';
                
                // Trigger animation for the newly displayed plan
                setTimeout(() => {
                    selectedPlan.style.opacity = '1';
                    selectedPlan.style.transform = 'translateY(0)';
                }, 50);
            });
        });
        
});
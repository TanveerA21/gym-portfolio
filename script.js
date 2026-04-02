// ============================================
// ADVANCED GYM - Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initCounters();
    initScrollAnimations();
    initThemeToggle();
    initFloatingShapes();
    init3DTreadmill();
    init3DCableMachine();
    init3DLegPress();
    init3DKettlebell();
    init3DBarbell();
    initGalleryLightbox();
    initFormValidation();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
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
}

// ============================================
// THEME TOGGLE (Light/Dark Mode)
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        const triggerPoint = window.innerHeight - 100;
        
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            
            if (rect.top < triggerPoint) {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
        
        animated = true;
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
}

// ============================================
// SCROLL ANIMATIONS (GSAP)
// ============================================
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Set all sections to visible by default
    gsap.set('.about, .services, .trainers, .gallery, .membership, .contact, .location', { visibility: 'visible' });
    gsap.set('.section-header', { opacity: 1, y: 0 });
    gsap.set('.about-grid > *, .services-grid > *, .trainers-grid > *, .gallery-grid > *, .pricing-grid > *, .contact-grid > *, .location-wrapper > *', { opacity: 1, y: 0 });
    
    // Hero content animation
    gsap.from('.hero-content > *', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Section fade animations - simplified to ensure visibility
    const sections = document.querySelectorAll('.about, .services, .trainers, .gallery, .membership, .contact, .location');
    
    sections.forEach(section => {
        gsap.from(section.querySelector('.section-header'), {
            opacity: 0,
            y: 30,
            duration: 0.6,
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from(section.querySelectorAll('.about-grid > *, .services-grid > *, .trainers-grid > *, .gallery-grid > *, .pricing-grid > *, .contact-grid > *, .location-wrapper > *'), {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Service cards hover effect
    gsap.utils.toArray('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Trainer cards animation
    gsap.from('.trainer-card', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.trainers-grid',
            start: 'top 80%'
        }
    });
    
    // Gallery items animation
    gsap.from('.gallery-item', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%'
        }
    });
    
    // Pricing cards animation
    gsap.from('.pricing-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%'
        }
    });
}

// ============================================
// 3D DUMBBELL (Three.js)
// ============================================
function init3DDumbbell() {
    const canvas = document.getElementById('dumbbell3d');
    if (!canvas || typeof THREE === 'undefined') {
        console.warn('Canvas or Three.js not loaded');
        return;
    }
    
    // Set canvas dimensions
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight || 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true,
        antialias: true 
    });
    
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 500;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create dumbbell geometry
    const dumbbellGroup = new THREE.Group();
    
    // Handle
    const handleGeometry = new THREE.CylinderGeometry(0.15, 0.15, 3, 32);
    const handleMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        shininess: 100,
        specular: 0xffffff
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.z = Math.PI / 2;
    dumbbellGroup.add(handle);
    
    // Left weight
    const weightGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 32);
    const weightMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        shininess: 80,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.2
    });
    
    const leftWeight = new THREE.Mesh(weightGeometry, weightMaterial.clone());
    leftWeight.position.x = -1.4;
    leftWeight.rotation.z = Math.PI / 2;
    dumbbellGroup.add(leftWeight);
    
    // Right weight
    const rightWeight = new THREE.Mesh(weightGeometry, weightMaterial.clone());
    rightWeight.position.x = 1.4;
    rightWeight.rotation.z = Math.PI / 2;
    dumbbellGroup.add(rightWeight);
    
    // Inner weights
    const innerWeightGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 32);
    
    const leftInnerWeight = new THREE.Mesh(innerWeightGeometry, weightMaterial.clone());
    leftInnerWeight.position.x = -1.1;
    leftInnerWeight.rotation.z = Math.PI / 2;
    dumbbellGroup.add(leftInnerWeight);
    
    const rightInnerWeight = new THREE.Mesh(innerWeightGeometry, weightMaterial.clone());
    rightInnerWeight.position.x = 1.1;
    rightInnerWeight.rotation.z = Math.PI / 2;
    dumbbellGroup.add(rightInnerWeight);
    
    scene.add(dumbbellGroup);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x00d4ff, 1, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xff3d3d, 0.5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);
    
    camera.position.z = 6;
    camera.position.y = 1;
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate dumbbell
        dumbbellGroup.rotation.x += 0.01;
        dumbbellGroup.rotation.y += 0.015;
        
        // Subtle mouse interaction
        dumbbellGroup.rotation.x += mouseY * 0.002;
        dumbbellGroup.rotation.y += mouseX * 0.002;
        
        // Floating animation
        dumbbellGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        const newWidth = canvas.clientWidth || 600;
        const newHeight = canvas.clientHeight || 500;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// ============================================
// FLOATING 3D SHAPES BACKGROUND
// ============================================
function initFloatingShapes() {
    if (typeof THREE === 'undefined') return;
    
    // Create floating shapes for different sections
    const shapes = [
        { color: 0x00d4ff, position: { x: -50, y: 200, z: -100 }, scale: 0.8 },
        { color: 0xff3d3d, position: { x: 100, y: 400, z: -150 }, scale: 0.6 },
        { color: 0xff6b35, position: { x: -80, y: 600, z: -100 }, scale: 0.5 },
        { color: 0x00d4ff, position: { x: 80, y: 800, z: -120 }, scale: 0.7 },
    ];
    
    shapes.forEach((shape, index) => {
        const canvas = document.createElement('canvas');
        canvas.className = 'floating-shape';
        canvas.style.cssText = `
            position: absolute;
            width: ${60 * shape.scale}px;
            height: ${60 * shape.scale}px;
            left: calc(50% + ${shape.position.x}px);
            top: ${shape.position.y}px;
            z-index: 0;
            pointer-events: none;
            opacity: 0.3;
        `;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        renderer.setSize(60 * shape.scale, 60 * shape.scale);
        
        const geometry = new THREE.IcosahedronGeometry(0.5 * shape.scale, 0);
        const material = new THREE.MeshPhongMaterial({
            color: shape.color,
            emissive: shape.color,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.6,
            flatShading: true
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        const light = new THREE.PointLight(shape.color, 0.5, 5);
        light.position.set(0, 0, 2);
        scene.add(light);
        
        camera.position.z = 2;
        
        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.015;
            renderer.render(scene, camera);
        };
        
        animate();
        
        document.querySelector('.hero').appendChild(canvas);
    });
}

// ============================================
// 3D TREADMILL IN ABOUT SECTION
// ============================================
function init3DTreadmill() {
    if (typeof THREE === 'undefined') return;
    
    const container = document.createElement('div');
    container.className = 'treadmill-3d';
    container.style.cssText = `
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 250px;
        height: 200px;
        z-index: 1;
    `;
    
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutSection.style.position = 'relative';
        const content = aboutSection.querySelector('.about-grid');
        if (content) {
            content.appendChild(container);
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, 1.25, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            
            renderer.setSize(250, 200);
            
            const treadmillGroup = new THREE.Group();
            
            // Base platform
            const baseGeom = new THREE.BoxGeometry(2, 0.2, 0.8);
            const baseMat = new THREE.MeshPhongMaterial({
                color: 0x1a1a1a,
                shininess: 30
            });
            const base = new THREE.Mesh(baseGeom, baseMat);
            base.position.y = -0.5;
            treadmillGroup.add(base);
            
            // Running belt
            const beltGeom = new THREE.BoxGeometry(1.8, 0.05, 0.6);
            const beltMat = new THREE.MeshPhongMaterial({
                color: 0x222222
            });
            const belt = new THREE.Mesh(beltGeom, beltMat);
            belt.position.y = -0.35;
            treadmillGroup.add(belt);
            
            // Display console
            const consoleGeom = new THREE.BoxGeometry(0.6, 0.5, 0.1);
            const consoleMat = new THREE.MeshPhongMaterial({
                color: 0x00d4ff,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.3
            });
            const consoleMesh = new THREE.Mesh(consoleGeom, consoleMat);
            consoleMesh.position.set(0, 0.1, -0.35);
            treadmillGroup.add(consoleMesh);
            
            // Support arms
            const armGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8);
            const armMat = new THREE.MeshPhongMaterial({
                color: 0x888888,
                shininess: 80
            });
            
            const leftArm = new THREE.Mesh(armGeom, armMat);
            leftArm.position.set(-0.5, 0.2, -0.3);
            treadmillGroup.add(leftArm);
            
            const rightArm = new THREE.Mesh(armGeom, armMat);
            rightArm.position.set(0.5, 0.2, -0.3);
            treadmillGroup.add(rightArm);
            
            // Side rails
            const railGeom = new THREE.BoxGeometry(0.05, 0.1, 0.7);
            const railMat = new THREE.MeshPhongMaterial({
                color: 0x666666
            });
            
            const leftRail = new THREE.Mesh(railGeom, railMat);
            leftRail.position.set(-0.9, -0.2, 0);
            treadmillGroup.add(leftRail);
            
            const rightRail = new THREE.Mesh(railGeom, railMat);
            rightRail.position.set(0.9, -0.2, 0);
            treadmillGroup.add(rightRail);
            
            scene.add(treadmillGroup);
            
            const ambient = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambient);
            
            const light = new THREE.DirectionalLight(0xffffff, 0.8);
            light.position.set(2, 3, 2);
            scene.add(light);
            
            const pointLight = new THREE.PointLight(0x00d4ff, 0.4, 5);
            pointLight.position.set(0, 1, 1);
            scene.add(pointLight);
            
            camera.position.set(1.5, 1, 3);
            camera.lookAt(0, 0, 0);
            
            const animate = () => {
                requestAnimationFrame(animate);
                treadmillGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
                treadmillGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.05;
                renderer.render(scene, camera);
            };
            
            animate();
        }
    }
}

// ============================================
// 3D CABLE MACHINE IN TRAINERS SECTION
// ============================================
function init3DCableMachine() {
    if (typeof THREE === 'undefined') return;
    
    const container = document.createElement('div');
    container.className = 'cable-machine-3d';
    container.style.cssText = `
        position: absolute;
        right: 2%;
        top: 30%;
        width: 180px;
        height: 250px;
        z-index: 1;
    `;
    
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const trainersSection = document.querySelector('.trainers');
    if (trainersSection) {
        trainersSection.style.position = 'relative';
        const container = trainersSection.querySelector('.container');
        if (container) {
            container.appendChild(container);
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, 0.72, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            
            renderer.setSize(180, 250);
            
            const machineGroup = new THREE.Group();
            
            // Main frame vertical
            const frameGeom = new THREE.BoxGeometry(0.1, 2.5, 0.1);
            const frameMat = new THREE.MeshPhongMaterial({
                color: 0x444444,
                shininess: 50
            });
            
            const leftFrame = new THREE.Mesh(frameGeom, frameMat);
            leftFrame.position.set(-0.3, 0, 0);
            machineGroup.add(leftFrame);
            
            const rightFrame = new THREE.Mesh(frameGeom, frameMat);
            rightFrame.position.set(0.3, 0, 0);
            machineGroup.add(rightFrame);
            
            // Top frame
            const topGeom = new THREE.BoxGeometry(0.7, 0.1, 0.1);
            const topFrame = new THREE.Mesh(topGeom, frameMat);
            topFrame.position.set(0, 1.2, 0);
            machineGroup.add(topFrame);
            
            // Cable pulleys
            const pulleyGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
            const pulleyMat = new THREE.MeshPhongMaterial({
                color: 0x222222
            });
            
            const positions = [
                { x: -0.3, y: 1.1, z: 0 },
                { x: 0.3, y: 1.1, z: 0 },
                { x: -0.3, y: 0.5, z: 0 },
                { x: 0.3, y: 0.5, z: 0 },
                { x: -0.3, y: -0.3, z: 0 },
                { x: 0.3, y: -0.3, z: 0 },
            ];
            
            positions.forEach(pos => {
                const pulley = new THREE.Mesh(pulleyGeom, pulleyMat);
                pulley.position.set(pos.x, pos.y, pos.z);
                pulley.rotation.x = Math.PI / 2;
                machineGroup.add(pulley);
            });
            
            // Cable lines (simplified)
            const cableGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.6, 8);
            const cableMat = new THREE.MeshBasicMaterial({
                color: 0xcccccc
            });
            
            const cable1 = new THREE.Mesh(cableGeom, cableMat);
            cable1.position.set(0, 0.8, 0);
            machineGroup.add(cable1);
            
            // Weight stacks
            const weightGeom = new THREE.BoxGeometry(0.15, 0.3, 0.1);
            const weightMat = new THREE.MeshPhongMaterial({
                color: 0x00d4ff,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.2
            });
            
            const weight1 = new THREE.Mesh(weightGeom, weightMat);
            weight1.position.set(-0.3, -0.2, 0.1);
            machineGroup.add(weight1);
            
            const weight2 = new THREE.Mesh(weightGeom, weightMat.clone());
            weight2.position.set(0.3, -0.2, 0.1);
            machineGroup.add(weight2);
            
            // Handle attachments
            const handleGeom = new THREE.SphereGeometry(0.05, 8, 8);
            const handleMat = new THREE.MeshPhongMaterial({
                color: 0xff3d3d,
                emissive: 0xff3d3d,
                emissiveIntensity: 0.3
            });
            
            const handle1 = new THREE.Mesh(handleGeom, handleMat);
            handle1.position.set(-0.3, -0.6, 0.15);
            machineGroup.add(handle1);
            
            const handle2 = new THREE.Mesh(handleGeom, handleMat.clone());
            handle2.position.set(0.3, -0.6, 0.15);
            machineGroup.add(handle2);
            
            scene.add(machineGroup);
            
            const ambient = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambient);
            
            const light = new THREE.DirectionalLight(0xffffff, 0.8);
            light.position.set(2, 2, 2);
            scene.add(light);
            
            const pointLight = new THREE.PointLight(0x00d4ff, 0.3, 5);
            pointLight.position.set(0, 1, 2);
            scene.add(pointLight);
            
            camera.position.z = 3;
            camera.position.y = 0.5;
            
            const animate = () => {
                requestAnimationFrame(animate);
                machineGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.15;
                machineGroup.position.y = Math.sin(Date.now() * 0.001) * 0.05;
                renderer.render(scene, camera);
            };
            
            animate();
        }
    }
}

// ============================================
// 3D LEG PRESS IN MEMBERSHIP
// ============================================
function init3DLegPress() {
    if (typeof THREE === 'undefined') return;
    
    const container = document.createElement('div');
    container.className = 'leg-press-3d';
    container.style.cssText = `
        position: absolute;
        left: 3%;
        top: 40%;
        width: 200px;
        height: 200px;
        z-index: 1;
    `;
    
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const membershipSection = document.querySelector('.membership');
    if (membershipSection) {
        membershipSection.style.position = 'relative';
        const content = membershipSection.querySelector('.container');
        if (content) {
            const header = membershipSection.querySelector('.section-header');
            if (header && header.nextSibling) {
                content.insertBefore(container, header.nextSibling);
            } else {
                content.appendChild(container);
            }
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            
            renderer.setSize(200, 200);
            
            const legPressGroup = new THREE.Group();
            
            // Main frame base
            const baseGeom = new THREE.BoxGeometry(1.8, 0.15, 0.8);
            const baseMat = new THREE.MeshPhongMaterial({
                color: 0x1a1a1a,
                shininess: 30
            });
            const base = new THREE.Mesh(baseGeom, baseMat);
            base.position.y = -0.3;
            legPressGroup.add(base);
            
            // Inclined platform
            const platformGeom = new THREE.BoxGeometry(1.2, 0.1, 0.6);
            const platformMat = new THREE.MeshPhongMaterial({
                color: 0x333333
            });
            const platform = new THREE.Mesh(platformGeom, platformMat);
            platform.position.set(0, 0.1, 0);
            platform.rotation.x = -0.3;
            legPressGroup.add(platform);
            
            // Backrest
            const backrestGeom = new THREE.BoxGeometry(0.1, 0.5, 0.5);
            const backrestMat = new THREE.MeshPhongMaterial({
                color: 0xff3d3d,
                emissive: 0xff3d3d,
                emissiveIntensity: 0.15
            });
            const backrest = new THREE.Mesh(backrestGeom, backrestMat);
            backrest.position.set(-0.5, 0.3, 0);
            backrest.rotation.x = -0.3;
            legPressGroup.add(backrest);
            
            // Weight carriage
            const carriageGeom = new THREE.BoxGeometry(0.8, 0.3, 0.4);
            const carriageMat = new THREE.MeshPhongMaterial({
                color: 0x00d4ff,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.2
            });
            const carriage = new THREE.Mesh(carriageGeom, carriageMat);
            carriage.position.set(0.4, 0.4, 0);
            legPressGroup.add(carriage);
            
            // Weight plates on carriage
            const plateGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
            const plateMat = new THREE.MeshPhongMaterial({
                color: 0x888888,
                shininess: 80
            });
            
            for (let i = 0; i < 3; i++) {
                const plate = new THREE.Mesh(plateGeom, plateMat);
                plate.position.set(0.4 + (i * 0.08), 0.5, 0);
                plate.rotation.z = Math.PI / 2;
                legPressGroup.add(plate);
            }
            
            // Guide rails
            const railGeom = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8);
            const railMat = new THREE.MeshPhongMaterial({
                color: 0x666666
            });
            
            const leftRail = new THREE.Mesh(railGeom, railMat);
            leftRail.position.set(-0.3, 0.3, 0.25);
            legPressGroup.add(leftRail);
            
            const rightRail = new THREE.Mesh(railGeom, railMat);
            rightRail.position.set(-0.3, 0.3, -0.25);
            legPressGroup.add(rightRail);
            
            scene.add(legPressGroup);
            
            const ambient = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambient);
            
            const light = new THREE.DirectionalLight(0xffffff, 0.8);
            light.position.set(2, 2, 2);
            scene.add(light);
            
            const pointLight = new THREE.PointLight(0xff3d3d, 0.3, 5);
            pointLight.position.set(-1, 1, 2);
            scene.add(pointLight);
            
            camera.position.set(1.5, 1, 2.5);
            camera.lookAt(0, 0.2, 0);
            
            const animate = () => {
                requestAnimationFrame(animate);
                legPressGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
                legPressGroup.position.y = Math.sin(Date.now() * 0.0012) * 0.05;
                renderer.render(scene, camera);
            };
            
            animate();
        }
    }
}

// ============================================
// 3D KETTLEBELL IN SERVICES
// ============================================
function init3DKettlebell() {
    if (typeof THREE === 'undefined') return;
    
    const container = document.createElement('div');
    container.className = 'kettlebell-3d';
    container.style.cssText = `
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
        width: 200px;
        height: 200px;
        z-index: 1;
    `;
    
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        servicesSection.style.position = 'relative';
        servicesSection.appendChild(container);
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        renderer.setSize(200, 200);
        
        const kettlebellGroup = new THREE.Group();
        
        // Kettlebell body
        const bodyGeom = new THREE.SphereGeometry(0.6, 32, 32);
        const bodyMat = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            shininess: 30
        });
        const body = new THREE.Mesh(bodyGeom, bodyMat);
        kettlebellGroup.add(body);
        
        // Handle
        const handleGeom = new THREE.TorusGeometry(0.35, 0.08, 16, 32, Math.PI);
        const handleMat = new THREE.MeshPhongMaterial({
            color: 0xff3d3d,
            emissive: 0xff3d3d,
            emissiveIntensity: 0.2
        });
        const handle = new THREE.Mesh(handleGeom, handleMat);
        handle.position.y = 0.5;
        kettlebellGroup.add(handle);
        
        // Glow ring
        const ringGeom = new THREE.TorusGeometry(0.65, 0.02, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xff3d3d,
            transparent: true,
            opacity: 0.5
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.position.z = 0.3;
        kettlebellGroup.add(ring);
        
        scene.add(kettlebellGroup);
        
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);
        
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(2, 2, 2);
        scene.add(light);
        
        const pointLight = new THREE.PointLight(0xff3d3d, 0.5, 5);
        pointLight.position.set(-1, 1, 2);
        scene.add(pointLight);
        
        camera.position.z = 2.5;
        
        const animate = () => {
            requestAnimationFrame(animate);
            kettlebellGroup.rotation.y += 0.02;
            kettlebellGroup.position.y = Math.sin(Date.now() * 0.002) * 0.1;
            renderer.render(scene, camera);
        };
        
        animate();
    }
}

// ============================================
// 3D BARBELL IN MEMBERSHIP
// ============================================
function init3DBarbell() {
    if (typeof THREE === 'undefined') return;
    
    const container = document.createElement('div');
    container.className = 'barbell-3d';
    container.style.cssText = `
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
        width: 180px;
        height: 180px;
        z-index: 1;
    `;
    
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const membershipSection = document.querySelector('.membership');
    if (membershipSection) {
        membershipSection.style.position = 'relative';
        membershipSection.appendChild(container);
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        renderer.setSize(180, 180);
        
        const barbellGroup = new THREE.Group();
        
        // Bar
        const barGeom = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 16);
        const barMat = new THREE.MeshPhongMaterial({
            color: 0x888888,
            shininess: 100
        });
        const bar = new THREE.Mesh(barGeom, barMat);
        bar.rotation.z = Math.PI / 2;
        barbellGroup.add(bar);
        
        // Plates
        const plateGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
        const plateMat = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            emissive: 0x00d4ff,
            emissiveIntensity: 0.15
        });
        
        const positions = [-1, -0.8, 0.8, 1];
        positions.forEach(pos => {
            const plate = new THREE.Mesh(plateGeom, plateMat.clone());
            plate.rotation.z = Math.PI / 2;
            plate.position.x = pos;
            barbellGroup.add(plate);
        });
        
        scene.add(barbellGroup);
        
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);
        
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(2, 2, 2);
        scene.add(light);
        
        const pointLight = new THREE.PointLight(0x00d4ff, 0.5, 5);
        pointLight.position.set(1, 1, 2);
        scene.add(pointLight);
        
        camera.position.z = 2.5;
        
        const animate = () => {
            requestAnimationFrame(animate);
            barbellGroup.rotation.x += 0.01;
            barbellGroup.rotation.z += 0.005;
            barbellGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.1;
            renderer.render(scene, camera);
        };
        
        animate();
    }
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let lightbox = null;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            createLightbox(imgSrc);
        });
    });
    
    function createLightbox(src) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <img src="${src}" alt="Gallery Image">
            <button class="lightbox-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close handlers
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.9);
            }
            .lightbox img {
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                z-index: 1;
                animation: scaleIn 0.3s ease;
            }
            .lightbox-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: var(--bg-card);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1;
                transition: all 0.3s ease;
            }
            .lightbox-close:hover {
                background: var(--accent);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.remove();
            lightbox = null;
            document.body.style.overflow = '';
        }
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox) {
            closeLightbox();
        }
    });
}

// ============================================
// FORM VALIDATION (Static UI)
// ============================================
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('input[name="name"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const interest = form.querySelector('select[name="interest"]').value;
        
        // Basic validation
        if (!name || !phone) {
            alert('Please fill in your name and phone number.');
            return;
        }
        
        // Format WhatsApp message
        const message = `Hello ADVANCED GYM!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0AInterest: ${encodeURIComponent(interest)}`;
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        form.reset();
        
        // Show success message
        alert('Thank you for contacting us! We will get back to you soon.');
    });
}

// ============================================
// PARTICLES BACKGROUND
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s infinite ${delay}s ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles
createParticles();
// Three.js background animation for hero section
let scene, camera, renderer;
let geometry, material, mesh;
let animationFrame;

// Initialize Three.js scene
function initThreeBackground() {
    // Get container
    const container = document.getElementById('three-background');
    
    // Check if container exists
    if (!container) return;
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        return;
    }
    
    // Clear previous instance
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    // Clear container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Append renderer to container
    container.appendChild(renderer.domElement);
    
    // Create gradient background - using a large plane with shader material
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    
    const fragmentShader = `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec2 vUv;
        
        void main() {
            vec2 uv = vUv;
            vec3 color = mix(colorA, colorB, uv.y + sin(uv.x * 10.0 + time * 0.5) * 0.1);
            gl_FragColor = vec4(color, 1.0);
        }
    `;
    
    // Create shader material
    const uniforms = {
        time: { value: 0 },
        colorA: { value: new THREE.Color(0x111111) }, // Primary color
        colorB: { value: new THREE.Color(0xff4b4b) }  // Accent color
    };
    
    // Update colors based on theme
    updateThreeColors(uniforms);
    
    // Create shader material
    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    
    // Create plane geometry that fills the view
    geometry = new THREE.PlaneGeometry(10, 10);
    
    // Create mesh
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Create floating particles
    createParticles();
    
    // Animation loop
    function animate() {
        animationFrame = requestAnimationFrame(animate);
        
        // Update uniforms
        material.uniforms.time.value += 0.01;
        
        // Update particles
        scene.children.forEach(child => {
            if (child.userData.isParticle) {
                // Float up and down
                child.position.y += Math.sin(Date.now() * 0.001 + child.userData.randomOffset) * 0.002;
                
                // Rotate
                child.rotation.x += 0.005;
                child.rotation.y += 0.005;
            }
        });
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation
    animate();
}

// Create floating particles
function createParticles() {
    // Particles count
    const count = 30;
    
    // Create particles
    for (let i = 0; i < count; i++) {
        // Create geometry - use different shapes for variety
        let particleGeometry;
        const shapeType = Math.floor(Math.random() * 3);
        
        switch (shapeType) {
            case 0:
                particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
                break;
            case 1:
                particleGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
                break;
            case 2:
                particleGeometry = new THREE.TetrahedronGeometry(0.08);
                break;
        }
        
        // Create material with random opacity
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: document.documentElement.classList.contains('dark') ? 0xffffff : 0x111111,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.2
        });
        
        // Create mesh
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Set random position
        particle.position.x = (Math.random() - 0.5) * 8;
        particle.position.y = (Math.random() - 0.5) * 8;
        particle.position.z = Math.random() * 2;
        
        // Set random rotation
        particle.rotation.x = Math.random() * Math.PI;
        particle.rotation.y = Math.random() * Math.PI;
        
        // Set user data for animation
        particle.userData = {
            isParticle: true,
            randomOffset: Math.random() * Math.PI * 2
        };
        
        // Add to scene
        scene.add(particle);
    }
}

// Update colors based on theme
function updateThreeColors() {
    if (!material || !material.uniforms) return;
    
    if (document.documentElement.classList.contains('dark')) {
        material.uniforms.colorA.value = new THREE.Color(0x1a1a1a); // Darker primary
        material.uniforms.colorB.value = new THREE.Color(0xd13939); // Darker accent
        
        // Update particle colors
        scene.children.forEach(child => {
            if (child.userData.isParticle && child.material) {
                child.material.color.set(0xffffff);
            }
        });
    } else {
        material.uniforms.colorA.value = new THREE.Color(0xffffff); // Light color
        material.uniforms.colorB.value = new THREE.Color(0xff4b4b); // Accent
        
        // Update particle colors
        scene.children.forEach(child => {
            if (child.userData.isParticle && child.material) {
                child.material.color.set(0x111111);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initThreeBackground);
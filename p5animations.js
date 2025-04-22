// p5.js animations for interactive elements
let particles = [];
let mouseTrail = [];
const maxTrailLength = 20;
let colorScheme = {
    background: [255, 255, 255, 25],
    particles: [17, 17, 17],
    trail: [255, 75, 75]
};

// p5.js sketch
function setup() {
    // Create canvas for the hero section
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-canvas');
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Initialize mouse trail
    for (let i = 0; i < maxTrailLength; i++) {
        mouseTrail.push(createVector(0, 0));
    }
    
    // Check if dark mode is active
    updateColorScheme();
}

function draw() {
    // Clear background with semi-transparency for trailing effect
    background(colorScheme.background);
    
    // Draw particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
        particles[i].connectToNearest(particles, 150);
    }
    
    // Update mouse trail
    updateMouseTrail();
    
    // Draw the trail
    drawMouseTrail();
}

function updateMouseTrail() {
    // Add current mouse position to the beginning of the trail
    mouseTrail.unshift(createVector(mouseX, mouseY));
    
    // Remove the last position if trail is too long
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.pop();
    }
}

function drawMouseTrail() {
    noFill();
    stroke(colorScheme.trail[0], colorScheme.trail[1], colorScheme.trail[2], 150);
    strokeWeight(2);
    
    beginShape();
    for (let i = 0; i < mouseTrail.length; i++) {
        // Calculate alpha based on position in trail
        const alpha = map(i, 0, mouseTrail.length, 255, 0);
        stroke(colorScheme.trail[0], colorScheme.trail[1], colorScheme.trail[2], alpha);
        
        // Add vertex with slight curve
        curveVertex(mouseTrail[i].x, mouseTrail[i].y);
    }
    endShape();
    
    // Draw circles at each point of the trail
    for (let i = 0; i < mouseTrail.length; i++) {
        const size = map(i, 0, mouseTrail.length, 10, 2);
        const alpha = map(i, 0, mouseTrail.length, 200, 0);
        
        noStroke();
        fill(colorScheme.trail[0], colorScheme.trail[1], colorScheme.trail[2], alpha);
        ellipse(mouseTrail[i].x, mouseTrail[i].y, size, size);
    }
}

// Particle class
class Particle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        this.size = random(3, 6);
        this.alpha = random(100, 200);
    }
    
    update() {
        // Update position
        this.position.add(this.velocity);
        
        // Bounce off edges
        if (this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -1;
        }
        if (this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -1;
        }
        
        // Mouse interaction: particles are attracted to mouse
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.position);
        let distance = dir.mag();
        
        if (distance < 200) {
            dir.normalize();
            dir.mult(0.3);
            this.velocity.add(dir);
            this.velocity.limit(2); // Limit max speed
        }
    }
    
    display() {
        noStroke();
        fill(colorScheme.particles[0], colorScheme.particles[1], colorScheme.particles[2], this.alpha);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
    
    connectToNearest(particles, maxDistance) {
        for (let other of particles) {
            if (other !== this) {
                let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
                
                if (distance < maxDistance) {
                    // Calculate stroke opacity based on distance
                    let alpha = map(distance, 0, maxDistance, 100, 0);
                    stroke(colorScheme.particles[0], colorScheme.particles[1], colorScheme.particles[2], alpha);
                    strokeWeight(0.5);
                    line(this.position.x, this.position.y, other.position.x, other.position.y);
                }
            }
        }
    }
}

// Update colors when window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Update color scheme based on theme
function updateColorScheme() {
    const htmlElement = document.documentElement;
    
    if (htmlElement.classList.contains('dark')) {
        colorScheme = {
            background: [17, 17, 17, 25],
            particles: [255, 255, 255],
            trail: [255, 75, 75]
        };
    } else {
        colorScheme = {
            background: [255, 255, 255, 25],
            particles: [17, 17, 17],
            trail: [255, 75, 75]
        };
    }
}
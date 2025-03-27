import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const QuantumBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Quantum-inspired particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 10;

    // Cursor tracking
    const cursor = document.getElementById('cursor-follower');
    
    const handleMouseMove = (event) => {
      gsap.to(cursor, {
        x: event.clientX - 10,
        y: event.clientY - 10,
        duration: 0.1
      });

      // Subtle particle movement based on mouse
      particlesMesh.rotation.y = event.clientX * 0.0001;
      particlesMesh.rotation.x = event.clientY * 0.0001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Subtle quantum-like particle movement
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Responsive handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="threejs-background" ref={mountRef} />;
};

const App = () => {
  return (
    <div className="app-container">
      <QuantumBackground />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title glitch" data-text="Alyasseri">Alyasseri</h1>
          <p className="hero-subtitle">
            Quantum Digital Architect | AI Innovator | Technological Visionary
          </p>
          
          <div className="cta-container">
            <a href="#contact" className="cta-button">
              Get in Touch
            </a>
            <a href="/resume.pdf" download className="cta-button">
              Download CV
            </a>
          </div>

          <div className="social-links">
            <a 
              href="https://github.com/alyasseri" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="https://linkedin.com/in/alyasseri" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a 
              href="https://twitter.com/alyasseri" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

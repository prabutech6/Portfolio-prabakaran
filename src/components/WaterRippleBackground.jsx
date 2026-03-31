import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export function WaterRippleBackground({ backgroundImage }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Vertex Shader
    const vertexShader = `
      uniform vec2 uMouse;
      uniform float uRadius;
      uniform float uStrength;
      uniform float uTime;
      
      varying vec2 vUv;
      
      float noise(vec2 p) {
        return sin(p.x * 10.0) * sin(p.y * 10.0) * 0.5 + 0.5;
      }
      
      void main() {
        vUv = uv;
        
        vec3 pos = position;
        
        // Distance from mouse
        vec2 mouseDir = normalize(uMouse - uv);
        float dist = distance(uMouse, uv);
        float influence = exp(-dist * dist / (uRadius * uRadius));
        
        // Noise-based displacement
        float noiseVal = noise(uv * 3.0 + uTime * 0.3);
        
        // Combine mouse influence with organic noise
        pos.z += sin(uv.y * 10.0 + uTime * 0.5) * noiseVal * influence * uStrength;
        pos.z += sin(uv.x * 8.0 + uTime * 0.3) * influence * uStrength * 0.5;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment Shader
    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform float uRadius;
      uniform float uTime;
      
      varying vec2 vUv;
      
      float noise(vec2 p) {
        return sin(p.x * 12.0) * sin(p.y * 12.0) * 0.5 + 0.5;
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Distance from mouse
        float dist = distance(uMouse, uv);
        float influence = exp(-dist * dist / (uRadius * uRadius));
        
        // Distort UV based on mouse position and noise
        vec2 distortion = normalize(uMouse - uv) * influence * 0.02;
        distortion += vec2(noise(uv * 5.0 + uTime * 0.5) - 0.5) * influence * 0.015;
        
        uv += distortion;
        
        // Sample texture
        vec4 texColor = texture2D(uTexture, uv);
        
        // Add subtle color shift on distortion
        texColor.rgb += mix(vec3(0.1, 0.2, 0.3), vec3(0.0), influence * 0.3);
        
        // Film grain effect
        float grain = noise(uv * 100.0 + uTime) * 0.05;
        texColor.rgb += grain;
        
        gl_FragColor = texColor;
      }
    `;

    // Load texture from image
    const textureLoader = new THREE.TextureLoader();
    let texture;

    if (backgroundImage) {
      texture = textureLoader.load(backgroundImage);
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 1024, 1024);
      }
      texture = new THREE.CanvasTexture(canvas);
    }

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRadius: { value: 0.3 },
        uStrength: { value: 1.0 },
        uTime: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerHeight
    );

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking with GSAP smoothing
    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1 - e.clientY / window.innerHeight;

      // Smooth mouse movement with GSAP
      gsap.to(smoothMouse, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => {
          material.uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);
        },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      geometry.dispose();
      const newGeometry = new THREE.PlaneGeometry(width, height);
      mesh.geometry = newGeometry;
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      material.uniforms.uTime.value += 0.016;
      material.uniforms.uStrength.value = 1.0 + Math.sin(material.uniforms.uTime.value * 0.5) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [backgroundImage]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import mapImg from "../assets/world-map-bw.png";

const ParticleGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.4;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 1.2;
    controls.maxDistance = 4;
    controls.enablePan = false;

    let autoRotate = true;
    controls.addEventListener("start", () => {
      if (camera.position.z < 1.9) {
        autoRotate = false;
      }
    });

    const globeRadius = 1;
    const size = 1024;
    let baseImageData: Uint8ClampedArray | null = null;

    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;
    let pointCloud: THREE.Points | null = null;

    // Groupe pour contenir la Terre inclinée
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = THREE.MathUtils.degToRad(23.5); // inclinaison de l’axe terrestre
    scene.add(globeGroup);

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const regeneratePoints = (step: number) => {
      if (!baseImageData) return;

      const particles: number[] = [];
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          const index = (y * size + x) * 4;
          const brightness = baseImageData[index];
          if (brightness < 28) continue;

          const lon = 180 - (x / size) * 360;
          const lat = 90 - (y / size) * 180;
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          const r = globeRadius;

          const px = r * Math.sin(phi) * Math.cos(theta);
          const py = r * Math.cos(phi);
          const pz = r * Math.sin(phi) * Math.sin(theta);
          particles.push(px, py, pz);
        }
      }

      if (geometry) geometry.dispose();
      if (pointCloud) globeGroup.remove(pointCloud);

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(particles, 3));

      material = new THREE.PointsMaterial({
        color: 0x00aaff,
        size: 0.01,
        sizeAttenuation: true,
      });

      pointCloud = new THREE.Points(geometry, material);
      globeGroup.add(pointCloud);
    };

    const img = new Image();
    img.src = mapImg;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      baseImageData = ctx.getImageData(0, 0, size, size).data;
      regeneratePoints(4);
    };

    let lastStep = 4;

    const animate = () => {
      requestAnimationFrame(animate);

      if (autoRotate) globeGroup.rotation.y += 0.0015;

      const dist = camera.position.length();
      if (material) {
        const dynamicSize = THREE.MathUtils.clamp(0.004 * dist, 0.001, 0.03);
        material.size = dynamicSize;
      }

      const dynamicStep = Math.round(THREE.MathUtils.clamp(1 + dist * 2, 1, 6));
      if (baseImageData && dynamicStep !== lastStep) {
        lastStep = dynamicStep;
        regeneratePoints(dynamicStep);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default ParticleGlobe;

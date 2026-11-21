/**
 * Oshadhi Purwa — Management Information Systems & Data Analyst Portfolio
 * Three.js Interactive 3D Liquid Glass Pebble Cloches
 * EXACT 1:1 REPLICA of user reference image:
 *  - Organic soft-milky white translucent liquid glass pebble cloche
 *  - Specular glass gleam and internal liquid refraction
 *  - Deep soft floating ambient drop shadows underneath each pebble
 *  - Sharp official vector icons centered inside with chromatic caustic glow
 *  - Smooth cursor tilt, hover lift, organic liquid wobble & click spin
 */

const softwareIcons = [
  {
    id: "powerbi",
    name: "Power BI",
    svg: "assets/icons/powerbi.svg",
    tintColor: 0xfffbe6, // Soft warm golden milk glass
    shadowColor: "rgba(198, 146, 20, 0.28)",
    scale: 1.0
  },
  {
    id: "python",
    name: "Python",
    svg: "assets/icons/python.svg",
    tintColor: 0xebf5ff, // Soft azure milk glass
    shadowColor: "rgba(56, 126, 184, 0.28)",
    scale: 1.05
  },
  {
    id: "mysql",
    name: "MySQL",
    svg: "assets/icons/mysql.svg",
    tintColor: 0xe6f7fa, // Soft cyan milk glass
    shadowColor: "rgba(0, 127, 156, 0.28)",
    scale: 1.05
  },
  {
    id: "spring",
    name: "Spring Boot",
    svg: "assets/icons/spring.svg",
    tintColor: 0xebfaeb, // Soft mint milk glass
    shadowColor: "rgba(127, 200, 54, 0.28)",
    scale: 1.0
  },
  {
    id: "react",
    name: "React",
    svg: "assets/icons/react.svg",
    tintColor: 0xe6f9ff, // Soft electric cyan glass
    shadowColor: "rgba(97, 218, 251, 0.32)",
    scale: 1.05
  },
  {
    id: "java",
    name: "Java",
    svg: "assets/icons/java.svg",
    tintColor: 0xffebeb, // Soft rose milk glass
    shadowColor: "rgba(234, 45, 46, 0.25)",
    scale: 1.05
  },
  {
    id: "figma",
    name: "Figma",
    svg: "assets/icons/figma.svg",
    tintColor: 0xf5ebff, // Soft lavender milk glass
    shadowColor: "rgba(162, 89, 255, 0.28)",
    scale: 1.05
  },
  {
    id: "github",
    name: "GitHub",
    svg: "assets/icons/github.svg",
    tintColor: 0xf3f4f6, // Frosted ice white glass
    shadowColor: "rgba(30, 41, 59, 0.22)",
    scale: 1.05
  }
];

// Helper: Generate the smooth asymmetrical organic liquid pebble shape shown in the reference
function createPebbleShape(seed) {
  const shape = new THREE.Shape();
  const numPoints = 24;
  const points = [];
  const baseR = 1.35;

  for (let i = 0; i < numPoints; i++) {
    const theta = (i / numPoints) * Math.PI * 2;
    // Harmonic wave formula for smooth organic pebble curvature
    const rVar = 
      Math.sin(theta * 2 + seed) * 0.16 + 
      Math.cos(theta * 3 + seed * 1.5) * 0.10 + 
      Math.sin(theta * 5) * 0.04;
    
    const r = baseR * (1 + rVar);
    const x = Math.cos(theta) * r * 1.04;
    const y = Math.sin(theta) * r * 0.98;
    points.push(new THREE.Vector2(x, y));
  }

  shape.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    shape.quadraticCurveTo(p1.x, p1.y, midX, midY);
  }

  return shape;
}

// Generate high-res crisp icon texture
function createIconTexture(svgPath) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = svgPath;
  img.onload = () => {
    ctx.clearRect(0, 0, 512, 512);

    // Subtle soft radiance under the icon
    const rad = ctx.createRadialGradient(256, 256, 40, 256, 256, 200);
    rad.addColorStop(0, "rgba(255, 255, 255, 0.7)");
    rad.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
    rad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(256, 256, 200, 0, Math.PI * 2);
    ctx.fill();

    // Draw vector icon centered & ultra crisp
    const sz = 280;
    ctx.drawImage(img, (512 - sz) / 2, (512 - sz) / 2, sz, sz);

    texture.needsUpdate = true;
  };

  return texture;
}

// Initialize Three.js 3D Liquid Glass Pebble for each icon container
function initPebbleCloche(container, data, index) {
  const width = container.clientWidth || 88;
  const height = container.clientHeight || 88;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.z = 5.4;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);

  // Studio Lighting for Specular Caustic Gleams
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
  scene.add(ambientLight);

  // Top-left strong glossy gleam
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(3, 4.5, 6);
  scene.add(keyLight);

  // Rim back-reflection
  const rimLight = new THREE.DirectionalLight(0xd4e9ff, 1.8);
  rimLight.position.set(-3.5, -3, -2);
  scene.add(rimLight);

  // Internal warm caustic point light
  const internalLight = new THREE.PointLight(data.tintColor, 1.2, 12);
  internalLight.position.set(0, 0, 1.2);
  scene.add(internalLight);

  // 1. Organic Pebble Geometry
  const pebbleShape = createPebbleShape(index * 1.3);
  const extrudeSettings = {
    steps: 2,
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.42,
    bevelSize: 0.36,
    bevelOffset: 0,
    bevelSegments: 14
  };
  const pebbleGeometry = new THREE.ExtrudeGeometry(pebbleShape, extrudeSettings);
  pebbleGeometry.center();

  // 2. Liquid Glass Material (Milky Translucent Refractive Surface with High Specular Gleam)
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: data.tintColor,
    emissiveIntensity: 0.25,
    roughness: 0.08,
    metalness: 0.02,
    transmission: 0.88, // Translucent liquid glass
    opacity: 0.96,
    transparent: true,
    ior: 1.48, // Water / liquid glass optical index (maps to reflectivity in r128)
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03
  });

  const glassMesh = new THREE.Mesh(pebbleGeometry, glassMaterial);

  // 3. Floating Centered Vector Icon
  const iconTexture = createIconTexture(data.svg);
  const iconGeo = new THREE.PlaneGeometry(1.85, 1.85);
  const iconMat = new THREE.MeshBasicMaterial({
    map: iconTexture,
    transparent: true,
    opacity: 0.98,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const iconMesh = new THREE.Mesh(iconGeo, iconMat);
  iconMesh.position.z = 0.08;

  // Group
  const masterGroup = new THREE.Group();
  masterGroup.add(glassMesh);
  masterGroup.add(iconMesh);
  masterGroup.scale.set(data.scale, data.scale, data.scale);
  scene.add(masterGroup);

  // 4. Interactive Cursor Parallax & Lift Physics
  let isHovered = false;
  let targetRotX = 0;
  let targetRotY = 0;
  let targetScale = data.scale;
  let currentScale = data.scale;
  let animTime = Math.random() * 100;

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = (mouseX / rect.width) * 2 - 1;
    const normY = -(mouseY / rect.height) * 2 + 1;

    targetRotY = normX * 0.55;
    targetRotX = -normY * 0.55;
  }

  container.addEventListener("mouseenter", (e) => {
    isHovered = true;
    targetScale = data.scale * 1.15;
    onMouseMove(e);
  });

  container.addEventListener("mousemove", onMouseMove);

  container.addEventListener("mouseleave", () => {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    targetScale = data.scale;
  });

  container.addEventListener("click", () => {
    targetScale = data.scale * 1.28;
    targetRotY += Math.PI * 2;
    setTimeout(() => { targetScale = isHovered ? data.scale * 1.15 : data.scale; }, 280);
  });

  // 5. Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    animTime += 0.032;

    // Smooth rotation lerp
    masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.12;
    masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.12;

    // Smooth scale lerp
    currentScale += (targetScale - currentScale) * 0.14;
    masterGroup.scale.set(currentScale, currentScale, currentScale);

    // Subtle gentle fluid float
    if (!isHovered) {
      masterGroup.position.y = Math.sin(animTime) * 0.06;
      masterGroup.position.x = Math.cos(animTime * 0.7) * 0.02;
    } else {
      masterGroup.position.y += (0.12 - masterGroup.position.y) * 0.1;
      masterGroup.position.x += (0 - masterGroup.position.x) * 0.1;
    }

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    if (newWidth > 0 && newHeight > 0) {
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof THREE === "undefined") return;

  const containers = document.querySelectorAll(".three-tile-container");
  containers.forEach((container, idx) => {
    const techId = container.getAttribute("data-tech-id");
    const data = softwareIcons.find(i => i.id === techId);
    if (data) {
      initPebbleCloche(container, data, idx);
    }
  });
});

class Gallery {
    constructor() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, 2, 10);
  
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("gallery-container").appendChild(this.renderer.domElement);
  
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(this.ambientLight);
  
      this.pointLight = new THREE.PointLight(0xffffff, 1, 100);
      this.pointLight.position.set(0, 5, 5);
      this.scene.add(this.pointLight);
  
      this.wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
      this.gallerySize = { width: 10, height: 5, depth: 20 };
  
      this.artworks = [
        { file: "artworks/art1.jpg", position: [-3, 2, -9] },
        { file: "artworks/art2.jpg", position: [3, 2, -9] },
        { file: "artworks/art3.jpg", position: [-4, 2, 9] },
        { file: "artworks/art4.jpg", position: [4, 2, 9] }
      ];
  
      this.keys = {};
  
      this.init();
    }
  
    init() {
      this.createWalls();
      this.loadArtworks();
      this.setupEventListeners();
      this.animate();
    }
  
    createWalls() {
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(this.gallerySize.width, this.gallerySize.depth), this.wallMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0;
      this.scene.add(floor);
  
      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(this.gallerySize.width, this.gallerySize.height), this.wallMaterial);
      backWall.position.z = -this.gallerySize.depth / 2;
      backWall.position.y = this.gallerySize.height / 2;
      this.scene.add(backWall);
  
      const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(this.gallerySize.width, this.gallerySize.height), this.wallMaterial);
      frontWall.position.z = this.gallerySize.depth / 2;
      frontWall.position.y = this.gallerySize.height / 2;
      this.scene.add(frontWall);
  
      const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(this.gallerySize.depth, this.gallerySize.height), this.wallMaterial);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.x = -this.gallerySize.width / 2;
      leftWall.position.y = this.gallerySize.height / 2;
      this.scene.add(leftWall);
  
      const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(this.gallerySize.depth, this.gallerySize.height), this.wallMaterial);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.x = this.gallerySize.width / 2;
      rightWall.position.y = this.gallerySize.height / 2;
      this.scene.add(rightWall);
    }
  
    loadArtworks() {
      const loader = new THREE.TextureLoader();
  
      this.artworks.forEach(art => {
        loader.load(art.file, (texture) => {
          const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ map: texture }));
          plane.position.set(...art.position);
          this.scene.add(plane);
        });
      });
    }
  
    setupEventListeners() {
      window.addEventListener("keydown", (e) => this.keys[e.key] = true);
      window.addEventListener("keyup", (e) => this.keys[e.key] = false);
  
      window.addEventListener("resize", () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  
    handleControls() {
      const speed = 0.2;
      if (this.keys["w"]) this.camera.position.z -= speed;
      if (this.keys["s"]) this.camera.position.z += speed;
      if (this.keys["a"]) this.camera.position.x -= speed;
      if (this.keys["d"]) this.camera.position.x += speed;
    }
  
    animate() {
      this.handleControls();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(() => this.animate());
    }
  }
  
  const gallery = new Gallery();
  
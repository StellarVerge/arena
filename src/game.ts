import * as THREE from 'three'

export interface GameOptions {
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
    window: Window
    log: Console
}

export class Game implements GameOptions {
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
    window: Window
    log: Console

    cube?: THREE.Mesh

    constructor(init: GameOptions) {
        this.scene = init.scene
        this.renderer = init.renderer
        this.camera = init.camera
        this.window = init.window
        this.log = init.log
    }

    public setupWorld() {
        this.resize()
        this.camera.position.z = 5

        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial( { color: 0x00ff00 }),
        )
        this.scene.add(this.cube)
    }

    public play() {
        this.log.info("starting Stellar Verge Arena!")
        this.render(0)
    }

    private render(delta: Number ) {
        this.updateWorld(delta)
        this.renderer.render(this.scene, this.camera)

        this.window.requestAnimationFrame((delta) => this.render(delta) )
    }

    private updateWorld(delta: Number) {
        this.cube!.rotation.x -= 0.01;
        this.cube!.rotation.z += 0.01;
        this.cube!.rotation.y += 0.01;
    }

    public resize() {
        this.log.debug("resizing window to", this.window.innerWidth, this.window.innerHeight)
        this.renderer.setSize(this.window.innerWidth, this.window.innerHeight)
        this.camera.aspect = this.window.innerWidth / this.window.innerHeight
    }
}

import * as THREE from 'three'
import {Game} from './game'

window.onload = () => {
    main(window)
}

function main(w: Window) {
    const canvas = document.querySelector("#gameCanvas");
    if (canvas == null) {
        throw "canvas not found"
    }

    const game = new Game({
        window: w,
        camera: new THREE.PerspectiveCamera(75, w.innerWidth / w.innerHeight, 0.1, 1000),
        renderer: new THREE.WebGLRenderer({
            canvas: canvas!,
        }),
        scene: new THREE.Scene(),
        log: console,
    });
    w.onresize = () => game.resize


    game.setupWorld()
    game.play()
}

function resizeRenderer(r: THREE.WebGLRenderer, c: THREE.PerspectiveCamera, w: Window) {
    r.setSize(w.innerWidth, w.innerHeight)
    c.aspect = w.innerWidth / w.innerHeight
}


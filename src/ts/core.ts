import * as Babylon from 'babylonjs';

namespace ThreeDeeTinker {

    class Game {
        private canvas: HTMLCanvasElement
        private engine: Babylon.Engine
        private scene: Babylon.Scene
        private camera: Babylon.Camera
        private light: Babylon.Light

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas
            this.engine = new Babylon.Engine(canvas, true)

            this.scene = new Babylon.Scene(this.engine)

            this.camera = new Babylon.UniversalCamera('camera1', new Babylon.Vector3(0, 5, -10), this.scene)
            this.camera.attachControl(this.canvas, false)
            this.camera.inertia = 0.8

            this.light = new Babylon.HemisphericLight('light1', new Babylon.Vector3(0, 1, 0), this.scene)

            let sphere = Babylon.MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, this.scene)
            sphere.position.y = 1

            let ground = Babylon.MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, this.scene)

            let cube = Babylon.MeshBuilder.CreateBox('box1', { size: 2 }, this.scene)
            cube.position.x = 5
            cube.position.y = 1
        }
        render(): void {
            this.engine.runRenderLoop(() => {
                this.scene.render()
            })

            window.addEventListener('resize', () => {
                this.engine.resize()
            })
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        let game = new Game(<HTMLCanvasElement>document.getElementById("babylon-canvas"))
        game.render()
    })

}
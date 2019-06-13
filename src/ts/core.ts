import * as Babylon from 'babylonjs'
import * as BabylonLoaders from 'babylonjs-loaders'
import { Vector3 } from 'babylonjs'
import * as BabylonMaterials from 'babylonjs-materials'
import * as BabylonTextures from 'babylonjs-procedural-textures'


namespace PinkCloud {

    class LogoPoC {
        private canvas: HTMLCanvasElement
        private engine: Babylon.Engine
        private scene: Babylon.Scene
        private camera: Babylon.ArcRotateCamera
        private light: Babylon.Light

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas
            this.engine = new Babylon.Engine(canvas, true)

            this.scene = new Babylon.Scene(this.engine)

            this.camera = new Babylon.ArcRotateCamera('camera1', 0, 0.8, 100, Babylon.Vector3.Zero(), this.scene)
            this.camera.attachControl(this.canvas, false)
            this.camera.inertia = 0.8

            this.light = new Babylon.HemisphericLight('light1', new Babylon.Vector3(0.5, 1, 0.5), this.scene)

            let sphere = Babylon.MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, this.scene)
            sphere.position.x = -5
            sphere.position.y = 1

            let ground = Babylon.MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, this.scene)

            let cube = Babylon.MeshBuilder.CreateBox('box1', { size: 2 }, this.scene)
            cube.position.x = 5
            cube.position.y = 1

            BabylonLoaders.OBJFileLoader.INVERT_Y = false
            // BabylonLoaders.OBJFileLoader.UV_SCALING = new Babylon.Vector2(100, 100)
            // BabylonLoaders.OBJFileLoader.IMPORT_VERTEX_COLORS = true
            Babylon.SceneLoader.LoadAssetContainer('./', "pinkcloud_3d.obj", this.scene, (container) => {
                let meshes = container.meshes
                // let materials = container.materials

                for (const mesh of meshes) {
                    mesh.scaling = new Vector3(15, 15, 15)
                    mesh.translate(new Vector3(0, 1, 0), 0.05)
                    mesh.rotate(new Vector3(0, 0, 1), Math.PI)
                    // mesh.translate(new Vector3(1, 0, 0), -0.05)
                }

                container.addAllToScene()
            })
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
        let poc = new LogoPoC(<HTMLCanvasElement>document.getElementById("babylon-canvas"))
        poc.render()
    })

}
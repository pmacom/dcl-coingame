import { Dash_AnimationQueue, Dash_Ease, Dash_OnUpdateFrame, Dash_Wait } from "dcldash"
import * as utils from '@dcl/ecs-scene-utils'
import { Scoreboard } from "./scoreboard"

export class Coin extends Entity {
    private shape: GLTFShape = new GLTFShape('models/coin.glb')
    private material: Material = new Material()
    private startHeight: number 

    constructor(
        position: Vector3
    ){
        super()
        this.startHeight = position.y
  
        this.addComponent(this.shape)
        this.addComponent(this.material)
        this.addComponent(new Transform({
            position,
            scale: new Vector3(1,1,1),
            rotation: new Quaternion().setEuler(90, 0, 90)
        }))
        engine.addEntity(this)


        Dash_AnimationQueue.add({
            duration: 2,
            onFrame: (progress) => this.initialBounce(progress)
        })

        const rotateCoin = (data: any, dt: number) => {
            this.getComponent(Transform).rotate(Vector3.Forward(), (dt*20))
        }
        const rotateEntity = Dash_OnUpdateFrame.add(rotateCoin)
        rotateEntity.start()

        this.addTriggerBox()
    }

    initialBounce(progress: number) {
        const transform = this.getComponent(Transform)
        transform.position.y = Scalar.Lerp(this.startHeight, 1, Dash_Ease.easeOutBounce(progress))
    }

    scaleOut(progress: number) {
        const transform = this.getComponent(Transform)
        transform.scale = new Vector3().setAll(
            Scalar.Lerp(1, 0, Dash_Ease.easeInOutElastic(progress))
        ) 
    }

    addTriggerBox(){
        log('Created the box!')
        let boxPosition = new Vector3(0,0,0)
        let boxSize = new Vector3(2,2,2)

        let triggerBox = new utils.TriggerBoxShape(boxSize, boxPosition)


        const tc = new utils.TriggerComponent(
            triggerBox,
            {
                onCameraEnter :() => {
                    this.collect()
                },
                enableDebug: false
            } 
        )

        this.addComponent(tc)
    }

    collectAnim(progress: number) {
        const transform = this.getComponent(Transform)
        transform.scale = new Vector3().setAll(
            Scalar.Lerp(1, 0, Dash_Ease.easeOutBounce(progress))
        ) 
    }

    collect(){
        Dash_AnimationQueue.add({
            duration: .5,
            onFrame: (progress) => this.collectAnim(progress),
            onComplete: () => {
                engine.removeEntity(this)
            }
        })
        Scoreboard.increaseScore(1)
    }

    hide(){
        Dash_AnimationQueue.add({
            duration: 2,
            onFrame: (progress) => this.scaleOut(progress),
            onComplete: () => {
                engine.removeEntity(this)
            }
        })
        log('I am going to hide now')
    }
}
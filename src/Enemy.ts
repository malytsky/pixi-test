import { Container, AnimatedSprite } from "pixi.js";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { IEnemy } from "./IEnemy";

export class Enemy implements IEnemy {
    private _view:Container;
    
    constructor(texture:any) {
        this._view = new Container();
        this._view.interactive = true;
        this._view.once("pointerdown", this.onPointerDown, undefined);
        gsap.registerPlugin(MotionPathPlugin);

        if (texture != null) {
            let animatedSprite = new AnimatedSprite(texture.animations["mc"]);
            animatedSprite.anchor.x = 0.5;
            animatedSprite.anchor.y = 0.5;
            animatedSprite.scale.set(0.5);
            animatedSprite.animationSpeed = 0.3;
            animatedSprite.play();
            this._view.addChild(animatedSprite);
        }
    }

    private onPointerDown = ({}) => {
        gsap.to(this._view, 1, {
            motionPath: {
                path: [{x:244, y:200},{x:752, y:10}],
            },
            duration: 1,
            ease: "power1.inOut",
            onComplete: this.killEnemy,
            onCompleteParams: [this]
        });
    }

    private killEnemy(obj:any) {
        obj._view.emit("kill_enemy");
        obj.destroy();
    }

    public view():Container {
        return this._view;
    }

    private destroy() {
        gsap.killTweensOf(this._view);
        this._view.parent.removeChild(this._view);
        this._view.removeChildren();
        this._view.destroy();
    }
}
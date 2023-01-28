import { Container, Sprite } from "pixi.js";

export class Background {
    private _view:Container;
    private _resources:any;
    private _path:any;
    
    constructor(resources:any, path:any) {
        this._resources = resources;
        this._path = path;
        this._view = new Container();

        this.createBackground();
    }

    private createBackground():void {
        let background = new Sprite(this._resources[this._path].texture);
        this._view.addChild(background);
    }

    public view():Container {
        return this._view;
    }
}
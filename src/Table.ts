import { Container, Text } from "pixi.js";

export class Table {
    private _view:Container;
    private enemyCountText:Text;
    
    constructor() {
        this._view = new Container();
        this.createTable();
    }

    private createTable():void {
        let enemyCountName = new Text('Enemy Count: ');
        enemyCountName.x = 570;
        this._view.addChild(enemyCountName); 

        this.enemyCountText = new Text('');
        this.enemyCountText.x = enemyCountName.x + enemyCountName.width + 10;
        this._view.addChild(this.enemyCountText); 
    }

    public updateCount(count:Number):void {
        this.enemyCountText.text = count.toString();
    }

    public view():Container {
        return this._view;
    }
}
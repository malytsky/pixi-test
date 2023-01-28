import * as PIXI from 'pixi.js'
import { Background } from './Background';
import { Enemy } from './enemy';
import { IEnemy } from './IEnemy';
import { Table } from './Table';

let texture:any; 
let enemies:any;
let enemyCount:number;
let table:Table;
let background:Background;

const BACKGROUND_PATH:any = "assets/sky.jpg";
const ENEMY_LOCATION_PATH:any = "assets/enemyLocation.json";
const ENEMY_PATH:any = "assets/bird.json";

const pixi = new PIXI.Application({ width: 800, height: 450 });
const loader = new PIXI.Loader();
const loadBackgroundTextures = async () => getPromise(BACKGROUND_PATH, createBackground);

document.body.appendChild(pixi.view);
initGame();

async function initGame() {
    await loadBackgroundTextures();
    createEnemies();
    createTable();
}

function createEnemies() {
    let request = new XMLHttpRequest();
    request.open('GET', ENEMY_LOCATION_PATH);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        let json = request.response;
        enemies = json['enemies'];
        loader.add("birdTexture", ENEMY_PATH);
        loader.load(() => loadEnemyAtlasCompleted()); 
    }
}

function loadEnemyAtlasCompleted() {
    texture = loader.resources["birdTexture"].spritesheet;
    enemyCount = enemies.length;

    for (var i = 0; i < enemyCount; i++) {
        let enemy:IEnemy = new Enemy(texture);
        pixi.stage.addChild(enemy.view());
        enemy.view().x = enemies[i].x;
        enemy.view().y = enemies[i].y;
        enemy.view().addListener("kill_enemy", killEnemy);
    }

    updateTable();
}

function createBackground() {
    background = new Background(loader.resources, BACKGROUND_PATH);
    pixi.stage.addChild(background.view()); 
}

function createTable() {
    table = new Table();
    pixi.stage.addChild(table.view());
}

function killEnemy() {
    enemyCount--;
    updateTable();
} 

function updateTable() {
    table.updateCount(enemyCount);
}

function getPromise(path:any, func:any) {
    return new Promise((resolve, reject) => {
        loader
          .add(path)
          .load(func);
    
        loader.onComplete.add(() => {
            resolve(null);
        });
    
        loader.onError.add(() => {
            reject();
        });
    });
}


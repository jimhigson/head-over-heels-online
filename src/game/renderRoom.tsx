import { Application, Assets, Sprite } from 'pixi.js';
import blacktoothFloorUrl from '../../gfx/blacktoothfloor.png'

export const renderRoom = async (app: Application) => {
    const blacktoothFloorTexture = await Assets.load(blacktoothFloorUrl);
    const blacktoothFloorSprite = new Sprite(blacktoothFloorTexture);

    app.stage.addChild(blacktoothFloorSprite);
};
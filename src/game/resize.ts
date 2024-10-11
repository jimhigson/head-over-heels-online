import { Application } from 'pixi.js';
import { zxSpectrumResolution } from '../originalGame';

export const resize = async (app: Application) => {

    const scaleToFit = () => {
        console.log(`resize(): renderer is ${app.renderer.width} x ${app.renderer.height}`);

        if (app.renderer.width === 0 || app.renderer.height === 0)
            // not ready yet - size not known
            return;

        const scaleFactor = Math.floor(
            Math.min(
                app.renderer.width / zxSpectrumResolution.width,
                app.renderer.height / zxSpectrumResolution.height
            )
        );

        console.log('scale factor is:', scaleFactor);
        app.stage.scale = scaleFactor;
    }

    app.renderer.on('resize', () => scaleToFit());
    scaleToFit();
};
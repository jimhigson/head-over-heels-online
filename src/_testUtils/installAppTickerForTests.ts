import { installAppTickerAsPixiShared } from "../game/mainLoop/installAppTickerAsPixiShared";

// as every real entry point does before pixi can touch its shared ticker: pixi's
// own Ticker is patched to throw, so anything reaching Ticker.shared in a test
// (eg AnimatedSprite registering its update) needs ours to already be there
installAppTickerAsPixiShared();

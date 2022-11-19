/**
 * Draw frame from a sprite in Canvzas 2D Context
 * @param {CanvasRenderingContext2D} context
 * @param {HTMLImageElement} image
 * @param {object} frame
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
export default function drawSpriteFrame(context, image, frame, x, y, width, height) {
    context.drawImage(
        image,
        frame.x,
        frame.y,
        frame.width,
        frame.height,
        x,
        y,
        width,
        height
    );
}

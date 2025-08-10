import { ColorType } from "@/util/tooltype";
import Tool, {
  Point,
  getMousePos,
  getTouchPos,
  hexToRgb,
  updateImageData,
} from "./tool";

class Pen extends Tool {
  protected lineWidthBase = 1;
  protected drawColorType = ColorType.MAIN;
  private mouseDown = false;
  private saveImageData?: ImageData;
  private previousPos: Point = { x: 0, y: 0 };

  // Offscreen for clean final draw
  private tempCanvas?: HTMLCanvasElement;
  private tempCtx?: CanvasRenderingContext2D;

  private operateStart(pos: Point) {
    if (!Tool.ctx) return;

    // Save original canvas state
    this.saveImageData = Tool.ctx.getImageData(
      0,
      0,
      Tool.ctx.canvas.width,
      Tool.ctx.canvas.height
    );

    // Create temp canvas for proper opacity blending
    this.tempCanvas = document.createElement("canvas");
    this.tempCanvas.width = Tool.ctx.canvas.width;
    this.tempCanvas.height = Tool.ctx.canvas.height;
    this.tempCtx = this.tempCanvas.getContext("2d") as any;
    if (!this.tempCtx) return;

    // Init both canvases for drawing
    const color =
      this.drawColorType === ColorType.MAIN ? Tool.mainColor : Tool.subColor;

    [Tool.ctx, this.tempCtx].forEach((ctx) => {
      ctx.lineWidth = Tool.lineWidthFactor * this.lineWidthBase;
      ctx.strokeStyle = color;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
    });

    this.previousPos = pos;
    this.mouseDown = true;
  }

  private operateMove(pos: Point) {
    if (!this.mouseDown || !Tool.ctx || !this.tempCtx) return;

    const c = 0.5 * (this.previousPos.x + pos.x);
    const d = 0.5 * (this.previousPos.y + pos.y);

    // Draw preview to main canvas (real-time feedback)
    Tool.ctx.moveTo(this.previousPos.x, this.previousPos.y);
    Tool.ctx.quadraticCurveTo(c, d, pos.x, pos.y);
    Tool.ctx.stroke();

    // Also record stroke to temp canvas (full alpha)
    this.tempCtx.moveTo(this.previousPos.x, this.previousPos.y);
    this.tempCtx.quadraticCurveTo(c, d, pos.x, pos.y);
    this.tempCtx.stroke();

    this.previousPos = pos;
  }

  private operateEnd() {
    if (!this.mouseDown || !Tool.ctx || !this.tempCanvas || !this.tempCtx)
      return;

    // Finish preview
    Tool.ctx.closePath();
    this.tempCtx.closePath();
    this.mouseDown = false;

    // Restore the canvas to before the preview stroke
    if (this.saveImageData) {
      Tool.ctx.putImageData(this.saveImageData, 0, 0);
    }

    // Now draw the full stroke with correct opacity just once
    Tool.ctx.save();
    Tool.ctx.globalAlpha = Tool.opacity;
    Tool.ctx.drawImage(this.tempCanvas, 0, 0);
    Tool.ctx.restore();

    // Optional: pixel-level color blending
    let imageData = Tool.ctx.getImageData(
      0,
      0,
      Tool.ctx.canvas.width,
      Tool.ctx.canvas.height
    );

    const colorRgb = hexToRgb(
      this.drawColorType === ColorType.MAIN ? Tool.mainColor : Tool.subColor
    );

    if (colorRgb && this.saveImageData) {
      imageData = updateImageData(this.saveImageData, imageData, [
        colorRgb.r,
        colorRgb.g,
        colorRgb.b,
        Tool.opacity * 255,
      ]);
      Tool.ctx.putImageData(imageData, 0, 0);
    }

    this.tempCanvas = undefined;
    this.tempCtx = undefined;
  }

  public onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const mousePos = getMousePos(Tool.ctx.canvas, event);
    this.operateStart(mousePos);
  }

  public onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    this.operateEnd();
  }

  public onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    const mousePos = getMousePos(Tool.ctx.canvas, event);
    this.operateMove(mousePos);
  }

  public onTouchStart(event: TouchEvent): void {
    if (event.cancelable) event.preventDefault();
    const touchPos = getTouchPos(event.target as HTMLCanvasElement, event);
    this.operateStart(touchPos);
  }

  public onTouchMove(event: TouchEvent): void {
    if (event.cancelable) event.preventDefault();
    const touchPos = getTouchPos(event.target as HTMLCanvasElement, event);
    this.operateMove(touchPos);
  }

  public onTouchEnd(event: TouchEvent): void {
    if (event.cancelable) event.preventDefault();
    this.operateEnd();
  }
}

export default Pen;

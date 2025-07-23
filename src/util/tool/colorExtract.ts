import Tool, { getPixelColorOnCanvas, getMousePos, getTouchPos } from "./tool";

class ColorExtract extends Tool {
  private setColorWithIndex: (color: string, selectedColor: number) => void;

  public constructor(
    setColorWithIndex: (color: string, index: number) => void
  ) {
    super();
    this.setColorWithIndex = setColorWithIndex;
  }

  private operateStart(pos: { x: number; y: number }, selectedColor: number) {
    const color = getPixelColorOnCanvas(Tool.ctx, pos.x, pos.y);
    this.setColorWithIndex(color, selectedColor);
  }
  public onMouseDown(event: MouseEvent, selectedColor: number): void {
    event.preventDefault();
    const mousepos = getMousePos(Tool.ctx.canvas, event);
    this.operateStart(mousepos, selectedColor);
  }

  public onTouchStart(event: TouchEvent, selectedColor: number): void {
    if (event.cancelable) {
      event.preventDefault();
    }
    const canvas = event.target as HTMLCanvasElement;
    const touchPos = getTouchPos(canvas, event);

    this.operateStart(touchPos, selectedColor);
  }
}

export default ColorExtract;

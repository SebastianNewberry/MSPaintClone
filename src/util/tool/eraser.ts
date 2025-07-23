import Pen from "./pen";
import { ColorType } from "@/util/tooltype";

class Eraser extends Pen {
  protected lineWidthBase = 3;
  protected drawColorType = ColorType.SUB;
}

export default Eraser;

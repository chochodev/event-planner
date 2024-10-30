import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

// :::::::::::::::::: Custom Rect object
class CustomRect extends fabric.Rect {
  readonly id: string;

  constructor(options: any) {
    super(options);
    this.id = uuidv4();
  }
}

// :::::::::::::::::: Custom Circle object
class CustomCircle extends fabric.Circle {
  readonly id: string;

  constructor(options: any) {
    super(options);
    this.id = uuidv4();
  }
}

// :::::::::::::::::: Custom Text object
class CustomText extends fabric.IText {
  readonly id: string;

  constructor(options: any) {
    super(options.text, options);
    this.id = uuidv4();
  }
}

// ::::::::::::::: Create rectangle object
export const createRect = (left: number, top: number) => {
  const rect = new CustomRect({
    left,
    top,
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: 1,
    width: 100,
    height: 100,
    selectable: true,
    borderColor: 'green',
    borderDashArray: [2, 4],
    padding: 2,
    cornerColor: 'lightblue',
    cornerSize: 5,
    cornerStrokeColor: 'blue',
    transparentCorners: false,
    id: uuidv4()
  });

  rect.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
  });
  
  return rect;    
};

// ::::::::::::::: Create seat object
export const createSeat = (left: number, top: number) => {
  const seat = new CustomCircle({
    left,
    top,
    fill: 'transparent',
    stroke: 1,
    radius: 10,
    selectable: true,
    borderColor: 'green',
    borderDashArray: [2, 4],
    padding: 2,
    cornerColor: 'lightblue',
    cornerSize: 5,
    cornerStrokeColor: 'blue',
    transparentCorners: false,
    rx: 0.25,
    ry: 0.25,
    id: uuidv4()
  });

  seat.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
  });
  
  return seat;    
};

// ::::::::::::::: Create text object
export const createText = (left: number, top: number, text: string = 'Type here') => {
  const textObject = new CustomText({
    left,
    top,
    text,
    fontSize: 20,
    fill: 'black',
    selectable: true,
    borderColor: 'green',
    borderDashArray: [2, 4],
    padding: 2,
    cornerColor: 'lightblue',
    cornerSize: 5,
    cornerStrokeColor: 'blue',
    transparentCorners: false,
    id: uuidv4()
  });

  textObject.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
  });
  
  return textObject;
};

export { CustomRect, CustomCircle, CustomText };
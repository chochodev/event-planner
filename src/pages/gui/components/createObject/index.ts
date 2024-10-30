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

// ::::::::::::::: Create seat object
const createRect = (left: number, top: number) => {
  const seat = new CustomRect({
    left,
    top,
    fill: 'transparent',
    stroke: 1,
    // width: 10,
    // height: 10,
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


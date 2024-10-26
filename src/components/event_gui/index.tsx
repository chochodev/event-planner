import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setWidth(800);
    canvas.setHeight(600);

    // Define custom control handler for resizing
    const customResizeHandler = (eventData: any, transform: any, x: any, y: any) => {
      const target = transform.target;
      const newWidth = target.width * target.scaleX + x;
      const newHeight = target.height * target.scaleY + y;
      target.set({ width: newWidth, height: newHeight, scaleX: 1, scaleY: 1 });
      return true;
    };

    // ::::::::::::::: seat object
    const seat = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'orange',
      width: 50,
      height: 50,
      selectable: true,
      hasBorders: false,
      cornerColor: 'white',
      cornerSize: 8,
      // cornerStyle: 'circle',
      cornerStrokeColor: 'red',
      transparentCorners: false,
    });

    seat.setControlsVisibility({
      mt: false,
      mb: true,
      ml: false,
      mr: true,
      tl: false,
      tr: false,
      bl: false,
      br: true,
    });

    canvas.add(seat);

    // Listen for object selection
    canvas.on('object:selected', () => {
      console.log('selected!!');
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default SeatCanvas;

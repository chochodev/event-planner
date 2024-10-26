import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setWidth(800);
    canvas.setHeight(600);

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
      cornerStrokeColor: 'red',
      transparentCorners: false,
      rx: 0.25,
      ry: 0.25,
    });

    seat.setControlsVisibility({
      mt: false,
      mb: true,
      ml: false,
      // mr: true,
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

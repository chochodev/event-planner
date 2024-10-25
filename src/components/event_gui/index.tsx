import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setWidth(800);
    canvas.setHeight(600);

    // Example seat object
    const seat = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'blue',
      width: 30,
      height: 30,
      selectable: true,
    });

    canvas.add(seat);
    canvas.on('object:selected', (e) => {
      // handle seat selection
    });

    return () => canvas.dispose();
  }, []);

  return <canvas ref={canvasRef} />;
};
export default SeatCanvas;

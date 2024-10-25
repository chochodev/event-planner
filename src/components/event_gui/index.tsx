import { useEffect, useRef } from 'react';
import fabric from 'fabric';

const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.width = 800;
    canvas.height = 600;

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
    
    // Cast the event type to any to avoid TypeScript errors
    canvas.on('object:selected' as any, (e) => {
      // handle seat selection
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default SeatCanvas;

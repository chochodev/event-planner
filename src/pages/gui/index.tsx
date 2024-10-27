import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';

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
      // mb: true,
      ml: false,
      // mr: true,
      tl: false,
      tr: false,
      bl: false,
      // br: true,
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

  return (
    <div className='relative size-full'>
      <Toolbar />
      <div className='flex justify-between w-full'>
        <canvas className='flex-1' ref={canvasRef} />
        <Sidebar />
      </div>
    </div>);
};

export default SeatCanvas;
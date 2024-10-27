import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';
import { v4 as uuidv4 } from 'uuid';

const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !canvasParent.current) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    
    // :::::::::::::::::: Canvas height and width
    const resizeCanvas = () => {
      if (canvasParent.current) {
        const parent = canvasParent.current;

        if (parent) {
          const { width, height } = parent.getBoundingClientRect();
          canvas.setDimensions({ width, height }, {cssOnly: false});
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
      id: uuidv4()
    });

    seat.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
    });

    canvas.add(seat);
    canvas.selection = true;
    // console.log(seat.selectable);
    
    // Listen for object selection
    canvas.on('selection:created', () => {
      const activeObject = canvas.getActiveObject();
  
      if (activeObject) {
        console.log('Selected object:', activeObject);
        // Now you can pass activeObject to the sidebar for changes
        // For example:
        // sidebar.updateSelection(activeObject);
      } else {
        console.log('No object selected');
      }
    });

    // :::::::::::::::::::: Keeps the object in bound (in the canvas)
    canvas.on('object:moving', (event) => {
      const obj = event.target;
      const { width: canvasWidth, height: canvasHeight } = canvas;

      if (obj) {
        const objWidth = (obj.width ?? 0) * (obj.scaleX ?? 1);
        const objHeight = (obj.height ?? 0) * (obj.scaleY ?? 1);

        // Set boundaries
        obj.left = Math.max(0, Math.min(obj.left ?? 0, canvasWidth ?? 0 - objWidth));
        obj.top = Math.max(0, Math.min(obj.top ?? 0, canvasHeight ?? 0 - objHeight));
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className='relative size-full bg-gray-200'>
      <Toolbar />
      <div className='flex justify-between w-full'>
        <div className='w-full max-w-[45rem] mx-auto bg-gray-100' ref={canvasParent}>
          <canvas className='size-full' style={{width: '100%', height: '100%'}} ref={canvasRef} />
        </div>
        <Sidebar />
      </div>
    </div>);
};

export default SeatCanvas;
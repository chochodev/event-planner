import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';
import { v4 as uuidv4 } from 'uuid';

// :::::::::::::::::: Custom object
class CustomRect extends fabric.Rect {
  readonly id: string;

  constructor(options: any) {
    super(options);
    this.id = uuidv4(); // Assign a UUID to this object
  }
}

const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParent = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [isCreatingFloorPlan, setIsCreatingFloorPlan] = useState(false);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !canvasParent.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(newCanvas);
    
    // :::::::::::::::::: Canvas height and width
    const resizeCanvas = () => {
      if (canvasParent.current) {
        const parent = canvasParent.current;

        if (parent) {
          const { width, height } = parent.getBoundingClientRect();
          newCanvas.setDimensions({ width, height }, {cssOnly: false});
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ::::::::::::::: seat object
    const createSeat = (left: number, top: number) => {
      return new CustomRect({
        left,
        top,
        fill: 'orange',
        width: 50,
        height: 50,
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
    };

    const seat = createSeat(100, 100);

    seat.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
    });

    newCanvas.add(seat);
    newCanvas.selection = true;
    
    // Listen for object selection
    newCanvas.on('selection:created', () => {
      const activeObject = newCanvas.getActiveObject();
  
      if (activeObject) {
        console.log('Selected object:', activeObject);
        // Now you can pass activeObject to the sidebar for changes
      } else {
        console.log('No object selected');
      }
    });

    // :::::::::::::::::::: Keeps the object in bound (in the canvas)
    newCanvas.on('object:moving', (event) => {
      const obj = event.target;
      const { width: canvasWidth, height: canvasHeight } = newCanvas;

      if (obj) {
        const objWidth = (obj.width ?? 0) * (obj.scaleX ?? 1);
        const objHeight = (obj.height ?? 0) * (obj.scaleY ?? 1);

        // Set boundaries
        obj.left = Math.max(0, Math.min(obj.left ?? 0, canvasWidth ?? 0 - objWidth));
        obj.top = Math.max(0, Math.min(obj.top ?? 0, canvasHeight ?? 0 - objHeight));
      }
    });

    return () => {
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    const handleMouseDown = (event: fabric.IEvent) => {
      if (!isCreatingFloorPlan) return;

      const pointer = canvas.getPointer(event.e);
      startPointRef.current = { x: pointer.x, y: pointer.y };
    };

    const handleMouseUp = (event: fabric.IEvent) => {
      if (!isCreatingFloorPlan || !startPointRef.current) return;

      const endPoint = canvas.getPointer(event.e);
      const startPoint = startPointRef.current;

      const width = Math.abs(endPoint.x - startPoint.x);
      const height = Math.abs(endPoint.y - startPoint.y);

      const rows = Math.floor(height / 60);
      const cols = Math.floor(width / 60);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const seat = new CustomRect({
            left: startPoint.x + j * 60,
            top: startPoint.y + i * 60,
            fill: 'orange',
            width: 50,
            height: 50,
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

          canvas.add(seat);
        }
      }

      canvas.renderAll();
      startPointRef.current = null;
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [canvas, isCreatingFloorPlan]);

  const toggleFloorPlanMode = () => {
    setIsCreatingFloorPlan(!isCreatingFloorPlan);
  };

  return (
    <div className='relative size-full bg-gray-200'>
      <button
        onClick={toggleFloorPlanMode}
        className={`absolute bottom-4 right-4 px-4 py-2 rounded ${
          isCreatingFloorPlan ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        {isCreatingFloorPlan ? 'Exit Floor Plan Mode' : 'Create Floor Plan'}
      </button>
      <Toolbar />
      <div className='flex justify-between w-full'>
        <div className='w-full max-w-[45rem] mx-auto bg-gray-100' ref={canvasParent}>
          <canvas className='size-full' style={{width: '100%', height: '100%'}} ref={canvasRef} />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default SeatCanvas;
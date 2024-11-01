import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';
import { useEventGuiStore } from '@/zustand/store';
import { createText, createRect, createSeat } from './components/createObject';


// ::::::::::::::::::::: MAIN JSX FUNCTION
const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParent = useRef<HTMLDivElement>(null);
  const {
    canvas,
    setCanvas,
    toolMode,
    setToolMode,
    toolAction,
    setToolAction,
  } = useEventGuiStore();
  
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  
  // ::::::::::::::::::: Customize controls for the compound selection (ActiveSelection)
  useEffect(() => {
    if (!canvas) return;
  
    const handleSelection = () => {
      const activeObject = canvas.getActiveObject();
      
      if (activeObject && activeObject.type === 'activeSelection') {
        activeObject.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
        });

        activeObject.borderColor = 'green';
        activeObject.borderDashArray = [2, 4];
        activeObject.padding = 4;
        activeObject.cornerColor = 'lightblue';
        activeObject.cornerSize = 7;
        activeObject.cornerStrokeColor = 'blue';
        
        canvas.requestRenderAll();
      }
    };
  
    // ::::::::::::::::::::: Event: listens to event & Calls the functions
    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
  
    // ::::::::::::::::::::: Unmount: handles components appropriately on unmount
    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
    };
  }, [canvas]);

  // :::::::::::::::::::::::: ADDITIONAL BEHAIVOR TO CANVAS SEAT OBJECTS
  // ::::::::::::::::::: Create a simple seat object
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

    // :::::::::::::::::::::::: sample seat object created on the canvas
    const seat = createSeat(100, 100);
    seat.angle = 45;

    newCanvas.add(seat);
    
    // :::::::::::::::::::::::: Listen for object selection
    newCanvas.on('selection:created', () => {
      const activeObject = newCanvas.getActiveObject();
  
      if (activeObject) {
        // console.log('Selected object:', activeObject);
      } else {
        // console.log('No object selected');
      }
    });

    // :::::::::::::::::::: Keeps the object in bound (in the canvas)
    newCanvas.on('object:moving', (event) => {
      const obj = event.target;
      const { width: canvasWidth, height: canvasHeight } = newCanvas;
      
      if (obj) {
        const objWidth = (obj.width ?? 0) * (obj.scaleX ?? 1);
        const objHeight = (obj.height ?? 0) * (obj.scaleY ?? 1);
        
        // ::::::::::::::::::: Set boundaries
        obj.left = Math.max(0, Math.min((obj.left ?? 0), (canvasWidth ?? 0) - objWidth));
        obj.top = Math.max(0, Math.min((obj.top ?? 0), (canvasHeight ?? 0) - objHeight));
      }
    });

    return () => {
      newCanvas.dispose();
    };
  }, []);

  // :::::::::::::::::::::: Create multiple rows seat
  useEffect(() => {
    if (!canvas) return;

    const handleMouseDown = (event: fabric.IEvent) => {
      if (!(toolMode === 'multiple-seat')) return;

      const pointer = canvas.getPointer(event.e);
      startPointRef.current = { x: pointer.x, y: pointer.y };
    };

    const handleMouseUp = (event: fabric.IEvent) => {
      if (!(toolMode === 'multiple-seat') || !startPointRef.current) return;

      // ::::::::::::::::::: Get the end position of the cursor highlight
      const endPoint = canvas.getPointer(event.e);
      const startPoint = startPointRef.current;

      // ::::::::::::::::::: Get the dimensions of the highlighted space
      const width = Math.abs(endPoint.x - startPoint.x);
      const height = Math.abs(endPoint.y - startPoint.y);

      const rows = Math.floor(height / 60);
      const cols = Math.floor(width / 60);

      // :::::::::::::::::: Create set objects in rows & columns
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const left = startPoint.x + j * 60;
          const top = startPoint.y + i * 60;
          const seat = createSeat(left, top);

          canvas.add(seat);
        }
      }

      // ::::::::::::::::: Render all & Reset the cursor position state
      canvas.renderAll();
      startPointRef.current = null;

      // ::::::::::::::: Reset the floor mode
      setToolMode('select');
    };

    // ::::::::::::::::::::: Listens to client's event & Call the functions
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:up', handleMouseUp);

    // :::::::::::::::::::: Removes the events on component unmount
    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [canvas, toolMode]);


  // :::::::::::::::::::::: Delete selected object
  useEffect(() => {
    if (!canvas) return;

    // ::::::::::::::::::: Delete function
    const deleteFunction = () => {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;
  
      // :::::::::::::::: multiple selection
      if (activeObject.type === 'activeSelection') {
        const activeSelection = activeObject as fabric.ActiveSelection;
        const objects = [...activeSelection.getObjects()];
        objects.forEach(obj => canvas.remove(obj));
      } // :::::::::::::::::::: single object
        else {
        canvas.remove(activeObject);
      }
  
      canvas.discardActiveObject();
      canvas.renderAll();
    }

    // :::::::::::::::::: Delete on keyboard event
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || (event.ctrlKey && event.key.toLowerCase() === 'd')) {
        deleteFunction();
      }
    };

    // ::::::::::::::::::: Delete on button trigger
    if (toolAction === 'delete') {
      deleteFunction();
      setToolAction(null);
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas, toolAction]);


  // :::::::::::::::::::::: Add single seat, draw rectangle, or add text
  useEffect(() => {
    if (!canvas) return;

    const handleMouseDown = (event: fabric.IEvent) => {
      const pointer = canvas.getPointer(event.e);

      if (toolMode === 'one-seat') {
        const seat = createSeat(pointer.x, pointer.y);
        canvas.add(seat);
        canvas.renderAll();
      } 

      // ::::::::::::: For shape (square)
      else if (toolMode === 'shape-square') {
        const rect = createRect(pointer.x, pointer.y);
        rect.set({ width: 0, height: 0 });
        canvas.add(rect);
        canvas.setActiveObject(rect);
        startPointRef.current = { x: pointer.x, y: pointer.y };
      }

      // ::::::::::::::: For text 
      else if (toolMode === 'text') {
        const text = createText(pointer.x, pointer.y);
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
      }
    };

    // ::::::::::::::::::: Resizes rect on select (current)
    const handleMouseMove = (event: fabric.IEvent) => {
      if (toolMode === 'shape-square' && startPointRef.current) {
        const pointer = canvas.getPointer(event.e);
        const activeObject = canvas.getActiveObject() as fabric.Rect;

        if (activeObject && activeObject.type === 'rect') {
          const width = Math.abs(pointer.x - startPointRef.current.x);
          const height = Math.abs(pointer.y - startPointRef.current.y);
          activeObject.set({
            width: width,
            height: height
          });
          canvas.renderAll();
        }
      }
    };

    const handleMouseUp = () => {
      if (toolMode === 'shape-square') {
        startPointRef.current = null;
      }
      setToolMode('select');
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [canvas, toolMode]);

  return (
    <div className='relative size-full bg-gray-200'>
      <Toolbar />
      <div className='flex justify-between w-full'>
        <div className='w-full max-w-[45rem] mx-auto bg-gray-100' ref={canvasParent}>
          <canvas
            ref={canvasRef} 
          />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default SeatCanvas;
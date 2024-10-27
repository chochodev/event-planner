import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';

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
          console.log('parent: ', parent);
          const { width, height } = parent.getBoundingClientRect();
          console.log('width and height: ', width, height);
          canvas.setDimensions({ width, height }, {cssOnly: false});
        }
      }
    };

    resizeCanvas();
    // canvas.requestRenderAll();
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

    canvas.on('object:moving', (event) => {
      const obj = event.target;
      // const { width: canvasWidth, height: canvasHeight } = canvas;

      // if (obj && obj.width && obj.height && obj.scaleX && obj.scaleY && obj.left && obj.top && canvasHeight && canvasWidth) {
      //   const objWidth = obj.width * obj.scaleX;
      //   const objHeight = obj.height * obj.scaleY;
    
      //   // Set boundaries
      //   if (obj.left < 1) obj.left = 1;
      //   if (obj.top < 1) obj.top = 1;
      //   if (obj.left + objWidth > canvasWidth) obj.left = canvasWidth - objWidth;
      //   if (obj.top + objHeight > canvasHeight) obj.top = canvasHeight - objHeight;
      // }
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
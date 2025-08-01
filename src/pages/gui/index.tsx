import { useRef } from 'react';
import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';
import { useEventGuiStore } from '@/zustand/store';
import useCanvasSetup from './hooks/useCanvasSetup';
import useSelectionHandler from './hooks/useSelectionHandler';
import useMultipleSeatCreator from './hooks/useMultipleSeatCreator';
import useObjectDeletion from './hooks/useObjectDeletion';
import useObjectCreator from './hooks/useObjectCreator';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import useUndoRedo from './hooks/useUndoRedo';

const SeatCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasParent = useRef<HTMLDivElement>(null);
  const {
    canvas,
    setCanvas,
    toolMode,
    setToolMode,
    toolAction,
  } = useEventGuiStore();

  useCanvasSetup(canvasRef, canvasParent, setCanvas);
  useSelectionHandler(canvas);
  useMultipleSeatCreator(canvas, toolMode, setToolMode);
  useObjectDeletion(canvas, toolAction);
  useObjectCreator(canvas, toolMode, setToolMode);
  useUndoRedo();
  
  useKeyboardShortcuts();

  return (
    <div className='relative size-full bg-gray-200'>
      <Toolbar />
      <div className='flex justify-between w-full'>
        <div className='w-full max-w-[45rem] mx-auto bg-gray-100' ref={canvasParent}>
          <canvas ref={canvasRef} />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default SeatCanvas;
import { useEffect } from 'react';
import { useEventGuiStore } from '@/zustand/store';

const useUndoRedo = () => {
  const { canvas, addToUndoStack, undo, redo, undoStack } = useEventGuiStore();

  useEffect(() => {
    if (!canvas) return

    // :::::::::::::::: Function: appends undo state
    const handleObjectModified = () => {
      const jsonState = JSON.stringify(canvas.toJSON());
      addToUndoStack(jsonState);
      console.log('handle object modified called!!', undoStack);
    }

    const eventsToListen = [
      'object:modified',
      'object:added',
      'object:removed'
    ];

    // ::::::::::::::: Loop through events to call function
    eventsToListen.forEach(event => {
      canvas.on(event, handleObjectModified);
    });

    return () => {
      eventsToListen.forEach(event => {
        canvas.off(event, handleObjectModified);
      });
    }
  }, [canvas, addToUndoStack])

  return { undo, redo }
}

export default useUndoRedo;
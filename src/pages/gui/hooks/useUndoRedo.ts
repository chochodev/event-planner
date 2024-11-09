import { useEffect, useState } from 'react';
import { useEventGuiStore } from '@/zustand/store';

const useUndoRedo = () => {
  const { canvas, addToUndoStack, undo, redo, undoStack } = useEventGuiStore();
  const [isUndoRedo, setIsUndoRedo] = useState(false);

  useEffect(() => {
    if (!canvas) return

    // :::::::::::::::: Function: appends undo state
    const handleObjectModified = () => {
      if (isUndoRedo) return;

      const jsonState = JSON.stringify(canvas.toJSON());
      addToUndoStack(jsonState);
      console.log('handleObjectModified called!', undoStack.length);
    };

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
  }, [canvas, isUndoRedo, undoStack, addToUndoStack])

  const handleUndo = () => {
    setIsUndoRedo(true); // Set flag to indicate undo action
    undo();
    setIsUndoRedo(false); // Reset flag after undo completes
  };

  // Custom redo function
  const handleRedo = () => {
    setIsUndoRedo(true); // Set flag to indicate redo action
    redo();
    setIsUndoRedo(false); // Reset flag after redo completes
  };

  return { handleUndo, handleRedo }
}

export default useUndoRedo;
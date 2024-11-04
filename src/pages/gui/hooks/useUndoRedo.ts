import { useEffect } from 'react'
import { useEventGuiStore } from '@/zustand/store'

const useUndoRedo = () => {
  const { canvas, addToUndoStack, undo, redo } = useEventGuiStore()

  useEffect(() => {
    if (!canvas) return

    const handleObjectModified = () => {
      const jsonState = JSON.stringify(canvas.toJSON())
      addToUndoStack(jsonState)
    }

    canvas.on('object:modified', handleObjectModified)
    canvas.on('object:added', handleObjectModified)
    canvas.on('object:removed', handleObjectModified)

    return () => {
      canvas.off('object:modified', handleObjectModified)
      canvas.off('object:added', handleObjectModified)
      canvas.off('object:removed', handleObjectModified)
    }
  }, [canvas, addToUndoStack])

  return { undo, redo }
}

export default useUndoRedo;
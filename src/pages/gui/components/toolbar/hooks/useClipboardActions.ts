import { useEventGuiStore } from '@/zustand/store';
import { fabric } from 'fabric';

const useClipboardActions = () => {
  const { canvas, clipboard, setClipboard } = useEventGuiStore()

  const copySelectedObjects = () => {
    if (!canvas) return

    const activeObjects = canvas.getActiveObjects()
    if (activeObjects.length === 0) return

    const clonedObjects = activeObjects.map(obj => fabric.util.object.clone(obj))
    setClipboard(clonedObjects)
  }

  const cutSelectedObjects = () => {
    if (!canvas) return

    const activeObjects = canvas.getActiveObjects()
    if (activeObjects.length === 0) return

    const clonedObjects = activeObjects.map(obj => fabric.util.object.clone(obj))
    setClipboard(clonedObjects)

    canvas.remove(...activeObjects)
    canvas.discardActiveObject()
    canvas.renderAll()
  }

  const pasteObjects = () => {
    if (!canvas || !clipboard) return

    const pastedObjects = clipboard.map(obj => fabric.util.object.clone(obj))
    pastedObjects.forEach(obj => {
      obj.set({
        left: (obj.left || 0) + 20,
        top: (obj.top || 0) + 20,
      })
      canvas.add(obj)
    })

    canvas.renderAll()
  }

  return { copySelectedObjects, cutSelectedObjects, pasteObjects }
}

export default useClipboardActions
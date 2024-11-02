import { fabric } from 'fabric';
import { CustomFabricObject } from '@/types/fabric-types';

interface Properties {
  angle?: number;
  radius?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  left?: number;
  top?: number;
}

export const useObjectUpdater = (
  selectedObject: CustomFabricObject | null, 
  canvas: fabric.Canvas | null, 
  setProperties: React.Dispatch<React.SetStateAction<Properties>>
) => {
  const updateObject = (updates: Partial<Properties>) => {
    if (!selectedObject || !canvas) return;

    const safeUpdates: Partial<CustomFabricObject> = {
      ...updates,
      stroke: typeof updates.stroke === 'string' ? updates.stroke : undefined
    };
  
    selectedObject.set(safeUpdates);
    
    if (selectedObject.type === 'i-text') {
      selectedObject.set({
        scaleX: 1,
        scaleY: 1,
      });
    }
    
    canvas.renderAll();

    setProperties(prev => ({
      ...prev,
      ...updates
    }));
  };

  return { updateObject };
};
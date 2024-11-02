import { fabric } from 'fabric';
import { CustomFabricObject } from '@/types/fabric-types';
import { Properties } from './useObjectProperties';

export const useObjectUpdater = (
  selectedObject: CustomFabricObject | null, 
  canvas: fabric.Canvas | null, 
  setProperties: React.Dispatch<React.SetStateAction<Properties>>
) => {
  const updateObject = (updates: Partial<Properties>) => {
    if (!selectedObject || !canvas) return;

    // Only update the properties that have changed
    const updatedProperties: Partial<CustomFabricObject> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (selectedObject[key as keyof CustomFabricObject] !== value) {
        updatedProperties[key as keyof CustomFabricObject] = value;
      }
    }

    // Ensure stroke is always a string when it's being updated
    if ('stroke' in updatedProperties && updatedProperties.stroke !== undefined) {
      updatedProperties.stroke = String(updatedProperties.stroke);
    }

    selectedObject.set(updatedProperties);
    
    if (selectedObject.type === 'i-text') {
      selectedObject.set({
        scaleX: 1,
        scaleY: 1,
      });
    }
    
    canvas.renderAll();

    setProperties(prev => ({
      ...prev,
      ...updatedProperties
    }));
  };

  return { updateObject };
};

// import { fabric } from 'fabric';
// import { CustomFabricObject } from '@/types/fabric-types';
// import { Properties } from './useObjectProperties';

// // :::::::::::::::::: Update object properties
// export const useObjectUpdater = (
//   selectedObject: CustomFabricObject | null, 
//   canvas: fabric.Canvas | null, 
//   setProperties: React.Dispatch<React.SetStateAction<Properties>>
// ) => {
//   const updateObject = (updates: Partial<Properties>) => {
//     if (!selectedObject || !canvas) return;

//     // ::::::::::::::: To make sure stroke is always string
//     const safeUpdates: Partial<CustomFabricObject> = {
//       ...updates,
//       stroke: typeof updates.stroke === 'string' ? updates.stroke : undefined
//     };
  
//     selectedObject.set(safeUpdates);
    
//     // :::::::::::::: Prevent text size from increasing with scale
//     if (selectedObject.type === 'i-text') {
//       selectedObject.set({
//         scaleX: 1,
//         scaleY: 1,
//       });
//     }
    
//     canvas.renderAll();

//     setProperties(prev => ({
//       ...prev,
//       ...updates
//     }));
//   };

//   return { updateObject };
// };
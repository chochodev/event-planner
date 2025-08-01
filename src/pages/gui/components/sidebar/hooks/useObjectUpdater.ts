// import { fabric } from 'fabric';
// import { CustomFabricObject } from '@/types/fabric-types';
// import { Properties } from './useObjectProperties';

// export const useObjectUpdater = (
//   canvas: fabric.Canvas | null, 
//   setProperties: React.Dispatch<React.SetStateAction<Properties>>
// ) => {
//   const updateObject = (updates: Partial<Properties>) => {
//     if (!canvas) return;

//     const activeObjects = canvas.getActiveObjects();
//     if (activeObjects.length === 0) return;

//     // Only update the properties that have changed
//     const updatedProperties: Partial<CustomFabricObject> = {};
//     for (const [key, value] of Object.entries(updates)) {
//       if (activeObjects[0][key as keyof CustomFabricObject] !== value) {
//         updatedProperties[key as keyof CustomFabricObject] = value;
//       }
//     }

//     // Ensure stroke is always a string when it's being updated
//     if ('stroke' in updatedProperties && updatedProperties.stroke !== undefined) {
//       updatedProperties.stroke = String(updatedProperties.stroke);
//     }

//     activeObjects.forEach((obj) => {
//       obj.set(updatedProperties);
      
//       if (obj.type === 'i-text') {
//         obj.set({
//           scaleX: 1,
//           scaleY: 1,
//         });
//       }
//     });
    
//     canvas.renderAll();

//     // Update properties based on the first selected object
//     setProperties(prev => ({
//       ...prev,
//       ...updatedProperties
//     }));
//   };

//   return { updateObject };
// };

import { fabric } from 'fabric';
import { CustomFabricObject } from '@/types/fabric-types';
import { Properties } from './useObjectProperties';

export const useObjectUpdater = (
  // selectedObject: CustomFabricObject | null, 
  canvas: fabric.Canvas | null, 
  setProperties: React.Dispatch<React.SetStateAction<Properties>>
) => {
  const updateObject = (updates: Partial<Properties>) => {
    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects() as CustomFabricObject[];
    if (activeObjects.length === 0) return;


    // Only update the properties that have changed
    activeObjects.forEach((selectedObject) => {
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
      
      // :::::::::::: Ensures the text's scales remains 1, only font-size should change
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
    });
  };

  return { updateObject };
};
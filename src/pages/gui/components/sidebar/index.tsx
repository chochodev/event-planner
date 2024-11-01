import { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { useEventGuiStore } from '@/zustand/store';
import { Pattern, Gradient } from 'fabric/fabric-impl';
import { CustomFabricObject } from '@/types/fabric-types';

interface Properties {
  angle: number;
  radius: number;
  width: number;
  height: number;
  fill: string | Pattern | Gradient | undefined;
  stroke: string;
  text: string;
  fontSize: number;
  left: number;
  top: number;
}

const Sidebar = () => {
  const { canvas } = useEventGuiStore();
  const [selectedObject, setSelectedObject] = useState<CustomFabricObject | null>(null);
  const [objectType, setObjectType] = useState<'circle' | 'rect' | 'i-text' | null>(null);
  
  // ::::::::::::::::::: Properties state
  const [properties, setProperties] = useState<Properties>({
    angle: 0,
    radius: 10,
    width: 100,
    height: 100,
    fill: 'transparent' as string | undefined,
    stroke: '#000000',
    text: '',
    fontSize: 20,
    left: 0,
    top: 0
  });

  // ::::::::::::::::::::::: Listen for object selection
  useEffect(() => {
    if (!canvas) return;

    const updateSelectedObject = () => {
      const activeObject = canvas.getActiveObject() as CustomFabricObject;
      setSelectedObject(activeObject || null);
      setObjectType(activeObject?.type as any || null);

      if (activeObject) {
        setProperties({
          angle: activeObject.angle || 0,
          radius: ((activeObject as any).radius * (activeObject as any).scaleX) || 10,
          width: activeObject.width || 100,
          height: activeObject.height || 100,
          fill: activeObject.fill? String(activeObject.fill) : 'transparent',
          stroke: activeObject.stroke? String(activeObject.stroke) : '#000000',
          text: (activeObject as any).text || '',
          fontSize: (activeObject as any).fontSize || 20,
          left: activeObject.left || 0,
          top: activeObject.top || 0
        });
      }

      console.table({'object radius: ': (activeObject as any).radius, '\nproperty radius: ': properties.radius, '\nscale x: ': (activeObject as any).scaleX});
    };

    canvas.on('selection:created', updateSelectedObject);
    canvas.on('selection:updated', updateSelectedObject);
    canvas.on('object:moving', updateSelectedObject);
    canvas.on('object:rotating', updateSelectedObject);
    canvas.on('object:scaling', updateSelectedObject);
    canvas.on('object:modified', updateSelectedObject);
    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
      setObjectType(null);
    });

    return () => {
      canvas.off('selection:created', updateSelectedObject);
      canvas.off('selection:updated', updateSelectedObject);
      canvas.off('selection:cleared');
    };
  }, [canvas, properties.radius]);

  // :::::::::::::::::: Update object properties
  const updateObject = (updates: Partial<Properties>) => {
    if (!selectedObject || !canvas) return;
    
    selectedObject.set(updates);
    canvas.renderAll();

    setProperties(prev => ({
      ...prev,
      ...updates
    }));
  };

  // ::::::::::::::: Check if a number is float && return a number or float in 2 dp
  const toFloat = (num: number) => {
    return num % 1 !== 0? Number(num.toFixed(2)) : num;
  }

  return (
    <div className="w-[20rem] min-h-screen bg-gray-50 p-4 space-y-4">
      <div className="bg-white rounded-md shadow">
        <div className="flex items-center justify-between p-2 bg-gray-200 rounded-t-md">
          <span className="font-semibold">Zones</span>
          <button className="text-gray-600 hover:text-gray-800">
            <LuPlus size={20} />
          </button>
        </div>
        <div className="p-2 flex items-center space-x-2">
          <input type="checkbox" id="ground-floor" className="rounded text-blue-600" />
          <label htmlFor="ground-floor">Ground floor</label>
        </div>
      </div>

      {selectedObject && (
        <div className="bg-white rounded-md shadow p-4 space-y-4">
          <h3 className="font-semibold">Properties</h3>
          
          {/* ::::::::::::::::::::: Common Properties */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Angle (&deg;)</label>
            <div className="flex items-center mt-1">
              <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ angle: toFloat(properties.angle) - 1 })}>-</button>
              <input
                type="number"
                value={toFloat(properties.angle)}
                onChange={(e) => updateObject({ angle: Number(e.target.value) })}
                className="w-full px-2 py-1 text-center border-t border-b"
              />
              <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ angle: toFloat(properties.angle) + 1 })}>+</button>
            </div>
          </div>

          {/* ::::::::::::::::::::: Position Controls */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Position X</label>
            <div className="flex items-center mt-1">
              <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ left: toFloat(properties.left) - 1 })}>-</button>
              <input
                type="number"
                value={toFloat(properties.left)}
                onChange={(e) => updateObject({ left: Number(e.target.value) })}
                className="w-full px-2 py-1 text-center border-t border-b"
              />
              <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ left: toFloat(properties.left) + 1 })}>+</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position Y</label>
            <div className="flex items-center mt-1">
              <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ top: toFloat(properties.top) - 1 })}>-</button>
              <input
                type="number"
                value={toFloat(properties.top)}
                onChange={(e) => updateObject({ top: Number(e.target.value) })}
                className="w-full px-2 py-1 text-center border-t border-b"
              />
              <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ top: toFloat(properties.top) + 1 })}>+</button>
            </div>
          </div>

          {/* ::::::::::::::::::::: Circle-specific controls */}
          {objectType === 'circle' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Radius</label>
              <div className="flex items-center mt-1">
                <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ radius: toFloat(properties.radius) - 1 })}>-</button>
                <input
                  type="number"
                  value={toFloat(properties.radius)}
                  onChange={(e) => updateObject({ radius: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-center border-t border-b"
                />
                <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ radius: toFloat(properties.radius) + 1 })}>+</button>
              </div>
            </div>
          )}

          {/* ::::::::::::::::::::: Rectangle-specific controls */}
          {objectType === 'rect' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Width</label>
                <div className="flex items-center mt-1">
                  <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ width: toFloat(properties.width) - 1 })}>-</button>
                  <input
                    type="number"
                    value={toFloat(properties.width)}
                    onChange={(e) => updateObject({ width: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-center border-t border-b"
                  />
                  <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ width: toFloat(properties.width) + 1 })}>+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <div className="flex items-center mt-1">
                  <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ height: toFloat(properties.height) - 1 })}>-</button>
                  <input
                    type="number"
                    value={toFloat(properties.height)}
                    onChange={(e) => updateObject({ height: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-center border-t border-b"
                  />
                  <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ height: toFloat(properties.height) + 1 })}>+</button>
                </div>
              </div>
            </>
          )}

          {/* ::::::::::::::::::::: Text-specific controls */}
          {objectType === 'i-text' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <input
                  type="text"
                  value={properties.text}
                  onChange={(e) => updateObject({ text: e.target.value })}
                  className="mt-1 px-2 py-1 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                <div className="flex items-center mt-1">
                  <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ fontSize: toFloat(properties.fontSize) - 1 })}>-</button>
                  <input
                    type="number"
                    value={toFloat(properties.fontSize)}
                    onChange={(e) => updateObject({ fontSize: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-center border-t border-b"
                  />
                  <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ fontSize: toFloat(properties.fontSize) + 1 })}>+</button>
                </div>
              </div>
            </>
          )}

          {/* ::::::::::::::::::::: Color controls for all objects */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fill Color</label>
            <div className="flex items-center mt-1">
              <input
                type="color"
                value={
                  properties?.fill === 'transparent' ? '#ffffff' : properties.fill?.toString() || '#ffffff'
                }
                onChange={(e) => updateObject({ fill: e.target.value })}
                className="w-8 h-8 rounded-md border"
              />
              <input
                type="text"
                value={
                  properties.fill === 'transparent' ? 'transparent' : (properties.fill?.toString() || '').toUpperCase()
                }
                onChange={(e) => updateObject({ fill: e.target.value })}
                className="ml-2 px-2 py-1 w-full border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Border Color</label>
            <div className="flex items-center mt-1">
              <input
                type="color"
                value={
                  properties.fill === 'transparent' ? 'transparent' : (properties.fill?.toString() || '').toUpperCase()
                }
                onChange={(e) => updateObject({ stroke: e.target.value })}
                className="w-8 h-8 rounded-md border"
              />
              <input
                type="text"
                value={
                  properties.stroke === 'transparent' ? 'transparent' : (properties.stroke?.toString() || '').toUpperCase()
                }
                onChange={(e) => updateObject({ stroke: e.target.value })}
                className="ml-2 px-2 py-1 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
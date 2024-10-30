import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useEventGuiStore } from '@/zustand/store';
import { CustomFabricObject, UpdateableProperties } from '@/types/fabric-types';

const Sidebar = () => {
  const { canvas } = useEventGuiStore();
  const [selectedObject, setSelectedObject] = useState<CustomFabricObject | null>(null);
  const [objectType, setObjectType] = useState<'circle' | 'rect' | 'i-text' | null>(null);
  
  // Properties state
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(10);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [fill, setFill] = useState('transparent');
  const [stroke, setStroke] = useState('#000000');
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  // Listen for object selection
  useEffect(() => {
    if (!canvas) return;

    const updateSelectedObject = () => {
      const activeObject = canvas.getActiveObject() as CustomFabricObject;
      setSelectedObject(activeObject || null);
      setObjectType(activeObject?.type as any || null);

      if (activeObject) {
        // Update common properties
        setRotation(activeObject.angle || 0);
        setLeft(activeObject.left || 0);
        setTop(activeObject.top || 0);
        setFill(activeObject.fill as string || 'transparent');
        setStroke(activeObject.stroke as string || '#000000');

        // Update type-specific properties
        if (activeObject.type === 'circle') {
          setRadius(activeObject.radius || 10);
        } else if (activeObject.type === 'rect') {
          setWidth(activeObject.width || 100);
          setHeight(activeObject.height || 100);
        } else if (activeObject.type === 'i-text') {
          setText(activeObject.text || '');
          setFontSize(activeObject.fontSize || 20);
        }
      }
    };

    canvas.on('selection:created', updateSelectedObject);
    canvas.on('selection:updated', updateSelectedObject);
    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
      setObjectType(null);
    });

    return () => {
      canvas.off('selection:created', updateSelectedObject);
      canvas.off('selection:updated', updateSelectedObject);
      canvas.off('selection:cleared');
    };
  }, [canvas]);

  // Update object properties
  const updateObject = (updates: UpdateableProperties) => {
    if (!selectedObject || !canvas) return;
    
    selectedObject.set(updates);
    canvas.renderAll();
  };

  return (
    <div className="w-[20rem] bg-gray-50 p-4 space-y-4">
      <div className="bg-white rounded-md shadow">
        <div className="flex items-center justify-between p-2 bg-gray-200 rounded-t-md">
          <span className="font-semibold">Zones</span>
          <button className="text-gray-600 hover:text-gray-800">
            <Plus size={20} />
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
          
          {/* Common Properties */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Rotation</label>
            <div className="flex items-center mt-1">
              <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ angle: rotation - 1 })}>-</button>
              <input
                type="number"
                value={rotation}
                onChange={(e) => updateObject({ angle: Number(e.target.value) })}
                className="w-full px-2 py-1 text-center border-t border-b"
              />
              <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ angle: rotation + 1 })}>+</button>
            </div>
          </div>

          {/* Position Controls */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Position X</label>
            <div className="flex items-center mt-1">
              <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ left: left - 1 })}>-</button>
              <input
                type="number"
                value={left}
                onChange={(e) => updateObject({ left: Number(e.target.value) })}
                className="w-full px-2 py-1 text-center border-t border-b"
              />
              <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ left: left + 1 })}>+</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position Y</label>
            <div className="flex items-center mt-1">
              <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ top: top - 1 })}>-</button>
              <input
                type="number"
                value={top}
                onChange={(e) => updateObject({ top: Number(e.target.value) })}
                className="w-full px-2 py-1 text-center border-t border-b"
              />
              <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ top: top + 1 })}>+</button>
            </div>
          </div>

          {/* Circle-specific controls */}
          {objectType === 'circle' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Radius</label>
              <div className="flex items-center mt-1">
                <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ radius: radius - 1 })}>-</button>
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => updateObject({ radius: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-center border-t border-b"
                />
                <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ radius: radius + 1 })}>+</button>
              </div>
            </div>
          )}

          {/* Rectangle-specific controls */}
          {objectType === 'rect' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Width</label>
                <div className="flex items-center mt-1">
                  <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ width: width - 1 })}>-</button>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => updateObject({ width: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-center border-t border-b"
                  />
                  <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ width: width + 1 })}>+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <div className="flex items-center mt-1">
                  <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ height: height - 1 })}>-</button>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => updateObject({ height: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-center border-t border-b"
                  />
                  <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ height: height + 1 })}>+</button>
                </div>
              </div>
            </>
          )}

          {/* Text-specific controls */}
          {objectType === 'i-text' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => updateObject({ text: e.target.value })}
                  className="mt-1 px-2 py-1 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                <div className="flex items-center mt-1">
                  <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ fontSize: fontSize - 1 })}>-</button>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => updateObject({ fontSize: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-center border-t border-b"
                  />
                  <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ fontSize: fontSize + 1 })}>+</button>
                </div>
              </div>
            </>
          )}

          {/* Color controls for all objects */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fill Color</label>
            <div className="flex items-center mt-1">
              <input
                type="color"
                value={fill === 'transparent' ? '#ffffff' : fill}
                onChange={(e) => updateObject({ fill: e.target.value })}
                className="w-8 h-8 rounded-md border"
              />
              <input
                type="text"
                value={fill === 'transparent' ? 'transparent' : fill.toUpperCase()}
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
                value={stroke}
                onChange={(e) => updateObject({ stroke: e.target.value })}
                className="w-8 h-8 rounded-md border"
              />
              <input
                type="text"
                value={stroke.toUpperCase()}
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
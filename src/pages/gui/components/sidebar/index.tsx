import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const Sidebar = () => {
  const [rotation, setRotation] = useState(0)
  const [radius, setRadius] = useState(24.76418786)
  const [color, setColor] = useState('#CCCCCC')
  const [borderColor, setBorderColor] = useState('#000000')
  const [text, setText] = useState('')
  const [textSize, setTextSize] = useState(16)
  const [textPositionX, setTextPositionX] = useState(0)
  const [textPositionY, setTextPositionY] = useState(0)
  const [textColor, setTextColor] = useState('#000000')

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

      <div className="bg-white rounded-md shadow p-4 space-y-4">
        <h3 className="font-semibold">Shape</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Rotation</label>
          <div className="flex items-center mt-1">
            <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => setRotation(r => r - 1)}>-</button>
            <input
              type="number"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full px-2 py-1 text-center border-t border-b"
            />
            <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => setRotation(r => r + 1)}>+</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Radius</label>
          <div className="flex items-center mt-1">
            <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => setRadius(r => r - 1)}>-</button>
            <input
              type="number"
              value={radius.toFixed(8)}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full px-2 py-1 text-center border-t border-b"
            />
            <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => setRadius(r => r + 1)}>+</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <div className="flex items-center mt-1">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-md border"
            />
            <input
              type="text"
              value={color.toUpperCase()}
              onChange={(e) => setColor(e.target.value)}
              className="ml-2 px-2 py-1 w-full border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Border</label>
          <div className="flex items-center mt-1">
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-8 h-8 rounded-md border"
            />
            <input
              type="text"
              value={borderColor.toUpperCase()}
              onChange={(e) => setBorderColor(e.target.value)}
              className="ml-2 px-2 py-1 w-full border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 px-2 py-1 w-full border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Text size</label>
          <div className="flex items-center mt-1">
            <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => setTextSize(s => s - 1)}>-</button>
            <input
              type="number"
              value={textSize}
              onChange={(e) => setTextSize(Number(e.target.value))}
              className="w-full px-2 py-1 text-center border-t border-b"
            />
            <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => setTextSize(s => s + 1)}>+</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Text position (x)</label>
          <div className="flex items-center mt-1">
            <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => setTextPositionX(x => x - 1)}>-</button>
            <input
              type="number"
              value={textPositionX}
              onChange={(e) => setTextPositionX(Number(e.target.value))}
              className="w-full px-2 py-1 text-center border-t border-b"
            />
            <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => setTextPositionX(x => x + 1)}>+</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Text position (y)</label>
          <div className="flex items-center mt-1">
            <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => setTextPositionY(y => y - 1)}>-</button>
            <input
              type="number"
              value={textPositionY}
              onChange={(e) => setTextPositionY(Number(e.target.value))}
              className="w-full px-2 py-1 text-center border-t border-b"
            />
            <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => setTextPositionY(y => y + 1)}>+</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Text color</label>
          <div className="flex items-center mt-1">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-8 rounded-md border"
            />
            <input
              type="text"
              value={textColor.toUpperCase()}
              onChange={(e) => setTextColor(e.target.value)}
              className="ml-2 px-2 py-1 w-full border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
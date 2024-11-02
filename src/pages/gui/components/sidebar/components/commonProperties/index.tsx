import { toFloat, PropertiesType } from '@/utils';

const CommonProperties = ({ properties: { angle=0, left=100, top=100 } }: { properties: Partial<PropertiesType>, updateObject }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-gray-700">Angle (&deg;)</label>
      <div className="flex items-center mt-1">
        <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ angle: toFloat(angle) - 1 })}>-</button>
        <input
          type="number"
          value={toFloat(angle)}
          onChange={(e) => updateObject({ angle: Number(e.target.value) })}
          className="w-full px-2 py-1 text-center border-t border-b shadow-sm"
        />
        <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ angle: toFloat(angle) + 1 })}>+</button>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Position X</label>
      <div className="flex items-center mt-1">
        <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ left: toFloat(left) - 1 })}>-</button>
        <input
          type="number"
          value={toFloat(left)}
          onChange={(e) => updateObject({ left: Number(e.target.value) })}
          className="w-full px-2 py-1 text-center border-t border-b shadow-sm"
        />
        <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ left: toFloat(left) + 1 })}>+</button>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Position Y</label>
      <div className="flex items-center mt-1">
        <button className="px-2 py-1 bg-gray-200 rounded-l-md" onClick={() => updateObject({ top: toFloat(top) - 1 })}>-</button>
        <input
          type="number"
          value={toFloat(top)}
          onChange={(e) => updateObject({ top: Number(e.target.value) })}
          className="w-full px-2 py-1 text-center border-t border-b shadow-sm"
        />
        <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ top: toFloat(top) + 1 })}>+</button>
      </div>
    </div>
  </>
);

export default CommonProperties;
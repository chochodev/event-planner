import { toFloat, PropertiesType } from '@/utils';
// import { toFloat } from '../utils';

interface Properties {
  text: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
}

interface TextPropertiesProps {
  properties: Properties;
  updateObject: (updates: Partial<Properties>) => void;
  Select: React.ComponentType<{
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (value: string) => void;
  }>;
}

const fontWeightOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
];

const fontFamilyOptions = [
  { value: 'sans-serif', label: 'Sans-serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'poppins', label: 'Poppins' },
];

const TextProperties: React.FC<TextPropertiesProps> = ({ properties, updateObject, Select }) => (
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
          className="w-full px-2 py-1 text-center border-t border-b shadow-sm"
        />
        <button className="px-2 py-1 bg-gray-200 rounded-r-md" onClick={() => updateObject({ fontSize: toFloat(properties.fontSize) + 1 })}>+</button>
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Font Weight</label>
      <Select
        options={fontWeightOptions}
        value={properties.fontWeight}
        onChange={(value) => updateObject({ fontWeight: value })}
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Font Family</label>
      <Select
        options={fontFamilyOptions}
        value={properties.fontFamily}
        onChange={(value) => updateObject({ fontFamily: value })}
      />
    </div>
  </>
);

export default TextProperties;
import React, { useState } from 'react';
import { useEventGuiStore } from '@/zustand/store';
import {
  FileIcon,
  FolderOpen,
  Save,
  MousePointer,
  Move,
  LayoutGrid,
  Layout,
  Plus,
  Grid2x2Plus,
  Undo,
  Redo,
  Scissors,
  Copy,
  Clipboard,
  Trash2,
  ZoomIn,
  ZoomOut,
  QrCode,
} from 'lucide-react'

const Toolbar: React.FC = () => {
  const { zoomLevel, setZoomLevel } = useEventGuiStore()

  return (
    <div className="sticky top-0 left-0 z-[200] flex items-center gap-1 w-full bg-white px-[1rem] py-[0.375rem] shadow">
      <Button icon={<FileIcon className="h-4 w-4" />} tooltip="New File" />
      <Button icon={<FolderOpen className="h-4 w-4" />} tooltip="Open File" />
      <Button icon={<Save className="h-4 w-4" />} tooltip="Save File" />
      <div className='flex-1' />
      <Button icon={<MousePointer className="h-4 w-4" />} tooltip="Select" />
      <Button icon={<Move className="h-4 w-4" />} tooltip="Move" />
      <Button icon={<LayoutGrid className="h-4 w-4" />} tooltip="Grid View" />
      <Button icon={<Layout className="h-4 w-4" />} tooltip="Layout View" />
      <Separator />
      <Button icon={<Plus className="h-4 w-4" />} tooltip="Add Seat" />
      <Button icon={<Grid2x2Plus className="h-4 w-4" />} tooltip="Add Rows" />
      <Separator />
      <Button icon={<Undo className="h-4 w-4" />} tooltip="Undo" />
      <Button icon={<Redo className="h-4 w-4" />} tooltip="Redo" />
      <Separator />
      <Button icon={<Scissors className="h-4 w-4" />} tooltip="Cut" />
      <Button icon={<Copy className="h-4 w-4" />} tooltip="Copy" />
      <Button icon={<Clipboard className="h-4 w-4" />} tooltip="Paste" />
      <Button icon={<Trash2 className="h-4 w-4" />} tooltip="Delete" />
      <Separator />
      <Button icon={<ZoomOut className="h-4 w-4" />} tooltip="Zoom Out" onClick={() => setZoomLevel(zoomLevel - 10)} />
      <div className="flex items-center justify-center w-12 h-8 text-sm font-medium">
        {zoomLevel}%
      </div>
      <Button icon={<ZoomIn className="h-4 w-4" />} tooltip="Zoom In" onClick={() => setZoomLevel(zoomLevel + 10)} />
      <div className='flex-1' />
      <Button icon={<QrCode className="h-4 w-4" />} tooltip="QR Code" />
    </div>
  )
}

export default Toolbar
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  tooltip: string
}

const Button: React.FC<ButtonProps> = ({ icon, tooltip, ...props }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <button
        className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ease-250"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        {...props}
      >
        {icon}
      </button>
      
      <div 
        className={`absolute left-1/2 transform -translate-x-1/2 ${showTooltip? 'top-[calc(100%+0.5rem)] opacity-100' : 'top-[100%] opacity-0'} px-2 py-1 bg-gray-200 text-gray-900 text-[0.625rem] rounded whitespace-nowrap shadow-md ease-250`}
      >
        {tooltip}
      </div>
    </div>
  )
}

const Separator: React.FC = () => (
  <div className="w-px h-6 bg-gray-300 mx-[1rem] " />
)

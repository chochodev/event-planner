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
} from 'lucide-react';

const Toolbar: React.FC = () => {
  const { 
    zoomLevel, 
    setZoomLevel,
    toolMode,
    setToolMode
  } = useEventGuiStore();

  // ::::::::::::::::::: Function: toggle create multiple seats mode
  const toggleMultipleSeatMode = () => {
    setToolMode(toolMode === 'select'? 'multiple-seat' : 'select');
  };

  // ::::::::::::::::::: Buttons data
  const buttonGroups = [
    { icon: FileIcon, tooltip: "New File", onClick: () => {}, state: false },
    { icon: FolderOpen, tooltip: "Open File", onClick: () => {}, state: false },
    { icon: Save, tooltip: "Save File", onClick: () => {}, state: false },
    { icon: MousePointer, tooltip: "Select", onClick: () => {}, state: false },
    { icon: Move, tooltip: "Move", onClick: () => {}, state: false },
    { icon: LayoutGrid, tooltip: "Grid View", onClick: () => {}, state: false },
    { icon: Layout, tooltip: "Layout View", onClick: () => {}, state: false },
    { icon: Plus, tooltip: "Add Seat", onClick: () => {}, state: false },
    { 
      icon: Grid2x2Plus, 
      tooltip: "Add Rows", 
      onClick: toggleMultipleSeatMode, 
      state: toolMode === 'multiple-seat'
    },
    { icon: Undo, tooltip: "Undo", onClick: () => {}, state: false },
    { icon: Redo, tooltip: "Redo", onClick: () => {}, state: false },
    { icon: Scissors, tooltip: "Cut", onClick: () => {}, state: false },
    { icon: Copy, tooltip: "Copy", onClick: () => {}, state: false },
    { icon: Clipboard, tooltip: "Paste", onClick: () => {}, state: false },
    { icon: Trash2, tooltip: "Delete", onClick: () => {}, state: false },
  ];
  
  

  return (
    <div 
      className="sticky top-0 left-0 z-[200] flex items-center gap-1 w-full bg-white px-[1rem] py-[0.5rem] shadow"
    >
      {buttonGroups.map((item, index) => (
        <>
          {/* :::::::::::::: add seperator */}
          {[7,9,11].includes(index)  && <Separator />}

          {/* :::::::::::::: add space */}
          {3 === index && 
            <div className='flex-1' />
          }
          
          {/* ::::::::::::::: buttons */}
          <Button
            key={index}
            icon={<item.icon className="h-4 w-4" />}
            tooltip={item.tooltip}
            onClick={item.onClick}
            state={item.state}
          />
        </>
      ))}
      
      {/* :::::::::::::: add seperator */}
      <Separator />

      {/* :::::::::::::: zoom button */}
      <Button 
        icon={
          <ZoomOut className="h-4 w-4" />
        } 
        tooltip="Zoom Out" 
        onClick={() => setZoomLevel(zoomLevel - 10)}
      />
        <div className="flex items-center justify-center w-12 h-8 text-sm font-medium">
          {zoomLevel}%
        </div>
      <Button 
        icon={
          <ZoomIn className="h-4 w-4" />
        } 
        tooltip="Zoom In" onClick={() => setZoomLevel(zoomLevel + 10)} 
      />

      {/* ::::::::::::::: add space */}
      <div className='flex-1' />

      {/* ::::::::::::::: qr code button */}
      <Button 
        icon={
          <QrCode className="h-4 w-4" />
        } 
        tooltip="QR Code" 
      />
    </div>
  )
}

export default Toolbar
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  tooltip: string
  state?: boolean
}

const Button: React.FC<ButtonProps> = ({ icon, tooltip, ...props }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <button
        className={`p-2 rounded-md hover:bg-gray-200/60 ${props.state? 'ring-1 ring-gray-500 shadow-md shadow-gray-400' : '' } ease-250`}
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

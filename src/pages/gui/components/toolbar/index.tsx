import React from 'react'
import {
  File,
  FolderOpen,
  Save,
  MousePointer,
  Move,
  Grid,
  LayoutGrid,
  RotateCcw,
  RotateCw,
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
// import {  } from "../button"
import { Button, Divider } from "@mui/material"

export default function Toolbar() {
  return (
    <div className="flex items-center gap-1 bg-white p-1 shadow">
      <Button variant="ghost" size="icon">
        <File className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <FolderOpen className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Save className="h-4 w-4" />
      </Button>
      <Divider orientation="vertical" className="mx-1 h-6" />
      <Button variant="ghost" size="icon">
        <MousePointer className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Move className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Grid className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Divider orientation="vertical" className="mx-1 h-6" />
      <Button variant="ghost" size="icon">
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <RotateCw className="h-4 w-4" />
      </Button>
      <Divider orientation="vertical" className="mx-1 h-6" />
      <Button variant="ghost" size="icon">
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Redo className="h-4 w-4" />
      </Button>
      <Divider orientation="vertical" className="mx-1 h-6" />
      <Button variant="ghost" size="icon">
        <Scissors className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Clipboard className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Divider orientation="vertical" className="mx-1 h-6" />
      <Button variant="ghost" size="icon">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <div className="flex items-center justify-center w-12 h-8 text-sm font-medium">
        78%
      </div>
      <Button variant="ghost" size="icon">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Divider orientation="vertical" className="mx-1 h-6" />
      <Button variant="ghost" size="icon">
        <QrCode className="h-4 w-4" />
      </Button>
    </div>
  )
}
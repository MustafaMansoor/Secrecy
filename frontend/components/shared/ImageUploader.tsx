"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileImage, Upload } from "lucide-react"

interface ImageUploaderProps {
  selectedImage: File | null
  selectedImageUrl: string | null
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

export default function ImageUploader({ selectedImage, selectedImageUrl, onImageChange, label }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={triggerFileInput}
      >
        <input type="file" ref={fileInputRef} accept="image/*" onChange={onImageChange} className="hidden" />
        {selectedImageUrl ? (
          <div className="w-full">
            <img
              src={selectedImageUrl || "/placeholder.svg"}
              alt="Selected"
              className="max-h-64 mx-auto object-contain rounded-md mb-2"
            />
            <p className="text-sm text-center text-gray-500 mt-2">{selectedImage?.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FileImage className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">{label || "Click to select an image or drag and drop"}</p>
          </div>
        )}
      </div>
      {selectedImageUrl && (
        <Button variant="outline" onClick={triggerFileInput} className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          Change Image
        </Button>
      )}
    </div>
  )
}

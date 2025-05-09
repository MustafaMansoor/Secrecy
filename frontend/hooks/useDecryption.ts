"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { decryptService } from "@/services/decryptService"

export function useDecryption() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const [decryptedText, setDecryptedText] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setSelectedImageUrl(URL.createObjectURL(file))
      setError(null)
      setDecryptedText("")
    }
  }

  const handleDecrypt = async () => {
    if (!selectedImage) {
      setError("Please select an image first")
      return
    }

    console.log('Decode button clicked!', {
      imageName: selectedImage.name,
      imageSize: selectedImage.size
    })

    setIsLoading(true)
    setError(null)

    try {
      // Call the service to handle the decryption
      const result = await decryptService.decryptImageToText(selectedImage)
      setDecryptedText(result.decryptedText)
    } catch (err) {
      setError("Failed to decrypt the image. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decryptedText)
    toast({
      title: "Copied to clipboard",
      description: "The decrypted text has been copied to your clipboard.",
    })
  }

  return {
    selectedImage,
    selectedImageUrl,
    decryptedText,
    isLoading,
    error,
    fileInputRef,
    handleImageChange,
    handleDecrypt,
    copyToClipboard,
  }
}

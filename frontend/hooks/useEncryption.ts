"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { encryptService } from "@/services/encryptService"

export function useEncryption() {
  const [text, setText] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const [encryptedImageUrl, setEncryptedImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setSelectedImageUrl(URL.createObjectURL(file))
      setError(null)
    }
  }

  const handleEncrypt = async () => {
    if (!selectedImage) {
      setError("Please select an image first")
      return
    }

    if (!text.trim()) {
      setError("Please enter some text to encrypt")
      return
    }

    console.log('Encode button clicked!', {
      imageName: selectedImage.name,
      imageSize: selectedImage.size,
      textLength: text.length,
      text: text
    })

    setIsLoading(true)
    setError(null)

    try {
      // Call the service to handle the encryption
      const result = await encryptService.encryptTextInImage(selectedImage, text)
      setEncryptedImageUrl(result.encryptedImageUrl)
    } catch (err) {
      setError("Failed to encrypt the text into the image. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (encryptedImageUrl) {
      const a = document.createElement("a")
      a.href = encryptedImageUrl
      a.download = "encrypted-image.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return {
    text,
    setText,
    selectedImage,
    selectedImageUrl,
    encryptedImageUrl,
    isLoading,
    error,
    fileInputRef,
    handleImageChange,
    handleEncrypt,
    handleDownload,
  }
}

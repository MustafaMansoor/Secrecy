"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ImageUploader from "@/components/shared/ImageUploader"
import DecryptedTextDisplay from "@/components/decrypt/DecryptedTextDisplay"
import { useDecryption } from "@/hooks/useDecryption"

export default function DecryptPage() {
  const {
    selectedImage,
    selectedImageUrl,
    decryptedText,
    isLoading,
    error,
    handleImageChange,
    handleDecrypt,
    copyToClipboard,
  } = useDecryption()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Decrypt Image to Text</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Upload an image containing hidden text</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploader
              selectedImage={selectedImage}
              selectedImageUrl={selectedImageUrl}
              onImageChange={handleImageChange}
              label="Upload encrypted image"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleDecrypt} disabled={isLoading || !selectedImage} className="w-full">
              {isLoading ? "Decrypting..." : "Decrypt Image to Text"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>The decrypted text will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <DecryptedTextDisplay decryptedText={decryptedText} isLoading={isLoading} />
          </CardContent>
          <CardFooter>
            <Button
              onClick={copyToClipboard}
              disabled={!decryptedText}
              className="w-full"
              variant={decryptedText ? "default" : "outline"}
            >
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

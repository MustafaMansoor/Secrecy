"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ImageUploader from "@/components/shared/ImageUploader"
import TextInput from "@/components/encrypt/TextInput"
import EncryptedImageDisplay from "@/components/encrypt/EncryptedImageDisplay"
import { useEncryption } from "@/hooks/useEncryption"

export default function EncryptPage() {
  const {
    text,
    setText,
    selectedImage,
    selectedImageUrl,
    encryptedImageUrl,
    isLoading,
    error,
    handleImageChange,
    handleEncrypt,
    handleDownload,
  } = useEncryption()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Encrypt Text into Image</h1>

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
            <CardDescription>Upload an image and enter the text you want to encrypt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ImageUploader
                selectedImage={selectedImage}
                selectedImageUrl={selectedImageUrl}
                onImageChange={handleImageChange}
                label="Upload carrier image"
              />
              <TextInput text={text} onTextChange={setText} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleEncrypt} disabled={isLoading || !selectedImage || !text.trim()} className="w-full">
              {isLoading ? "Encrypting..." : "Encrypt Text into Image"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>The encrypted image will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <EncryptedImageDisplay encryptedImageUrl={encryptedImageUrl} isLoading={isLoading} />
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleDownload}
              disabled={!encryptedImageUrl}
              className="w-full"
              variant={encryptedImageUrl ? "default" : "outline"}
            >
              Download Encrypted Image
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

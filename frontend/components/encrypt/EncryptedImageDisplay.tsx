import { FileImage } from "lucide-react"

interface EncryptedImageDisplayProps {
  encryptedImageUrl: string | null
  isLoading: boolean
}

export default function EncryptedImageDisplay({ encryptedImageUrl, isLoading }: EncryptedImageDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-6 min-h-64">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-sm text-gray-500">Processing your image...</p>
        </div>
      ) : encryptedImageUrl ? (
        <img
          src={encryptedImageUrl || "/placeholder.svg"}
          alt="Encrypted"
          className="max-h-64 object-contain rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <FileImage className="h-12 w-12 mb-2" />
          <p className="text-sm text-gray-500">Encrypted image will appear here</p>
        </div>
      )}
    </div>
  )
}

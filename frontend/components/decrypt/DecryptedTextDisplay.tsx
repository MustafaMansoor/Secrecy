interface DecryptedTextDisplayProps {
  decryptedText: string
  isLoading: boolean
}

export default function DecryptedTextDisplay({ decryptedText, isLoading }: DecryptedTextDisplayProps) {
  return (
    <div className="border rounded-md p-4 min-h-64 bg-muted/50">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-sm text-gray-500">Decrypting your image...</p>
        </div>
      ) : decryptedText ? (
        <div className="whitespace-pre-wrap">{decryptedText}</div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <p className="text-sm text-gray-500">Decrypted text will appear here</p>
        </div>
      )}
    </div>
  )
}

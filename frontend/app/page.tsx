import { FileImage, FileText, Lock, Unlock } from "lucide-react"
import HomeFeatureCard from "@/components/home/HomeFeatureCard"

export default function HomePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Image Steganography Tool</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hide your secret messages within images using steganography techniques. Encrypt text into images and decrypt
          images back to text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <HomeFeatureCard
          title="Encrypt"
          description="Hide your secret text within an image"
          icon={<Lock className="mr-2 h-5 w-5" />}
          linkHref="/encrypt"
          linkText="Go to Encrypt"
          steps={[
            { icon: <FileText className="h-16 w-16 text-muted-foreground" /> },
            { icon: <span className="text-2xl">+</span> },
            { icon: <FileImage className="h-16 w-16 text-muted-foreground" /> },
            { icon: <span className="text-2xl">↓</span> },
            {
              icon: (
                <div className="relative">
                  <FileImage className="h-16 w-16 text-muted-foreground" />
                  <Lock className="h-6 w-6 absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1" />
                </div>
              ),
            },
          ]}
        />

        <HomeFeatureCard
          title="Decrypt"
          description="Extract hidden text from an encrypted image"
          icon={<Unlock className="mr-2 h-5 w-5" />}
          linkHref="/decrypt"
          linkText="Go to Decrypt"
          steps={[
            {
              icon: (
                <div className="relative">
                  <FileImage className="h-16 w-16 text-muted-foreground" />
                  <Lock className="h-6 w-6 absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1" />
                </div>
              ),
            },
            { icon: <span className="text-2xl">↓</span> },
            { icon: <FileText className="h-16 w-16 text-muted-foreground" /> },
          ]}
        />
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground mb-6">
          Steganography is the practice of concealing information within other non-secret data or a physical object. In
          this application, we use image steganography to hide text messages within images by subtly modifying pixel
          values in ways that are imperceptible to the human eye.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">1. Select an Image</h3>
            <p className="text-sm text-muted-foreground">
              Upload any image to use as your carrier file. The higher the resolution, the more text it can hide.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">2. Enter Your Message</h3>
            <p className="text-sm text-muted-foreground">Type the secret text you want to hide within the image.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">3. Encrypt & Share</h3>
            <p className="text-sm text-muted-foreground">
              The system will embed your text into the image. Download and share it securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl">
          SteganoTool
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/encrypt">
            <Button variant="ghost">Encrypt</Button>
          </Link>
          <Link href="/decrypt">
            <Button variant="ghost">Decrypt</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

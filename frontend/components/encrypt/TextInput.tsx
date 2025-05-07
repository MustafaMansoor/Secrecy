"use client"

import type React from "react"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TextInputProps {
  text: string
  onTextChange: (text: string) => void
}

export default function TextInput({ text, onTextChange }: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value)
  }

  return (
    <Tabs defaultValue="text" className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="text">Secret Text</TabsTrigger>
      </TabsList>
      <TabsContent value="text">
        <div className="space-y-2">
          <Label htmlFor="message">Message to Encrypt</Label>
          <Textarea
            id="message"
            placeholder="Enter the secret text you want to hide in the image..."
            value={text}
            onChange={handleChange}
            className="min-h-32"
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

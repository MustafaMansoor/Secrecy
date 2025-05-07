import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Step {
  icon: ReactNode
}

interface HomeFeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  linkHref: string
  linkText: string
  steps: Step[]
}

export default function HomeFeatureCard({ title, description, icon, linkHref, linkText, steps }: HomeFeatureCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col items-center space-y-4 py-4">
          {steps.map((step, index) => (
            <div key={index}>{step.icon}</div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={linkHref}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

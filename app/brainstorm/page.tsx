"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, X } from "lucide-react"

const categories = [
  { name: "DIALOGUE", icon: "💬" },
  { name: "CHARACTERS", icon: "👥" },
  { name: "WORLD BUILDING", icon: "🏰" },
  { name: "PLOT POINTS", icon: "📝" },
  { name: "NAMES", icon: "📛" },
  { name: "PLACES", icon: "🗺️" },
  { name: "OBJECTS", icon: "🔍" },
  { name: "DESCRIPTIONS", icon: "📖" },
  { name: "ARTICLE IDEAS", icon: "📰" },
  { name: "TWEETS", icon: "🐦" },
  { name: "SOMETHING ELSE", icon: "✨" },
]

export default function BrainstormPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-center">What do you want to brainstorm?</h1>
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push("/brainstorm/kickstart")}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


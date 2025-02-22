"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { ArrowLeft, Lightbulb, RefreshCw, X } from "lucide-react"

export default function KickstartPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.push("/brainstorm")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-center">Kickstart your Brainstorm</h1>
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Give me a list of:</h2>
              <div className="flex gap-2">
                <Input placeholder="What kind of ideas are you looking for?" className="flex-1" />
                <Button size="icon" variant="ghost">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Context (optional)</h2>
              <Textarea placeholder="Add any relevant context..." />
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Examples (optional)</h2>
              <Textarea placeholder="Add example ideas..." />
              <Button variant="outline" className="mt-2">
                + Add Another
              </Button>
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={() => router.push("/brainstorm/results")}>
                Start
              </Button>
            </div>
          </div>

          <div className="col-span-1">
            <Card className="p-6 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-6 w-6" />
                <h3 className="text-lg font-medium">Pro Tip</h3>
              </div>
              <p className="text-sm mb-4">
                Brainstorm can make lists of anything! Like features for an app, headlines for an article, or plot
                points in a mystery thriller.
              </p>
              <Button variant="secondary" className="w-full">
                Gotcha
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Textarea } from "../components/ui/textarea"
import { useRouter } from "next/navigation"
import {
  Bold,
  ImportIcon as FileImport,
  History,
  Italic,
  List,                                                                                                                                                                                                                                                                                                                     
  Plus,
  Redo,
  Search,
  Settings,
  Star,
  Underline,
  Undo,

  
} from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 border-r p-4 flex flex-col">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
            <Button variant="outline" size="sm">
              <FileImport className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Story Bible</span>
              <Switch />
            </div>
            <div className="space-y-2">
              {["Braindump", "Genre", "Style", "Synopsis", "Characters", "Worldbuilding", "Outline"].map((item) => (
                <div key={item} className="px-3 py-1.5 text-sm hover:bg-accent rounded-md cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Write
            </Button>
            <Button variant="ghost" size="sm">
              Rewrite
            </Button>
            <Button variant="ghost" size="sm">
              Describe
            </Button>
            <Button variant="ghost" size="sm" onClick={() => router.push("/brainstorm")}>
              Brainstorm
            </Button>
            <Button variant="ghost" size="sm">
              Plugins
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Words: 0</span>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="mb-4 flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Textarea placeholder="Type here..." className="min-h-[500px] resize-none" />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 border-l p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">History</span>
          <Button variant="ghost" size="icon">
            <History className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Join the Community!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn from our friendly community of AI-assisted writers.
            </p>
            <Button className="w-full">Join</Button>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-2">Attend a live class</h3>
            <p className="text-sm text-muted-foreground mb-4">Get answers to your questions from AI writing experts.</p>
            <Button variant="outline" className="w-full">
              Sign up
            </Button>
          </Card>

          <div className="flex space-x-2">
            <Button className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Support
            </Button>
            <Button variant="secondary" className="flex-1">
              <Star className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


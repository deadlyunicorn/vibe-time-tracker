"use client"

import { useState, useEffect } from "react"
import { Plus, Clock, Calendar, BarChart3, Edit2, Trash2, Play, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface TimeEntry {
  id: string
  project: string
  topic: string
  startTime: string
  endTime: string
  date: string
  duration: number // in minutes
  description?: string
}

interface ActiveTimer {
  project: string
  topic: string
  startTime: string
  description?: string
}

export default function TimeTracker() {
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null)

  // Form states
  const [project, setProject] = useState("")
  const [topic, setTopic] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [description, setDescription] = useState("")

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("timeEntries")
    const savedTimer = localStorage.getItem("activeTimer")

    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }

    if (savedTimer) {
      setActiveTimer(JSON.parse(savedTimer))
    }
  }, [])

  // Save to localStorage whenever entries or activeTimer changes
  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    if (activeTimer) {
      localStorage.setItem("activeTimer", JSON.stringify(activeTimer))
    } else {
      localStorage.removeItem("activeTimer")
    }
  }, [activeTimer])

  const calculateDuration = (start: string, end: string): number => {
    const startDate = new Date(`2000-01-01T${start}`)
    const endDate = new Date(`2000-01-01T${end}`)
    return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))
  }

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const startTimer = () => {
    if (!project || !topic) return

    const now = new Date()
    const timeString = now.toTimeString().slice(0, 5)

    setActiveTimer({
      project,
      topic,
      startTime: timeString,
      description,
    })

    // Clear form
    setProject("")
    setTopic("")
    setDescription("")
  }

  const stopTimer = () => {
    if (!activeTimer) return

    const now = new Date()
    const endTimeString = now.toTimeString().slice(0, 5)
    const duration = calculateDuration(activeTimer.startTime, endTimeString)

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      project: activeTimer.project,
      topic: activeTimer.topic,
      startTime: activeTimer.startTime,
      endTime: endTimeString,
      date: selectedDate,
      duration,
      description: activeTimer.description,
    }

    setEntries((prev) => [...prev, newEntry])
    setActiveTimer(null)
  }

  const addEntry = () => {
    if (!project || !topic || !startTime || !endTime) return

    const duration = calculateDuration(startTime, endTime)

    if (editingEntry) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingEntry.id
            ? { ...entry, project, topic, startTime, endTime, duration, description }
            : entry,
        ),
      )
      setEditingEntry(null)
    } else {
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        project,
        topic,
        startTime,
        endTime,
        date: selectedDate,
        duration,
        description,
      }
      setEntries((prev) => [...prev, newEntry])
    }

    // Reset form
    setProject("")
    setTopic("")
    setStartTime("")
    setEndTime("")
    setDescription("")
    setIsAddDialogOpen(false)
  }

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const editEntry = (entry: TimeEntry) => {
    setEditingEntry(entry)
    setProject(entry.project)
    setTopic(entry.topic)
    setStartTime(entry.startTime)
    setEndTime(entry.endTime)
    setDescription(entry.description || "")
    setIsAddDialogOpen(true)
  }

  const todayEntries = entries.filter((entry) => entry.date === selectedDate)
  const allProjects = [...new Set(entries.map((entry) => entry.project))]
  const allTopics = [...new Set(entries.map((entry) => entry.topic))]

  const projectSummary = entries.reduce(
    (acc, entry) => {
      acc[entry.project] = (acc[entry.project] || 0) + entry.duration
      return acc
    },
    {} as Record<string, number>,
  )

  const topicSummary = entries.reduce(
    (acc, entry) => {
      acc[entry.topic] = (acc[entry.topic] || 0) + entry.duration
      return acc
    },
    {} as Record<string, number>,
  )

  const totalTimeToday = todayEntries.reduce((sum, entry) => sum + entry.duration, 0)

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Time Tracker</h1>
          <p className="text-muted-foreground">Track your time across projects and topics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>
      </div>

      {/* Active Timer */}
      {activeTimer && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium">Timer Running</span>
                </div>
                <Badge variant="secondary">{activeTimer.project}</Badge>
                <Badge variant="outline">{activeTimer.topic}</Badge>
                <span className="text-sm text-muted-foreground">Started at {activeTimer.startTime}</span>
              </div>
              <Button onClick={stopTimer} variant="destructive" size="sm">
                <Square className="w-4 h-4 mr-2" />
                Stop Timer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Timer Start */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Quick Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="quick-project">Project</Label>
              <Input
                id="quick-project"
                placeholder="Enter project name"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                list="projects"
              />
              <datalist id="projects">
                {allProjects.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </div>
            <div>
              <Label htmlFor="quick-topic">Topic</Label>
              <Input
                id="quick-topic"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                list="topics"
              />
              <datalist id="topics">
                {allTopics.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </div>
            <div>
              <Label htmlFor="quick-description">Description (optional)</Label>
              <Input
                id="quick-description"
                placeholder="What are you working on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={startTimer} disabled={!project || !topic || !!activeTimer} className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Start Timer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Today's Entries</h2>
              <p className="text-sm text-muted-foreground">Total time: {formatDuration(totalTimeToday)}</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingEntry ? "Edit Entry" : "Add Time Entry"}</DialogTitle>
                  <DialogDescription>
                    {editingEntry ? "Update the time entry details." : "Add a new time entry for today."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project">Project</Label>
                      <Input
                        id="project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        list="projects"
                      />
                    </div>
                    <div>
                      <Label htmlFor="topic">Topic</Label>
                      <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} list="topics" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time">End Time</Label>
                      <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What did you work on?"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addEntry}>{editingEntry ? "Update Entry" : "Add Entry"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {todayEntries.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No time entries for today</p>
                  <p className="text-sm text-muted-foreground">Start a timer or add an entry manually</p>
                </CardContent>
              </Card>
            ) : (
              todayEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary">{entry.project}</Badge>
                            <Badge variant="outline">{entry.topic}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              {entry.startTime} - {entry.endTime}
                            </span>
                            <span className="font-medium">{formatDuration(entry.duration)}</span>
                          </div>
                          {entry.description && <p className="text-sm mt-1">{entry.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => editEntry(entry)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteEntry(entry.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Time by Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(projectSummary).map(([project, duration]) => (
                    <div key={project} className="flex items-center justify-between">
                      <span className="font-medium">{project}</span>
                      <span className="text-muted-foreground">{formatDuration(duration)}</span>
                    </div>
                  ))}
                  {Object.keys(projectSummary).length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Time by Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(topicSummary).map(([topic, duration]) => (
                    <div key={topic} className="flex items-center justify-between">
                      <span className="font-medium">{topic}</span>
                      <span className="text-muted-foreground">{formatDuration(duration)}</span>
                    </div>
                  ))}
                  {Object.keys(topicSummary).length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

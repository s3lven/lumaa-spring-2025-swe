"use client"

import { useState } from "react"
import { Pencil, Trash2, X, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "@/types"

interface TaskItemProps {
  task: Task
  onUpdate: (updates: Partial<Task>) => void
  onDelete: () => void
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description || "")
  const [showDescription, setShowDescription] = useState(false)

  const handleSave = () => {
    if (editedTitle.trim() !== "") {
      onUpdate({
        title: editedTitle,
        description: editedDescription.trim() || undefined,
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedTitle(task.title)
    setEditedDescription(task.description || "")
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-2 p-3 border rounded-lg bg-card">
      <div className="flex items-center gap-2">
        <Checkbox checked={task.completed} onCheckedChange={(checked) => onUpdate({ completed: checked as boolean })} />
        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="flex-1" />
            <Button size="icon" variant="ghost" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.title}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowDescription(!showDescription)}
              className={task.description ? "opacity-100" : "opacity-50"}
            >
              {showDescription ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      {(showDescription || isEditing) && (
        <div className="pl-6 mt-1">
          {isEditing ? (
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Add a description (optional)"
              rows={3}
            />
          ) : task.description ? (
            <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>
              {task.description}
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}


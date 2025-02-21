"use client";

import type React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTask } from "@/api/task-api";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
      setShowDescription(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createTaskMutation.mutate({
        title,
        description: description.trim() || undefined,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          required
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        <Button type="submit" disabled={createTaskMutation.isPending}>
          <Plus className="h-4 w-4 mr-2" />
          {createTaskMutation.isPending ? "Adding..." : "Add Task"}
        </Button>
      </div>
      {showDescription && (
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          className="mt-2"
          rows={3}
        />
      )}
    </form>
  );
}

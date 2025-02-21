"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TaskItem from "./task-item";
import TaskForm from "./task-form";
import { deleteTask, getTasks, updateTask } from "@/api/task-api";
import { Task } from "@/types";

export default function TaskList() {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load tasks</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <TaskForm />
      <div className="space-y-2">
        {tasks?.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={(updates) =>
              updateTaskMutation.mutate({ id: task.id, ...updates })
            }
            onDelete={() => deleteTaskMutation.mutate(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

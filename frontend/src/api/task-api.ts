import { getToken, removeToken } from "@/lib/auth";
import { Task, TaskPool } from "@/types";

const API_URL = "/api/tasks";

interface APIResponse<T> {
  message: string;
  payload: T;
}

export const addTask = async (formData: {
  title: string;
  description?: string;
}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthenticated access
      removeToken();
    }
    throw new Error("Failed to create task");
  }
  const responseData: APIResponse<Task> = await response.json();
  return responseData;
};

export const getTasks = async () => {
  const token = getToken();

  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthenticated access
      removeToken();
    }
    throw new Error("Failed to fetch tasks");
  }
  const responseData: APIResponse<TaskPool[]> = await response.json();
  const applicationData: Task[] = responseData.payload.map((task) => ({
    id: task.id,
    title: task.title,
    isComplete: task.is_complete,
    description: task.description || "",
  }));
  return applicationData;
};

export const updateTask = async ({
  id,
  ...updates
}: Partial<Task> & { id: string }) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthenticated access
      removeToken();
    }
    throw new Error("Failed to update task");
  }
  return await response.json();
};

export const deleteTask = async (id: string) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthenticated access
      removeToken();
    }
    throw new Error("Failed to delete task");
  }
};

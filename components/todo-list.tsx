"use client"

import { useState } from "react"
import { TodoInput } from "@/components/todo-input"
import { TodoItem, type Todo } from "@/components/todo-item"
import { TodoFilters, type Filter } from "@/components/todo-filters"

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>("all")

  function addTodo(text: string) {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, completed: false },
      ...prev,
    ])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function editTodo(id: string, text: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text } : t))
    )
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed
    if (filter === "completed") return t.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="flex flex-col gap-6">
      <TodoInput onAdd={addTodo} />

      {todos.length > 0 && (
        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          totalCount={todos.length}
        />
      )}

      <div className="flex flex-col gap-2" role="list" aria-label="Todo list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} role="listitem">
            <TodoItem
              todo={todo}
              onToggle={toggleTodo}
              onEdit={editTodo}
              onDelete={deleteTodo}
            />
          </div>
        ))}
      </div>

      {todos.length > 0 && filteredTodos.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {filter === "active"
            ? "All tasks are completed. Nice work!"
            : "No completed tasks yet."}
        </p>
      )}

      {todos.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No tasks yet. Add one above to get started.
        </p>
      )}
    </div>
  )
}

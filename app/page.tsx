import { TodoList } from "@/components/todo-list"

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center font-sans">
      <main className="flex w-full max-w-xl flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Tasks
          </h1>
          <p className="text-sm text-muted-foreground">
            Organize your day, one task at a time.
          </p>
        </header>
        <TodoList />
      </main>
    </div>
  )
}

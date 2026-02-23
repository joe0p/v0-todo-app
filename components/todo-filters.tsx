"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Filter = "all" | "active" | "completed"

interface TodoFiltersProps {
  filter: Filter
  onFilterChange: (filter: Filter) => void
  activeCount: number
  completedCount: number
  totalCount: number
}

export function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  totalCount,
}: TodoFiltersProps) {
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: `All (${totalCount})` },
    { value: "active", label: `Active (${activeCount})` },
    { value: "completed", label: `Done (${completedCount})` },
  ]

  return (
    <div className="flex items-center gap-1" role="tablist" aria-label="Filter todos">
      {filters.map(({ value, label }) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          role="tab"
          aria-selected={filter === value}
          onClick={() => onFilterChange(value)}
          className={cn(
            "text-sm text-muted-foreground",
            filter === value && "bg-secondary text-secondary-foreground"
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

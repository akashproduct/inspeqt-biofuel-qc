export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-700"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
} 
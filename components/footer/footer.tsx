"use client"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-center text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          © 2024 Inspeqt Biofuel ·{" "}
          <span className="flex items-center gap-1">
            Powered by{" "}
            <span className="text-purple-600 font-medium hover:text-purple-700 cursor-pointer">
              AgNext
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
} 
"use client"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © 2024 Perfeqt Biofuel ·{" "}
          <a href="#" className="underline underline-offset-4">
            Terms
          </a>{" "}
          ·{" "}
          <a href="#" className="underline underline-offset-4">
            Privacy
          </a>
        </p>
      </div>
    </footer>
  )
} 
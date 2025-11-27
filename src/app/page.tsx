import { PomodoroTimer } from "@/components/pomodoro-timer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold text-foreground">FocusFlow</h1>
        <ThemeToggle />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <PomodoroTimer />
      </main>
      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-muted-foreground z-10">
        <p>Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">Spacebar</span>
          </kbd> to start or pause the timer.</p>
      </footer>
    </div>
  );
}

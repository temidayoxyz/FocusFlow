"use client";

import { useEffect } from "react";
import { useTimer } from "@/hooks/use-timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export function PomodoroTimer() {
  const {
    timeRemaining,
    mode,
    isActive,
    sessionsCompleted,
    startPause,
    reset,
  } = useTimer();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        startPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startPause]);

  return (
    <Card className="w-full max-w-md border-2 shadow-lg bg-card/80 backdrop-blur-sm transition-all duration-300">
      <CardHeader className="items-center text-center">
        <CardTitle className="text-2xl font-bold tracking-wider uppercase">
          {mode === "work" ? "Focus Session" : "Take a Break"}
        </CardTitle>
        <div className="flex items-center gap-2 pt-2">
            <Badge variant="secondary" className="text-sm">
                Session: {sessionsCompleted}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-8">
        <div className="relative flex items-center justify-center">
            <p className="font-headline text-8xl md:text-9xl font-bold tabular-nums text-foreground">
                {formatTime(timeRemaining)}
            </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="w-36"
            onClick={startPause}
            aria-label={isActive ? "Pause timer" : "Start timer"}
          >
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={reset}
            aria-label="Reset timer"
          >
            <RefreshCw />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

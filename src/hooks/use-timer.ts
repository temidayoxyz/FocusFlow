"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

type TimerMode = 'work' | 'break';

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeRemaining, setTimeRemaining] = useState(WORK_MINUTES * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const synth = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    if (!synth.current) {
        synth.current = new Tone.Synth().toDestination();
    }
  }, []);

  const playSound = useCallback(() => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
    synth.current?.triggerAttackRelease("C4", "8n");
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      playSound();
      if (mode === 'work') {
        setSessionsCompleted(prev => prev + 1);
        setMode('break');
        setTimeRemaining(BREAK_MINUTES * 60);
        // Autostart break
      } else { // mode === 'break'
        setMode('work');
        setTimeRemaining(WORK_MINUTES * 60);
        setIsActive(false); // Pause after break
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining, mode, playSound]);

  const startPause = useCallback(() => {
    if (Tone.context.state !== 'running') {
      Tone.start();
    }
    setIsActive(active => !active);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(mode === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60);
  }, [mode]);

  return { timeRemaining, mode, isActive, sessionsCompleted, startPause, reset };
};

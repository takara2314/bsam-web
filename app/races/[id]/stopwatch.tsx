"use client";

import { useEffect, useState } from "react";
import type { Duration, StartRaceMessage } from "../../models";

interface Props {
  info: StartRaceMessage | null;
}

const EMPTY_DURATION: Duration = {
  minutes: 0,
  seconds: 0,
  millisecondsHead2: 0,
};

const calculateDuration = (
  unixNanoTime1: bigint,
  unixNanoTime2: bigint,
): Duration => {
  // 環境によって自動的にnumber型に変換されてしまう
  unixNanoTime1 = BigInt(unixNanoTime1);
  unixNanoTime2 = BigInt(unixNanoTime2);

  const duration = unixNanoTime2 - unixNanoTime1;

  const minutes = duration / BigInt(60000000000);
  const seconds = (duration % BigInt(60000000000)) / BigInt(1000000000);
  const millisecondsHead2 = (duration % BigInt(1000000000)) / BigInt(10000000);

  return {
    minutes: Number(minutes),
    seconds: Number(seconds),
    millisecondsHead2: Number(millisecondsHead2),
  };
};

const calculateDurationSinceNow = (unixNanoTime: bigint): Duration => {
  const now = BigInt(Date.now()) * BigInt(1000000);
  const duration = calculateDuration(unixNanoTime, now);

  return {
    minutes: Math.max(duration.minutes, 0),
    seconds: Math.max(duration.seconds, 0),
    millisecondsHead2: Math.max(duration.millisecondsHead2, 0),
  };
};

const Stopwatch = ({ info }: Props) => {
  const [duration, setDuration] = useState<Duration>(EMPTY_DURATION);
  const intervalUpdateMs = 50;
  const started = info?.started ?? false;
  const ended = !!info && !started && info.end_at !== BigInt(0);
  const enable = !!info && (started || info.end_at !== BigInt(0));

  useEffect(() => {
    if (!started || !info) {
      return;
    }

    setDuration(calculateDurationSinceNow(info.start_at));

    const intervalId = window.setInterval(() => {
      setDuration(calculateDurationSinceNow(info.start_at));
    }, intervalUpdateMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [info, started]);

  useEffect(() => {
    if (!ended || !info) {
      if (!enable) {
        setDuration(EMPTY_DURATION);
      }
      return;
    }

    setDuration(calculateDuration(info.start_at, info.end_at));
  }, [enable, ended, info]);

  return (
    <section className="mt-4 2xl:mt-8 mb-4 2xl:mb-5 py-3 w-full text-3xl 2xl:text-4xl text-center font-time font-medium bg-white rounded-xl">
      {enable ? (
        <span className="text-blue-800">
          {duration.minutes.toString().padStart(2, "0")}:
          {duration.seconds.toString().padStart(2, "0")}.
          {duration.millisecondsHead2.toString().padStart(2, "0")}
        </span>
      ) : (
        <span className="text-gray-500">--:--.--</span>
      )}
    </section>
  );
};

export default Stopwatch;

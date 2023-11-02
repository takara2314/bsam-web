import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import type { Duration, StartRaceMessage } from '../../models';

interface Props {
  info: StartRaceMessage | null;
}

const calculateDuration = (unixNanoTime1: bigint, unixNanoTime2: bigint): Duration => {
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
    millisecondsHead2: Number(millisecondsHead2)
  };
};

const calculateDurationSinceNow = (unixNanoTime: bigint): Duration => {
  const now = BigInt(Date.now()) * BigInt(1000000);
  const duration = calculateDuration(unixNanoTime, now);

  return {
    minutes: Math.max(duration.minutes, 0),
    seconds: Math.max(duration.seconds, 0),
    millisecondsHead2: Math.max(duration.millisecondsHead2, 0)
  };
};

const Stopwatch = ({ info }: Props) => {
  const [duration, setDuration] = useState<Duration>({
    minutes: 0,
    seconds: 0,
    millisecondsHead2: 0
  });

  const intervalUpdateMs = 50;

  let enable = false;
  let started = false;
  let ended = false;

  if (info) {
    started = info.started;
    ended = !started && (info.end_at != BigInt(0));

    if (info.started || info.end_at != BigInt(0)) {
      enable = true;
    }
  }

  useInterval(
    () => {
      setDuration(calculateDurationSinceNow(info!.start_at));
    },
    started ? intervalUpdateMs : null
  );

  useEffect(() => {
    if (!ended) {
      return;
    }
    setDuration(calculateDuration(info!.start_at, info!.end_at));
  }, [ended, info]);

  return (
    <section className="mt-4 2xl:mt-8 mb-4 2xl:mb-5 py-3 w-full text-3xl 2xl:text-4xl text-center font-time font-medium bg-white rounded-xl">
      {enable ? (
        <span className="text-blue-800">
          {duration!.minutes.toString().padStart(2, '0')}
          :{duration!.seconds.toString().padStart(2, '0')}
          .{duration!.millisecondsHead2.toString().padStart(2, '0')}
        </span>
      ) : (
        <span className="text-gray-500">
          --:--.--
        </span>
      )}
    </section>
  );
};

export default Stopwatch;

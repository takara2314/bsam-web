'use client';

import { useEffect, useState } from 'react';
import type { Association, LiveMessage, StartRaceMessage } from '../../models';
import Map from './map';
import Menu from './menu';
import useRacingSocket from '../../hooks/useRacingSocket';

const Racing = ({ assoc }: { assoc: Association }) => {
  // Connect the racing socket
  const { conn, connecting } = useRacingSocket(assoc.id);
  const [liveInfo, setLiveInfo] = useState<LiveMessage | null>(null);
  const [startRaceInfo, setStartRaceInfo] = useState<StartRaceMessage | null>(null);

  useEffect(() => {
    if (!conn) {
      return;
    }

    conn.current!.onReceiveLiveMsg = (msg: LiveMessage) => {
      setLiveInfo(msg);
    };

    conn.current!.onReceiveStartRaceMsg = (msg: StartRaceMessage) => {
      setStartRaceInfo(msg);
      console.log(msg);
    };
  }, [conn, connecting]);

  return (
    <div className="w-full h-full grid grid-cols-4">
      <Menu
        assoc={assoc}
        liveInfo={liveInfo}
        startRaceInfo={startRaceInfo}
      />
      <main className="col-span-3">
        <Map
          assoc={assoc}
          liveInfo={liveInfo}
        />
      </main>
    </div>
  );
};

export default Racing;

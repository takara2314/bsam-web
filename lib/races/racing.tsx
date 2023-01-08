'use client';

import { useEffect, useState } from 'react';
import type { Association, LiveMessage } from '../../models';
import Map from './map';
import Menu from './menu';
import useRacingSocket from './useRacingSocket';

const Racing = ({ assoc }: { assoc: Association }) => {
  // Connect the racing socket
  const { conn } = useRacingSocket(assoc.id);
  const [liveInfo, setLiveInfo] = useState<LiveMessage | null>(null);

  useEffect(() => {
    if (!conn) {
      return;
    }

    conn.current!.onReceiveLiveMsg = (msg: LiveMessage) => {
      setLiveInfo(msg);
    };
  }, [conn]);

  return (
    <div className="w-full h-full grid grid-cols-4">
      <Menu
        assoc={assoc}
        liveInfo={liveInfo}
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

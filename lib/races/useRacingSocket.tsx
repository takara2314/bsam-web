import { useCallback, useEffect, useRef, useState } from 'react';
import type { LiveMessage, StartRaceMessage, RacingSocket } from '../../models';

const useRacingSocket = (assocId: string) => {
  const conn = useRef<RacingSocket>();
  const [connecting, setConnecting] = useState<boolean>(false);

  const connectWs = useCallback(() => {
    conn.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_API}/racing/${assocId}`);

    conn.current!.onopen = () => {
      setConnecting(true);
      conn.current!.send(JSON.stringify({
        'type': 'auth',
        'role': 'guest'
      }));
    };

    conn.current.onmessage = readWsMsg;

    // Reconnect
    conn.current.onclose = () => {
      setConnecting(false);
      console.log('reconnect');
      connectWs();
    };
  }, [assocId]);

  const readWsMsg = (ev: MessageEvent<any>) => {
    const msgs: string[] = ev.data.split('\n');
    for (let msg of msgs) {
      const tmp = JSON.parse(msg);

      switch (tmp["type"]) {
        case "live":
          if (conn.current!.onReceiveLiveMsg) {
            conn.current!.onReceiveLiveMsg(tmp as LiveMessage);
          }
          break;

        case "start_race":
          if (conn.current!.onReceiveStartRaceMsg) {
            conn.current!.onReceiveStartRaceMsg(tmp as StartRaceMessage);
          }
          break;
      }
    }
  };

  useEffect(() => {
    connectWs();
  }, [connectWs]);

  return { conn, connecting };
};

export default useRacingSocket;

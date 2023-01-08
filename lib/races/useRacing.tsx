import { useCallback, useEffect, useRef, useState } from 'react';

const useRacing = (assocId: string) => {
  const conn = useRef<WebSocket>();
  const [connecting, setConnecting] = useState<boolean>(false);

  const connectWs = useCallback(() => {
    conn.current = new WebSocket(`wss://gateway.bsam.app/v3/racing/${assocId}`);

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
      console.log(JSON.parse(msg));
    }
  };

  useEffect(() => {
    connectWs();
  }, [connectWs]);

  return [conn, connecting];
};

export default useRacing;

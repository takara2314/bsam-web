import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { LiveMessage, StartRaceMessage, RacingSocket } from "../models";

const useRacingSocket = (assocId: string) => {
  const conn = useRef<RacingSocket | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [liveInfo, setLiveInfo] = useState<LiveMessage | null>(null);
  const [startRaceInfo, setStartRaceInfo] = useState<StartRaceMessage | null>(
    null,
  );

  const readWsMsg = useEffectEvent((ev: MessageEvent<string>) => {
    const msgs = ev.data.split("\n");

    for (const msg of msgs) {
      if (msg === "") {
        continue;
      }

      const parsed = JSON.parse(msg) as LiveMessage | StartRaceMessage;

      switch ((parsed as { type?: string }).type) {
        case "live":
          setLiveInfo(parsed as LiveMessage);
          break;
        case "start_race":
          setStartRaceInfo(parsed as StartRaceMessage);
          break;
      }
    }
  });

  useEffect(() => {
    let isUnmounted = false;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    const connectWs = () => {
      const socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}/racing/${assocId}`,
      ) as RacingSocket;

      conn.current = socket;

      socket.onopen = () => {
        setConnecting(true);
        socket.send(
          JSON.stringify({
            type: "auth",
            role: "guest",
          }),
        );
      };

      socket.onmessage = readWsMsg;
      socket.onclose = () => {
        setConnecting(false);

        if (isUnmounted) {
          return;
        }

        console.log("reconnect");
        reconnectTimeout = setTimeout(connectWs, 1000);
      };
    };

    connectWs();

    return () => {
      isUnmounted = true;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      conn.current?.close();
      conn.current = null;
    };
  }, [assocId]);

  return { conn, connecting, liveInfo, startRaceInfo };
};

export default useRacingSocket;

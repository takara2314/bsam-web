import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInterval } from 'usehooks-ts';

interface Props {
  token: string;
  raceId: string;
  userId: string;
  role: string;
  markNo: number;
  lat: number;
  lng: number;
  heading: number;
}

const Socket = ({ token, raceId, userId, role, markNo, lat, lng, heading }: Props) => {
  const conn = useRef<WebSocket>();
  const [connecting, setConnecting] = useState<boolean>(false);

  const connectWs = useCallback(() => {
    conn.current = new WebSocket(`wss://gateway.bsam.app/v3/racing/${raceId}`);

    conn.current!.onopen = () => {
      setConnecting(true);
      conn.current!.send(JSON.stringify({
        'type': 'auth',
        'token': token,
        'user_id': userId,
        'role': role,
        'mark_no': markNo,
      }));
    };

    conn.current.onmessage = readWsMsg;

    // reconnect
    conn.current.onclose = () => {
      setConnecting(false);
      console.log('reconnect');
      connectWs();
    };
  }, [token, raceId, userId, role, markNo]);

  const readWsMsg = (ev: MessageEvent<any>) => {
    const msgs: string[] = ev.data.split('\n');
    for (let msg of msgs) {
      console.log(JSON.parse(msg));
    }
  };

  const handleStart = useCallback(() => {
    connectWs();
  }, [connectWs]);

  const sendLocation = useCallback(() => {
    conn.current!.send(JSON.stringify({
      'type': 'location',
      'latitude': lat,
      'longitude': lng,
      'accuracy': 0.0,
      'heading': heading,
      'heading_fixing': 0.0,
      'compass_degree': 20.0,
    }));
  }, [lat, lng, heading]);

  useInterval(sendLocation, connecting ? 1000 : null);

  return (
    <>
      <button
        className="p-3 w-11/12 text-white font-medium rounded-xl bg-sky-700 hover:bg-sky-900 transition ease-in-out duration-300"
        onClick={handleStart}
      >
        通信開始
      </button>
    </>
  );
};

export default Socket;

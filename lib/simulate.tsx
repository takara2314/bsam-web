'use client';

import React, { useEffect, useState } from 'react';
import Socket from './socket';

const Simulate = () => {
  const [token, setToken] = useState<string>('');
  const [raceId, setRaceId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [markNo, setMarkNo] = useState<number>(1);
  const [lat, setLat] = useState<number>(0.0);
  const [lng, setLng] = useState<number>(0.0);
  const [heading, setHeading] = useState<number>(0.0);

  useEffect(() => {
    setToken(process.env.NEXT_PUBLIC_TOKEN ?? '');
    setRaceId(process.env.NEXT_PUBLIC_RACE_ID ?? '');
    setLat(Number(process.env.NEXT_PUBLIC_LATITUDE) ?? 0.0);
    setLng(Number(process.env.NEXT_PUBLIC_LONGITUDE) ?? 0.0);
  }, []);

  return (
    <>
      <h1 className="mt-10 mb-5 text-2xl font-bold">
        B-SAM 模擬接続クライアント
      </h1>

      <div className="p-5 w-11/12 rounded-xl bg-sky-50 border-2 border-gray-300">
        <h2 className="mb-2 text-xl font-medium">
          トークン
        </h2>

        <input
          type="text"
          className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
          value={token}
          onChange={(e) => { setToken(e.target.value); }}
        />

        <h2 className="mb-2 text-xl font-medium">
          レースID
        </h2>

        <input
          type="text"
          className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
          value={raceId}
          onChange={(e) => { setRaceId(e.target.value); }}
        />

        <h2 className="mb-2 text-xl font-medium">
          ユーザーID
        </h2>

        <input
          type="text"
          className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
          value={userId}
          onChange={(e) => { setUserId(e.target.value); }}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="mb-2 text-xl font-medium">
              ロール
            </h2>

            <input
              type="text"
              className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
              value={role}
              onChange={(e) => { setRole(e.target.value); }}
            />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-medium">
              マークNo
            </h2>

            <input
              type="number"
              className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
              value={markNo}
              onChange={(e) => { setMarkNo(Number(e.target.value)); }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <h2 className="mb-2 text-xl font-medium">
              緯度
            </h2>

            <input
              type="number"
              className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
              value={lat}
              onChange={(e) => { setLat(Number(e.target.value)); }}
            />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-medium">
              経度
            </h2>

            <input
              type="number"
              className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
              value={lng}
              onChange={(e) => { setLng(Number(e.target.value)); }}
            />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-medium">
              向き
            </h2>

            <input
              type="number"
              className="mb-10 p-2 w-full rounded-xl border-2 border-gray-300 word-break-all"
              value={heading}
              onChange={(e) => { setHeading(Number(e.target.value)); }}
            />
          </div>
        </div>

        <Socket
          token={token}
          raceId={raceId}
          userId={userId}
          role={role}
          markNo={markNo}
          lat={lat}
          lng={lng}
          heading={heading}
        />
      </div>
    </>
  );
};

export default Simulate;

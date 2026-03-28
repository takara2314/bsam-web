"use client";

import type { Association } from "../../models";
import Map from "./map";
import Menu from "./menu";
import useRacingSocket from "../../hooks/useRacingSocket";
import CourseInfo from "./courseInfo";
import Copyright from "./copyright";

const Racing = ({ assoc }: { assoc: Association }) => {
  // Connect the racing socket
  const { liveInfo, startRaceInfo } = useRacingSocket(assoc.id);

  return (
    <div className="w-full h-full grid grid-cols-4">
      <Menu assoc={assoc} liveInfo={liveInfo} startRaceInfo={startRaceInfo} />

      <main className="col-span-4 md:col-span-3">
        <menu className="m-auto w-[calc(100%-3rem)] bg-[rgba(255,255,255,0.5)] h-64 rounded-xl shadow-xl backdrop-blur-xl md:hidden fixed inset-x-0 top-6 z-10">
          <CourseInfo marks={liveInfo ? liveInfo.marks : null} />
          <Copyright />
        </menu>

        <Map liveInfo={liveInfo} />
      </main>
    </div>
  );
};

export default Racing;

'use client';

import type { Association } from '../../models';
import Map from './map';
import Menu from './menu';
import useRacing from './useRacing';

const Racing = ({ assoc }: { assoc: Association }) => {
  // Connect the racing socket
  const [conn, connecting] = useRacing(assoc.id);

  return (
    <div className="w-full h-full grid grid-cols-4">
      <Menu assoc={assoc} />
      <main className="col-span-3">
        <Map assoc={assoc} />
      </main>
    </div>
  );
};

export default Racing;

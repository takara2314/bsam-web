import Map from '../../../lib/races/map';
import Menu from '../../../lib/races/menu';

const Page = () => {
  return (
    <div className="w-full h-full grid grid-cols-4">
      <Menu />
      <main className="col-span-3">
        <Map />
      </main>
    </div>
  );
};

export default Page;

import Map from '../../../lib/races/map';
import Menu from '../../../lib/races/menu';

interface Props {
  params: { id: string };
}

const Page = ({ params }: Props) => {
  return (
    <div className="w-full h-full grid grid-cols-4">
      <Menu assocId={params.id} />
      <main className="col-span-3">
        <Map assocId={params.id} />
      </main>
    </div>
  );
};

export default Page;

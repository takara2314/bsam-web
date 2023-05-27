import { notFound } from 'next/navigation';
import Racing from '../../../lib/races/racing';
import type { Association } from '../../../models';

export const config = { runtime: 'edge' };

interface Props {
  params: { id: string };
}

const fetchAssociation = async (assocId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/associations/${assocId}`);
  if (!res.ok) {
    return undefined;
  }
  return res.json() as Promise<Association>;
};

const Page = async ({ params }: Props) => {
  const assoc = await fetchAssociation(params.id);

  if (!assoc) {
    notFound();
  }

  return <Racing assoc={assoc} />;
};

export default Page;

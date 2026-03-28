import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Racing from "./racing";
import type { Association } from "../../models";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "レースモニター",
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  params: Promise<{ id: string }>;
}

const fetchAssociation = async (assocId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/associations/${assocId}`,
  );
  if (!res.ok) {
    return undefined;
  }
  return res.json() as Promise<Association>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const assoc = await fetchAssociation(id);

  if (!assoc) {
    notFound();
  }

  return <Racing assoc={assoc} />;
};

export default Page;

interface Props {
  raceName: string;
  assocName: string;
}

const Title = ({ raceName, assocName }: Props) => {
  return (
    <section className="w-full flex flex-row gap-4">
      <div className="w-12 h-full flex flex-col justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="ロゴ"
          className="w-12 h-12"
        />
      </div>
      <div className="w-[calc(100%-3rem)] break-words">
        <h1 className="mb-2 text-base 2xl:text-xl font-medium">
          {raceName}
        </h1>
        <h2 className="text-gray-500 text-sm 2xl:text-base">
          {assocName}
        </h2>
      </div>
    </section>
  );
};

export default Title;

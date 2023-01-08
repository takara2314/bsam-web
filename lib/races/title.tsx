interface Props {
  raceName: string;
  assocName: string;
}

const Title = ({ raceName, assocName }: Props) => {
  return (
    <section className="w-full flex flex-row gap-4">
      <div className="w-16 h-full flex flex-col justify-center">
        <div className="w-16 h-16 bg-sky-500" />
      </div>
      <div className="w-[calc(100%-5rem)] break-words">
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

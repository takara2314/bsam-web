const Title = () => {
  return (
    <section className="w-full flex flex-row gap-4">
      <div className="w-16 h-full flex flex-col justify-center">
        <div className="w-16 h-16 bg-sky-500" />
      </div>
      <div className="w-[calc(100%-5rem)] break-words">
        <h1 className="mb-2 text-base 2xl:text-xl font-medium">
          ブラインドセーリング大会2023 1日目
        </h1>
        <h2 className="text-gray-500 text-sm 2xl:text-base">
          ゴーリキマリンビレッジ
        </h2>
      </div>
    </section>
  );
};

export default Title;

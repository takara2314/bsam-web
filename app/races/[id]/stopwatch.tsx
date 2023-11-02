const Stopwatch = ({started}: {started: boolean}) => {
  return (
    <section className="mt-4 2xl:mt-8 mb-4 2xl:mb-5 py-3 w-full text-3xl 2xl:text-4xl text-center font-time font-medium bg-white rounded-xl">
      {started ? (
        <span className="text-blue-800">
          12:30.56
        </span>
      ) : (
        <span className="text-gray-500">
          --:--.--
        </span>
      )}
    </section>
  );
};

export default Stopwatch;

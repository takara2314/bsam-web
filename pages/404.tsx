import '../app/globals.css';

const NotFound = () => {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="pb-2 text-transparent text-8xl font-bold bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
        404 Not Found
      </div>

      <div className="mt-10 text-2xl">
        アクセスしたページは存在しません。
      </div>
    </main>
  );
};

export default NotFound;

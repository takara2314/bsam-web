import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head />
      <body>{children}</body>
    </html>
  );
};

export default Layout;

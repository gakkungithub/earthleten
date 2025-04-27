export default function ThreadsLayout({children,}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-3/4 lg:w-1/2 mx-auto">
        {children}
    </div>
  );
}
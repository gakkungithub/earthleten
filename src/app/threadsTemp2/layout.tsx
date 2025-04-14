import ThreadsHeaderButtons from '@/components/ThreadsHeaderButtons';

export default function ThreadsLayout({children,}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
        <ThreadsHeaderButtons />
        <div className="mx-auto lg:w-1/3 w-1/2">
            {children}
        </div>
    </>
  );
}
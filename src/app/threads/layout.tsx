import ThreadsHeaderButtons from '@/components/ThreadsHeaderButtons';
import ChangeThreadsGenres from '@/components/ChangeThreadsGenres';
import ChangeThreadsOrder from '@/components/ChangeThreadsOrder';

export default function ThreadsLayout({children,}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
      <>
          <ThreadsHeaderButtons />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-start-2">
                  <ChangeThreadsOrder />
                  <ChangeThreadsGenres />
              </div>
              <div className="col-span-1 md:col-start-3">
                  {children}
              </div>
          </div>
      </>
  );
}
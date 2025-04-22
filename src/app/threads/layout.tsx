import ThreadsHeaderButtons from '@/components/ThreadsHeaderButtons';
import ChangeThreadsGenres from '@/components/ChangeThreadsGenres';
import ChangeThreadsOrder from '@/components/ChangeThreadsOrder';

export default function ThreadsLayout({children,}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
      <>
          <ThreadsHeaderButtons />
          <div className="flex items-start w-fit mx-auto">
              <div className="w-fit">
                  <ChangeThreadsOrder />
                  <ChangeThreadsGenres />
              </div>
              <div className="w-fit">
                  {children}
              </div>
          </div>
      </>
  );
}
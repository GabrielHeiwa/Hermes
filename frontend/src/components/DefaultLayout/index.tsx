interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-full md:space-y-4">{children}</div>
      </div>
    </main>
  );
}

export { DefaultLayout };

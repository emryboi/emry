import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Container({ children }: Props) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem-5rem)] max-w-5xl flex-col px-4 py-8 md:px-6 md:py-12">
      {children}
    </main>
  );
}


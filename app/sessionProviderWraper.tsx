"use client";

import { SessionProvider } from "next-auth/react";

const SessionProviderWraper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWraper;

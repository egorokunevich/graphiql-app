import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
}

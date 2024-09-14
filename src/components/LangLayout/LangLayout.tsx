import { Box, Container } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

// import ClientTabs from '@src/components/ClientTabs/ClientTabs';
import ErrorFallback from '@src/components/ErrorFallback/ErrorFallback';
import Footer from '@src/components/Footer/Footer';
import Header from '@src/components/Header/Header';

const LangLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={{ maxWidth: '1440px' }} data-testid="lang-layout">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          {/* <ClientTabs /> */}
          <Box sx={{ flex: 1 }}>{children}</Box>
          <Footer />
        </ErrorBoundary>
      </Box>
    </Container>
  );
};

export default LangLayout;


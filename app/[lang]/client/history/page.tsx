'use client';

import { useParams } from '@/node_modules/next/navigation';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import useAuthRedirect from '@/src/hooks/useAuthRedirect';
import { LanguageType } from '@/src/types/index';
import { useHistoryContext } from '@src/context/HistoryContext';

const HistoryPage = () => {
  const { loading } = useAuthRedirect();
  const { history, clearHistory, setSelectedRequest } = useHistoryContext();
  const params = useParams<{ lang: LanguageType }>();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
      }}
      data-testid="history-page"
    >
      <List sx={{ height: '100%', width: '100%', flex: 1 }}>
        {history.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6">
              You haven't executed any requests yet, It's empty here. Try those
              options:
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  router.push(`/${params.lang}/client/rest-client`)
                }
                data-testid="history-restBtn"
              >
                REST Client
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  router.push(`/${params.lang}/client/graphiql-client`)
                }
                data-testid="history-graphiqlBtn"
              >
                GraphiQL Client
              </Button>
            </Box>
            .
          </Box>
        ) : (
          <Box data-testid="history-requestList">
            {history.map((entry, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  setSelectedRequest(entry);
                  router.push(`/${params.lang}/client/${entry.type}`);
                }}
                disableGutters
                data-testid="history-savedRequest"
              >
                <ListItemText
                  key={index}
                  primary={`${entry.type} Request - ${entry.method || 'POST'}/ ${entry.url}`}
                  secondary={
                    <>
                      <span className="block">{`Headers: ${JSON.stringify(entry.headers)}`}</span>
                      <span className="block">{`Body: ${entry.body ? JSON.stringify(entry.body) : 'No body'}`}</span>
                      <span className="block">{`Variables: ${entry.variables ? JSON.stringify(entry.variables) : 'No variables'}`}</span>
                      {entry.sdlUrl && (
                        <span className="block">{`SDL URL: ${entry.sdlUrl}`}</span>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
            <Button
              sx={{ float: 'right', marginTop: 2 }}
              variant="contained"
              onClick={clearHistory}
            >
              Clear History
            </Button>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default HistoryPage;

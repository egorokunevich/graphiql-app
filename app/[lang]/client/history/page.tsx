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
import { HistoryEntry, LanguageType } from '@/src/types/index';
import { useHistoryContext } from '@src/context/HistoryContext';


const HistoryPage = () => {
  const { loading } = useAuthRedirect();
  const { history, clearHistory } = useHistoryContext();
  const params = useParams<{ lang: LanguageType }>();
  const router = useRouter();
  console.log(history);

  const handleRestore = (entry: HistoryEntry) => {
    if (entry.type === 'REST') {
      router.push(`/rest-client?method=${entry.method}&url=${entry.url}`);
    } else if (entry.type === 'GraphQL') {
      router.push(`/graphql-client?url=${entry.url}&sdlUrl=${entry.sdlUrl}`);
    }
  };

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
    >
      <Typography variant="h4">History Page</Typography>
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
              >
                REST Client
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  router.push(`/${params.lang}/client/graphiql-client`)
                }
              >
                GraphiQL Client
              </Button>
            </Box>
            .
          </Box>
        ) : (
          <Box>
            {history.map((entry, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleRestore(entry)}
                disableGutters
              >
                <ListItemText
                  key={index}
                  primary={`${entry.type} Request - ${entry.method || 'POST'}/ ${entry.url}`}
                  secondary={
                    <>
                      <span>{`Headers: ${JSON.stringify(entry.headers)}`}</span>
                      <span>{`Body: ${entry.body ? JSON.stringify(entry.body) : 'No body'}`}</span>
                      <span>{`Variables: ${entry.variables ? JSON.stringify(entry.variables) : 'No variables'}`}</span>
                      {entry.sdlUrl && (
                        <span>{`SDL URL: ${entry.sdlUrl}`}</span>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
            <Button
              sx={{ float: 'right' }}
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

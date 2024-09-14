import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
} from '@mui/material';
import React from 'react';

interface ProfileCardProps {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  profession: string;
}

const ProfileCard = ({
  username,
  avatarUrl,
  profileUrl,
  profession,
}: ProfileCardProps) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Link
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
      >
        <Card
          sx={{
            maxWidth: 185,
            cursor: 'pointer',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={avatarUrl}
            alt={`${username}'s avatar`}
          />
          <CardContent>
            <Typography gutterBottom align="center" component="div">
              {username}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              component="p"
            >
              {profession}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default ProfileCard;


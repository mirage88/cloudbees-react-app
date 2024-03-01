import * as React from 'react';
import { Button, Avatar, Card, CardContent, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
export default function user({ user }) {
  /**
   * User Details page - A screen which shows more detailed information for the selected user. We can show extended profile information (such as company and social handles), a summary on their followers, following and number of public repositories.
   */
  return (
    <Container maxWidth="sm">
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary">
          {user.name}
        </Typography>
        <Avatar alt={user.name} src={user.avatar_url} variant="square" sx={{width: 60, height: 60}} />
          <Typography color="text.secondary">
            <Link to={user.html_url} target='_blank' rel='noreferrer'>{user.login}</Link>
          </Typography>
            <p>
              Company: {user.company}
            </p>
            <p>
              Location: {user.location}
            </p>
            <p>
              <Link to={user.organizations_url} target='_blank' rel='noreferrer'>Organizations</Link>
            </p>
            <p>
              <Link to={user.blog} target='_blank' rel='noreferrer'>Blog</Link>
            </p>
            
            <p>
              Followers: <a href={user.followers_url} target='_blank' rel='noreferrer'> {user.followers} </a>
            </p>
            
            <p>
              Following: <a href={user.following_url} target='_blank' rel='noreferrer'>{user.following}</a>
            </p>
          <p>Public Gists: {user.public_gists}</p>
          <p>Public Repositories: {user.public_repos}</p>
        
          <Button variant="contained" href='/'>Go Back</Button>
      </CardContent>
    </Card>
    </Container>

  );
}
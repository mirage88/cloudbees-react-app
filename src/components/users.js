import { Octokit } from "@octokit/core";
import React, { useState, useEffect } from 'react';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Users() {
  /**
   * User List page - A default screen which fetches Users from the Github API and displays them in a list. For each user you should show their Avatar, First Name, Last Name and Username. Each item in the list should link to the User Details page detailed below.
   */
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN
  })
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await octokit.request('GET /users');
        if(!data) {
          return [];
        }
        let result = [];
        for (let user of data) {
          if (user && user.login) {
            let userData = octokit.request(`GET /users/${user.login}`);
            result.push(userData);
          }
        }
        return Promise.all(result);
      } catch {
        setUsers([]);
        console.log('Unable to fetch users. try again later.');
        return [];
      }
    };

    fetchData().then((results) => {
      setUsers(results);
    }).catch(() => {
      console.log('Unable to fetch data');
    });
  }, []);

  const userItem = {
    display: 'block',
    cursor: 'pointer'
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {users.length > 0 && users.map(({ data: user }) => (
        <Link style={userItem} key={user.login} to={`/users/${user.login}`} state={user}>
            <ListItem key={user.login} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.avatar_url} variant="square" />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                    >
                      {user.login}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Link >
      ))}
    </List>
  );
}
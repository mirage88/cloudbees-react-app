import React, { useState, useEffect } from 'react';
import User from '../components/user';
import { useLocation } from 'react-router-dom';
import { Octokit } from "@octokit/core";

export default function Root() {
  let locationData = useLocation();
  const [user, setUser] = useState(locationData.state);
  useEffect(() => {
    async function fetchData() {
      const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
      });
      try {
        let { data } = await octokit.request(`GET ${locationData.pathname}`);
        setUser(data);
      } catch {
        setUser({});
        console.log('Unable to fetch user. try again later.');
        return {};
      }
    };
    if(!user) {
      fetchData();
    }
  }, []);
  return (
    <>
      {user && <User user={user}></User>}
    </>
  );
}
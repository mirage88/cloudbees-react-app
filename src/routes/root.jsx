import Users from '../components/users';
import { Container } from '@mui/material';
export default function Root() {
  return (
    <>
      <Container maxWidth="sm">
        <h2>Github Users List</h2>
        <Users></Users>
      </Container>
    </>
  );
}
import { Container } from '@mui/material';
import { CreateTicket } from '../components/CreateTicket';
import { CreateEvent } from '../components/CreateEvent';
import { CreateTeam } from '../components/CreateTeam';
import { CreateEventParameters } from '../components/CreateEventParameters';
import { CreateWeight } from '../components/CreateWeight';
import { CreateAge } from '../components/CreateAge';
import { CreateCategory } from '../components/CreateCategory';

export const ManageEvent = () => {
      return (
        <Container component="main" maxWidth="xs">
          <CreateTeam />
          <CreateEvent />
          <CreateTicket />
          <CreateEventParameters />
          
          <CreateWeight />
          <CreateAge />
          <CreateCategory />

        </Container>
      );
    }
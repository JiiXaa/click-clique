import {
  render,
  screen,
  fireEvent,
  userEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../NavBar';
import { CurrentUserProvider } from '../../contexts/CurrentUserContext';

test('Renders NavBar', () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.queryByRole('link', { name: 'Sign in' });
  expect(signInLink).toBeInTheDocument();
});

test('Renders link to the user profile for a logged in user', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText('Profile');
  expect(profileAvatar).toBeInTheDocument();
  // screen.debug();
});

test('Renders Sign in and Sign up buttons again on log out', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole('link', { name: 'Sign out' });
  fireEvent.click(signOutLink);

  // Use findByRole directly after firing the event
  const signInLink = await screen.findByRole('link', { name: 'Sign in' });
  const signUpLink = await screen.findByRole('link', { name: 'Sign up' });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();

  screen.debug();
});

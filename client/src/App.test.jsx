import React from 'react';
import { render } from '@testing-library/react';
import Login from './pages/Login/Login';

test('renders login text', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Welcome to Mytweets app/i);
  expect(linkElement).toBeInTheDocument();
});

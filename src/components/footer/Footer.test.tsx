/* eslint-disable testing-library/prefer-screen-queries */

import { render } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer Component', () => {
  it('has `my account` title', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Footer />
      </MemoryRouter>
    )
    expect(getByTestId('accountTitle')?.textContent).toBe('My Account');
  });

  it('has twitter link', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Footer />
      </MemoryRouter>
    )
    expect(getByTestId('socialIcon-twitter')).toBeTruthy();
  });
})

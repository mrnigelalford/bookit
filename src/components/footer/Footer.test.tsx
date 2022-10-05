/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Home Component', () => {
  it('changes the class when hovered', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Footer />
      </MemoryRouter>
    )

    expect(queryByTestId('accountTitle')?.textContent).toBe('My Account');
  });
})

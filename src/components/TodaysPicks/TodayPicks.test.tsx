/* eslint-disable testing-library/prefer-screen-queries */

import { render } from '@testing-library/react';
import React from 'react';


import { MemoryRouter } from 'react-router-dom';
import TodayPicks from './TodayPicks';


describe('Todays Pick Component', () => {
  it('has header Text', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <TodayPicks data={[]} />
      </MemoryRouter>
    )
    expect(getByTestId('pickHeader')?.textContent).toBe(`Today's Picks`);
  });
})

describe('Card Details', () => {
  const mockTodayData = [{
    nameAuthor: 'nameAuthor',
    price: 0,
    AuthorId: 'authorid',
    description: 'description',
    title: 'title'
  }]

  it('exists', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <TodayPicks data={mockTodayData} />
      </MemoryRouter>
    )
    expect(getByTestId('bookCard')).toBeTruthy();
  });

  it('has toBeTruthy', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <TodayPicks data={mockTodayData} />
      </MemoryRouter>
    )
    expect(getByTestId('card-title').textContent).toBe('title');
  })

  it('has title', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <TodayPicks data={mockTodayData} />
      </MemoryRouter>
    )
    expect(getByTestId('card-title').textContent).toBe('title');
  })

  it('has routing to author ID', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <TodayPicks data={mockTodayData} />
      </MemoryRouter>
    )
    expect(getByTestId('card-authorId').getAttribute('href')).toBe('/authors/authorid');
  })

  it('has author name', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <TodayPicks data={mockTodayData} />
      </MemoryRouter>
    )
    expect(getByTestId('card-authorId').textContent).toBe('nameAuthor');
  })

  it('has price', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <TodayPicks data={mockTodayData} />
      </MemoryRouter>
    )
    expect(getByTestId('card-price').textContent).toBe('0 xtz');
  })
})

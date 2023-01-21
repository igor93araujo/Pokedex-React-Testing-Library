import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const getHomeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(getHomeLink).toBeInTheDocument();

    userEvent.click(getHomeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const getAboutLink = screen.getByRole('link', {
      name: /About/i,
    });

    expect(getAboutLink).toBeInTheDocument();

    userEvent.click(getAboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const getFavoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(getFavoriteLink).toBeInTheDocument();

    userEvent.click(getFavoriteLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});

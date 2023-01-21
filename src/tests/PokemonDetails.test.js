import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const pikachuPath = '/pokemon/25';
  test('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();

    const getPokemonDetailsLink = screen.queryByRole('heading', {
      name: /pikachu details/i,
    });

    userEvent.click(getdetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(pikachuPath);

    expect(getPokemonDetailsLink).not.toBeInTheDocument();

    const pikachuDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuDetails).toBeInTheDocument();

    const getH2 = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(getH2).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    const { history } = renderWithRouter(<App />);

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();

    userEvent.click(getdetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(pikachuPath);
    const pokeDetails = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(pokeDetails).toBeInTheDocument();
  });

  test('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);

    const pikachuLocation = 'Pikachu location';

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();

    userEvent.click(getdetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(pikachuPath);

    const getGameLocationTitle = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(getGameLocationTitle).toBeInTheDocument();

    const maps = screen.queryAllByAltText(pikachuLocation);
    expect(maps).toHaveLength(2);

    expect(maps[0].src).toContain('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');

    expect(maps[0].alt).toContain(pikachuLocation);

    expect(maps[1].src).toContain('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(maps[1].alt).toContain(pikachuLocation);

    const firstLocationName = screen.getByText(/kanto viridian forest/i);
    const secondLocationName = screen.getByText(/kanto power plant/i);

    expect(firstLocationName && secondLocationName).toBeInTheDocument();
  });

  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();

    userEvent.click(getdetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(pikachuPath);

    const getFavoriteBox = screen.getByText(/pokémon favoritado\?/i);

    expect(getFavoriteBox).toBeInTheDocument();
  });

  test('Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();

    userEvent.click(getdetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(pikachuPath);

    const getFavoriteBox = screen.getByText(/pokémon favoritado\?/i);

    userEvent.click(getFavoriteBox);

    const getFavStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(getFavStar).toBeInTheDocument();

    userEvent.click(getFavoriteBox);

    expect(getFavStar).not.toBeInTheDocument();
  });

  test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { history } = renderWithRouter(<App />);

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();

    userEvent.click(getdetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(pikachuPath);

    const getCheckBoxLabel = screen.getByText(/pokémon favoritado\?/i);
    expect(getCheckBoxLabel).toBeInTheDocument();
  });
});

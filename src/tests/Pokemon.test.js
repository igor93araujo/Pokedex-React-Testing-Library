import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    // capturando o pokemon e vendo se ele está na tela
    const Pikachu = screen.getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImage = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemonImage.src).toContain('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');

    expect(pokemonImage.alt).toContain('Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();
    userEvent.click(getdetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg', () => {
    const { history } = renderWithRouter(<App />);

    const getdetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(getdetailsLink).toBeInTheDocument();

    userEvent.click(getdetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const getFavoriteBox = screen.getByText(/pokémon favoritado\?/i);

    userEvent.click(getFavoriteBox);
    const getFavStart = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(getFavStart.src).toContain('/star-icon.svg');
    expect(getFavStart.alt).toContain('Pikachu is marked as favorite');
  });
});

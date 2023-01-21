import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import pokemonList from '../data';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    const getNoFavPoke = screen.getByText(/No favorite Pokémon found/i);
    expect(getNoFavPoke).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const getNoFavPoke = screen.getByText(/Pikachu/i);
    expect(getNoFavPoke).toBeInTheDocument();
  });
});

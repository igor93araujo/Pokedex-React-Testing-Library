import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoFirstParag = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    expect(infoFirstParag).toBeInTheDocument();

    const infoSecondParag = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(infoSecondParag).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const hetH2 = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(hetH2).toBeInTheDocument();
  });

  test('Teste se a pag contém a imagem de acordo com o link', () => {
    renderWithRouter(<About />);
    const getImg = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(getImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

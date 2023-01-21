import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testar componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const getH2 = screen.getByRole('heading', {
      name: /Encountered Pokémon/i,
      level: 2,
    });
    expect(getH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    // O botão deve conter o texto Próximo Pokémon
    renderWithRouter(<App />);

    const getBtn = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    expect(getBtn).toBeInTheDocument();

    // clicando no botao, muda para o próximo pokemon e verifica se ele está na tela
    userEvent.click(getBtn);
    const secondPokemin = screen.getByText(/charmander/i);
    expect(secondPokemin).toBeInTheDocument();
  });

  it('teste se é mostrado apenas um por vez', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    // usando o query esperando que um item nao esteja na tela
    const secondPokemon = screen.queryByText(/charmander/i);
    expect(secondPokemon).not.toBeInTheDocument();
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton).toBeDefined();

    const eletricBtn = screen.getByRole('button', {
      name: /electric/i,
    });

    expect(eletricBtn).toBeInTheDocument();

    const fireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(fireBtn).toBeInTheDocument();

    const bugBtn = screen.getByRole('button', {
      name: /bug/i,
    });
    expect(bugBtn).toBeInTheDocument();

    const poisonBtn = screen.getByRole('button', {
      name: /poison/i,
    });
    expect(poisonBtn).toBeInTheDocument();

    const psychicBtn = screen.getByRole('button', {
      name: /psychic/i,
    });
    expect(psychicBtn).toBeInTheDocument();

    const normalBtn = screen.getByRole('button', {
      name: /normal/i,
    });
    expect(normalBtn).toBeInTheDocument();

    const dragonBtn = screen.getByRole('button', {
      name: /dragon/i,
    });
    expect(dragonBtn).toBeInTheDocument();

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();
  });

  test('Teste para ver se é renderizado apenas o pokemon de cada filtro', () => {
    renderWithRouter(<App />);
    // captura do botao + clique
    const fireBtn = screen.getByRole('button', {
      name: /fire/i,
    });

    userEvent.click(fireBtn);
    // muda para o primeiro pokemon e verifica se ele está na tela
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    // captura o botao de proximo pokemon e clica nelep
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);

    // espeera que o proximo seja o rapidash e que depois seja o charmander
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(charmander).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // captura o botao
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    // clica no botao de todos e volta para o pikachu
    userEvent.click(allBtn);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);

    const charmander = screen.queryByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextBtn);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
    // clica o botao de todos e volta no pikachu
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});

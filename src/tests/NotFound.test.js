import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<NotFound />);
    const route = '/turma27b';

    history.push(route);

    const pageNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(pageNotFound).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<NotFound />);
    const route = '/turma27b';

    history.push(route);

    const getImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(getImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import PricingPage from './PricingPage';
import ProductPage from './ProductPage';

function renderRoute(path, element) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <MotionProvider>
        <Routes><Route path={path} element={element} /></Routes>
      </MotionProvider>
    </MemoryRouter>
  );
}

describe('generic FAQ removal', () => {
  it('removes repeated questions from generic product routes', () => {
    renderRoute('/platform', <ProductPage />);
    expect(screen.getByRole('heading', { name: 'Run compliance like a connected system.' })).toBeInTheDocument();
    expect(screen.queryByText('Questions, answered')).not.toBeInTheDocument();
    expect(screen.queryByText('Does Controllo replace our auditor?')).not.toBeInTheDocument();
  });

  it('removes the generic buying questions while preserving package comparison', () => {
    renderRoute('/pricing', <PricingPage />);
    expect(screen.getByRole('button', { name: 'Compare packages' })).toBeInTheDocument();
    expect(screen.queryByText('Buying questions')).not.toBeInTheDocument();
    expect(screen.queryByText('Can we use our existing controls?')).not.toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('./components/game', () => ({
  GameShell: () => <div data-testid="game-shell" />,
}));

vi.mock('./hooks', () => ({
  useLocaleToggle: () => ({ locale: 'en', toggleLocale: vi.fn() }),
  usePrefersReducedMotion: () => false,
}));

import App from './App';
import './locales/i18n';

describe('App', () => {
  it('renders the application title', async () => {
    render(<App />);
    expect(await screen.findByText(/Fair Play/i)).toBeInTheDocument();
    expect(screen.getByTestId('game-shell')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MotionProvider } from '../context/MotionContext';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('places the compliance current immediately before the blog', () => {
    render(
      <MemoryRouter>
        <MotionProvider>
          <HomePage />
        </MotionProvider>
      </MemoryRouter>
    );

    const complianceCurrent = document.querySelector('.current-story');
    const blog = screen.getByRole('region', {
      name: /practical guidance for compliance work/i
    });

    expect(blog.previousElementSibling).toBe(complianceCurrent);
  });
});

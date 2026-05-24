import { render, screen } from '@testing-library/react';
import About from './About';


describe('About', () => {
  it('renders About', () => {
    render(<About />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

});
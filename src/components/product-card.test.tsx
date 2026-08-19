import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/components/product-card';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 1000,
    picture: 'test-product.png',
  };

  it('should render the product name and price correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/฿1,000/)).toBeInTheDocument();
  });

  it('should render the product ID', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(/ID: 1/)).toBeInTheDocument();
  });
});

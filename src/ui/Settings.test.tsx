import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Settings } from './Settings'

// Mock the mockData
vi.mock('../core/mockData', () => ({
  mockAssets: [
    { id: '1', name: 'Primary Home', value: 450000, isHomeEquity: true, date: new Date('2024-06-30') },
    { id: '2', name: 'Savings Account', value: 25000, isHomeEquity: false, date: new Date('2024-06-30') }
  ],
  mockDebts: [
    { id: '1', name: 'Mortgage', balance: 320000, interestRate: 3.2, date: new Date('2024-06-30') }
  ]
}))

describe('Settings Component', () => {
  it('renders settings page with title', () => {
    render(<Settings />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage Your Financial Data')).toBeInTheDocument()
  })

  it('displays asset management section', () => {
    render(<Settings />)
    expect(screen.getByText('Assets')).toBeInTheDocument()
    expect(screen.getByText('Add New Asset')).toBeInTheDocument()
  })

  it('displays debt management section', () => {
    render(<Settings />)
    expect(screen.getByText('Debts')).toBeInTheDocument()
    expect(screen.getByText('Add New Debt')).toBeInTheDocument()
  })

  it('shows current assets in the list', () => {
    render(<Settings />)
    expect(screen.getByText('Primary Home')).toBeInTheDocument()
    expect(screen.getByText('Savings Account')).toBeInTheDocument()
  })

  it('shows current debts in the list', () => {
    render(<Settings />)
    expect(screen.getByText('Mortgage')).toBeInTheDocument()
  })

  it('allows adding new asset', async () => {
    render(<Settings />)
    
    // Click add asset button
    fireEvent.click(screen.getByText('Add New Asset'))
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Asset Name'), { target: { value: 'New Investment' } })
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '50000' } })
    fireEvent.click(screen.getByLabelText('Home Equity'))
    
    // Submit
    fireEvent.click(screen.getByText('Save Asset'))
    
    await waitFor(() => {
      expect(screen.getByText('New Investment')).toBeInTheDocument()
    })
  })

  it('validates required fields when adding asset', async () => {
    render(<Settings />)
    
    fireEvent.click(screen.getByText('Add New Asset'))
    fireEvent.click(screen.getByText('Save Asset'))
    
    await waitFor(() => {
      expect(screen.getByText('Asset name is required')).toBeInTheDocument()
      expect(screen.getByText('Value is required')).toBeInTheDocument()
    })
  })

  it('allows editing existing asset', async () => {
    render(<Settings />)
    
    // Click edit on first asset
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])
    
    // Update value
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '460000' } })
    fireEvent.click(screen.getByText('Update Asset'))
    
    await waitFor(() => {
      expect(screen.getByText('€460,000')).toBeInTheDocument()
    })
  })
}) 
import { describe, it, expect } from 'vitest'
import type { Transaction, NetWorthSnapshot } from './types'

describe('Type Definitions', () => {
  it('should create valid Transaction object', () => {
    const transaction: Transaction = {
      id: '123',
      date: new Date('2024-01-01'),
      amount: -50.00,
      description: 'TESCO STORE 123',
      category: 'groceries',
      source: 'aib'
    }

    expect(transaction.amount).toBe(-50.00)
    expect(transaction.category).toBe('groceries')
  })

  it('should create valid NetWorthSnapshot object', () => {
    const snapshot: NetWorthSnapshot = {
      date: new Date('2024-01-01'),
      totalAssets: 350000,
      liquidAssets: 50000,
      debts: {
        mortgage: 200000,
        other: 10000
      },
      totalNetWorth: 140000,
      liquidNetWorth: -160000
    }

    expect(snapshot.totalAssets).toBe(350000)
    expect(snapshot.liquidAssets).toBe(50000)
  })
}) 
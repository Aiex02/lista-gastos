// hooks
import { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList } from 'react-native'

import { Header } from '../../components/Header'
import {
  Container,
  Transactions
} from './styles'

import { TransactionExpenses }
  from '../../components/TransactionsExpenses'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'


export function ListExpenses() {
  const [dataExpenses, setDataExpenses] =
    useState<SpendingStorageDTO[]>([])

  async function loadDataSpending() {
    const data = await spendingGetAll()
    setDataExpenses(data)
  }

  useFocusEffect(useCallback(() => {
    loadDataSpending()
  }, []))

  return (
    <Container>
      <Header title='Listagem de Gastos' />

      <Transactions>
        <FlatList
          data={dataExpenses}
          renderItem={({ item }) =>
            <TransactionExpenses data={item} />
          }
          showsVerticalScrollIndicator={false}
        />
      </Transactions>

    </Container>
  )
}

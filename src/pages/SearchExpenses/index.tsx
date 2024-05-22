import { useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Header } from '../../components/Header'
import { Container, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'
import { TransactionExpenses } from '../../components/TransactionsExpenses'

export function SearchExpenses() {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState<SpendingStorageDTO[]>([])

  async function handleSearchSpending() {
    if (category.trim() === '' && description.trim() === '') {
      return Alert.alert('Atenção', 'Digite uma categoria ou descrição para pesquisar')
    }

    const data = await spendingGetAll()
    const newData = data.filter(dat => {
      const categoryMatch = category.trim() !== '' ? dat.category.toUpperCase().includes(category.toUpperCase()) : true
      const descriptionMatch = description.trim() !== '' ? dat.name.toUpperCase().includes(description.toUpperCase()) : true
      return categoryMatch && descriptionMatch
    })

    if (newData.length === 0) {
      setCategories([])
      return Alert.alert('Atenção', 'Nenhum dado fornecido')
    }

    setCategories(newData)
  }

  return (
    <Container>
      <Header title='Pesquisa de Gastos' />

      <Input
        placeholder='Categoria'
        placeholderTextColor='#363F5F'
        onChangeText={value => setCategory(value)}
      />

      <Input
        placeholder='Descrição'
        placeholderTextColor='#363F5F'
        onChangeText={value => setDescription(value)}
      />

      <Button
        title='Pesquisar'
        onPress={handleSearchSpending}
      />

      <Transactions>
        <FlatList
          data={categories}
          renderItem={({ item }) => <TransactionExpenses data={item} />}
        />
      </Transactions>

    </Container>
  )
}

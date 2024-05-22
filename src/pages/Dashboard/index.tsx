import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import AsyncStorage
  from '@react-native-async-storage/async-storage'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputAmount } from '../../components/InputAmount'
import { InputDate } from '../../components/InputDate'
import { convertDate } from '../../utils/convertDate'
import { formatAmount } from '../../utils/formatAmount'
import { spendingCreate } from '../../spending/spendingCreate'
import { spendingGetAll } from '../../spending/spendingGetAll'


export function Dashboard() {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [datePurchase, setDatePurchase] = useState('')
  const [category, setCategory] = useState('')
  const [local, setLocal] = useState('')

  async function handleAddNewSpending() {

    // limpa o AsyncStorage no ios
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // alert('O programa sera finalizado')
    // return

    // limpa o AsyncStorage no android
    // await AsyncStorage.clear()
    // alert('O programa sera finalizado')
    // return
    if (name.trim() === '' || category.trim() === '') {
      return Alert.alert('Atenção', 'Por favor, preencha os campos de Descrição e Categoria.')
    }
    
    if (name === '' && amount === '' && datePurchase === '' &&
      category === '' && local === '') {
      return Alert.alert('Atencao', 'Favor preencha todos os campos !!!')
    }

    if (amount === 'R$0,00') {
      return Alert.alert('Atencao', 'O Valor não pode ser R$ 0,00')
    }


    const data = {
      name,
      amount: formatAmount(amount),
      datePurchase: convertDate(datePurchase),
      category,
      local
    }
    //console.log(data)
    setName('')
    setAmount('')
    setDatePurchase('')
    setCategory('')
    setLocal('')
    await spendingCreate(data)
    const result = await spendingGetAll()
    console.log(result)
  }

  return (
    <Container
    >
      <Header title='Controle de Gastos' />

      <ScrollView>
        <Input
          placeholder='Descrição'
          placeholderTextColor='#363F5F'
          value={name}
          onChangeText={value => setName(value)}
        />

        <InputAmount
          placeholder='Valor'
          placeholderTextColor='#363F5F'
          value={amount}
          onChangeText={value => setAmount(value)}
        />

        <InputDate
          placeholder='Data Compra'
          placeholderTextColor='#363F5F'
          value={datePurchase}
          onChangeText={value => setDatePurchase(value)}
        />

        <Input
          placeholder='Categoria'
          placeholderTextColor='#363F5F'
          value={category}
          onChangeText={value => setCategory(value)}
        />

        <Input
          placeholder='Local da Compra'
          placeholderTextColor='#363F5F'
          value={local}
          onChangeText={value => setLocal(value)}
        />

      </ScrollView>

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}
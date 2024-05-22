import AsyncStorage from "@react-native-async-storage/async-storage";

import { SpendingStorageDTO } from "./SpendingStorageDTO";

import { SPENDING_COLLECTION }
  from "../storage/storageConfig";

import { spendingGetAll } from "./spendingGetAll";

export async function spendingCreate(
  newSpending: SpendingStorageDTO) {
  try {
    const storageSpending = await spendingGetAll()

    const storage = [...storageSpending, newSpending]

    await AsyncStorage.setItem(SPENDING_COLLECTION,
      JSON.stringify(storage))
  } catch (error) {
    throw error;
  }
}
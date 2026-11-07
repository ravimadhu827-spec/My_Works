
import { createContext, useContext, useState } from 'react'

const FoodContext = createContext(null)

const initialFoods = [
  {
    id: 1,
    name: 'Rice',
    quantity: 5,
    unit: 'kg',
    expiryDate: '2026-11-15',
    category: 'Grains',
  },
  {
    id: 2,
    name: 'Milk',
    quantity: 2,
    unit: 'litres',
    expiryDate: '2026-10-22',
    category: 'Dairy',
  },
  {
    id: 3,
    name: 'Tomato',
    quantity: 1,
    unit: 'kg',
    expiryDate: '2026-10-21',
    category: 'Vegetables',
  },
]

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState(initialFoods)

  function addFood(food) {
    setFoods(previous => [...previous, { ...food, id: Date.now() }])
  }

  function updateFood(updatedFood) {
    setFoods(previous =>
      previous.map(food =>
        food.id === updatedFood.id ? updatedFood : food
      )
    )
  }

  function deleteFood(id) {
    setFoods(previous => previous.filter(food => food.id !== id))
  }

  return (
    <FoodContext.Provider value={{ foods, addFood, updateFood, deleteFood }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodContext)

  if (!context) {
    throw new Error('useFoods must be used inside FoodProvider')
  }

  return context
}

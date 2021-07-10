import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const productsAdapter = createEntityAdapter()
const {getInitialState} = productsAdapter


const initialState = getInitialState()

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addCards: productsAdapter.setAll,
    }
})


export default productsSlice.reducer

export const {addCards} = productsSlice.actions
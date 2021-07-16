import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const productsAdapter = createEntityAdapter()
const {getInitialState} = productsAdapter


const initialState = getInitialState()

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addCards: productsAdapter.addMany,
        addImages: productsAdapter.updateMany,
        addComments: productsAdapter.updateMany
    }
})


export default productsSlice.reducer

export const {addCards, addImages, addComments} = productsSlice.actions
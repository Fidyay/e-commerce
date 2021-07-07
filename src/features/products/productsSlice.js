import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit'

const productsAdapter = createEntityAdapter()
const {getInitialState} = productsAdapter


const initialState = getInitialState()

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addCard: productsAdapter.addOne,
        addComment: productsAdapter.upsertOne
    }
})


export default productsSlice.reducer

export const {addCard, addComment} = productsSlice.actions
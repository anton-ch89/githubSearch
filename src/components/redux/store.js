import { configureStore } from '@reduxjs/toolkit'
import data from './slices/dataSlice';
import search from './slices/searchSlice';
import cards from './slices/cardsSlice';
import pagination from './slices/paginationSlice';


export const store = configureStore({
    reducer: {
        data,
        search,
        cards,
        pagination
    },
});


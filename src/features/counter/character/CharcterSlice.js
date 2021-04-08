import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  characterList: [],
  nextPage: {},
  previousPage: {}
}



export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    character: (state, action) => {
      state.characterList = action.payload;
    },
    nextPage: (state, action) => {
      state.nextPage = action.payload.next;
      state.characterList = action.payload.results
    },
    previousPage: (state, action) => {
      state.previousPage = action?.payload?.previous
      state.characterList = action?.payload?.results
    },
  },

});

export const { character, nextPage, previousPage, } = characterSlice.actions;


export const selectAllCharacters = (state) => state.character?.characterList;

export const getNextPage = (state) => state.character?.nextPage

export const getPreviousPage = (state) => state.character?.previousPage


export const fetchCharacters = () => async (dispatch) => {
  const {data} = await axios.get('https://swapi.dev/api/people/')
  dispatch(character(data.results))
  dispatch(nextPage({
    next: data.next,
    results: data.results}
    ))
  dispatch(previousPage({
    previous: data.previous,
    results: data.results}
      ))
}

export const fetchNextPagination = (url) => async (dispatch) => {
  try {
    const {data} = await axios.get(url)
    const data2 = await axios.get(data.next)
    dispatch(nextPage({
      next: data2.data.next,
      results: data2.data.results}
      ))
    dispatch(previousPage({
      previous: data2.data.previous,
      results: data2.data.results}
      ))
  } catch (error) {
    console.error('Next Page Went Wrong')
  }
}

export const fetchPreviousPagination = (url) => async (dispatch ) => {
  try {
    const {data} = await axios.get(url)
    const data2 = await axios.get(data.previous)
    dispatch(previousPage({
      previous: data2.data.previous,
      results: data2.data.results}
      ))
    dispatch(nextPage({
      next: data2.data.next,
      results: data2.data.results}
      ))
  } catch (error) {
    console.error('Previous Page Went Wrong')
  }
}


export default characterSlice.reducer;

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
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    character: (state, action) => {
      state.characterList = action.payload;
    },
    nextPage: (state, action) => {
      state.nextPage = action.payload.next;
      state.characterList = action.payload.results
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    previousPage: (state, action) => {
      state.previousPage = action?.payload?.previous
      state.characterList = action?.payload?.results
    },
  },

});

export const { character, nextPage, previousPage, incrementByAmount } = characterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
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
    console.log(data.next)
    const data2 = await axios.get(data.next)
    console.log('this is fetch', data2)
    dispatch(nextPage({
      next: data2.data.next,
      results: data2.data.results}
      ))
    dispatch(previousPage({
      previous: data2.data.previous,
      results: data2.data.results}
      ))
  } catch (error) {
    console.error('')
  }
}

export const fetchPreviousPagination = (url) => async (dispatch ) => {
  try {
    const {data} = await axios.get(url)
    console.log(data.next)
    const data2 = await axios.get(data.previous)
    console.log('this is data2', data2)
    dispatch(previousPage({
      previous: data2.data.previous,
      results: data2.data.results}
      ))
    dispatch(nextPage({
      next: data2.data.next,
      results: data2.data.results}
      ))
  } catch (error) {
    console.error('NEXT PAGE NOT WORKING')
  }
}


// export const fetchCharacterProfile = () => async (dispatch,index) => {
//   const {data} = await axios.get(`https://swapi.dev/api/people/${index}`)
//   dispatch(profile(data.results))
// }

export default characterSlice.reducer;

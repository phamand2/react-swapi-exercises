import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCharacters,
  fetchNextPagination,
  fetchPreviousPagination,
  getNextPage,
  getPreviousPage,
  selectAllCharacters,
} from "../features/counter/character/CharcterSlice";
import { Container, Box, List, Section, Heading, Pagination } from "react-bulma-components";



const CharacterList = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const next = useSelector(getNextPage)
  const previous = useSelector(getPreviousPage)
  const [currentPage, setCurrentPage] = useState('https://swapi.dev/api/people/')


  const handleNextClick = () => {
    dispatch(fetchNextPagination(currentPage))
    setCurrentPage(next)
  }

  const handlePreviousClick = () => {
    dispatch(fetchPreviousPagination(currentPage))
    setCurrentPage(previous)
  }

  useEffect(() => {
    dispatch(fetchCharacters());
  }, []);


  return (
    <Container fluid>
      <Section>
        <Heading>Star Wars Characters</Heading>
      </Section>
    <Box>
      <List hoverable>
        {characters?.map((character, index) =>  (
          <Link key={index} to={`/profile/${index}`}><List.Item>{character.name}</List.Item></Link>
        ))}
      </List>
      <hr />
      <button disabled={previous === null} onClick={handlePreviousClick}>Previous Page</button>
      <button disabled={next === null} onClick={handleNextClick}>Next Page</button>
    </Box>

    </Container>
  );
};

export default CharacterList;

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCharacters } from "../features/counter/character/CharcterSlice";
import { Card, Col, Container, Row } from "react-bootstrap";

const CharacterProfile = () => {
  const characters = useSelector(selectAllCharacters);

  const { id } = useParams();

  const {
    name,
    height,
    birth_year,
    films,
    gender,
    hair_color,
    skin_color,
    eye_color,
  } = characters[id];

  return (
   <h1>profile</h1>
  );
};

export default CharacterProfile;

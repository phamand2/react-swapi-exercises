import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCharacters } from "../features/counter/character/CharcterSlice";
import { Container, Hero, Card, Media, Heading, Content, Image, Section } from "react-bulma-components";
import './CharacterProfile.css'
import Nav from "./Nav";


const CharacterProfile = () => {
  const characters = useSelector(selectAllCharacters);

  const { id } = useParams();

  const {
    name,
    height,
    birth_year,
    hair_color,
    created
  } = characters[id];

  return (
    <Container fluid>
      <Nav />
      <Hero className='hero' color='primary'>
        <Heading>Welcome To {name} Profile Page</Heading>
      </Hero>
      <Section>
      <Card>
      <Card.Header>
        <Card.Header.Title>Character</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <Media>
          <Media.Item renderAs="figure" position="left">
            <Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
          </Media.Item>
          <Media.Item>
            <Heading size={4}>{name}</Heading>
            <Heading subtitle size={6}>@{name}</Heading>
          </Media.Item>
        </Media>
        <Content>
          Hi my name is {name}, I am {height}in tall with a hair color of {hair_color}. My birth year is {birth_year}
          <br />
          Created: <time dateTime="2016-1-1">{created}</time>
        </Content>
      </Card.Content>
    </Card>
    </Section>
    </Container>
  );
};

export default CharacterProfile;

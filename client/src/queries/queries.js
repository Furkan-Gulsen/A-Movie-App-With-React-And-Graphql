import { gql } from 'apollo-boost';

export const DIRECTORS = gql`
  {
    directors{
      id,
      name
    }
  }
`;

export const GET_MOVIE = gql`
  {
    movies{
      id,
      title,
      description,
      year
    }
  }
`;

export const GET_MOVIE_ID = gql`
  query($id:String!){
    movie(id:$id){
      id,
      title,
      description,
      year,
      director{
        name,
        movies{
          id,
          title
        }
      }
    }
  }
`

export const ADD_MOVIE = gql`
  mutation($title: String!,$description: String,$year: Int!,$directorId: String!){
    addMovie(title:$title, description:$description, year:$year, directorId:$directorId){
      title
    }
  }
`
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
  {
    movies{
      title,
      description,
      year,
    }
  }
`;

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return(
    <div>
      <h4>Movie List</h4>
   
        {
          data.movies.map(movie => (
            <div key={movie.title} style={{'border':'2px solid #262626','width':'200px','textAlign':'center','margin':'10px','float':'left','padding':'10px'}}>
              <h3>{movie.title}</h3>
              <label>{movie.year}</label>
              <div>{movie.description}</div>
            </div>
            ) 
          )
        }
      
    </div>
  )

}

export default ExchangeRates;
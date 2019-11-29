import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import {DIRECTORS, GET_MOVIE, ADD_MOVIE} from '../queries/queries'

const AddMovie = () => {
  const [df,setDf] = useState({
    title: '',
    description: '',
    year: '',
    directorId: ''
  })
  const { loading, error, data } = useQuery(DIRECTORS);
  const [addMovie,{ loading: mutationLoading, error: mutationError }] = useMutation(ADD_MOVIE);
  if (loading) return <option disabled={true}>Loading...</option>;
  if (error) return <option disabled={true}>Error...</option>;
  const onchange = (e) => {
    setDf({
      ...df,
      [e.target.name]: e.target.value
    })
  } 
  return (
    <div className='container' data-state='New Movie'>
      <div className='device' data-view='list'>
        <form onSubmit={ e => {
          e.preventDefault()
          addMovie({
            variables:{
              title: df.title,
              description: df.description,
              year: parseInt(df.year,10),
              directorId: df.directorId
            },
            refetchQueries: [{ query: GET_MOVIE }]
          });
        }}>
          <div>
            <input type='text' name='title' onChange={onchange} placeholder='title'/>
          </div>
          <div>
            <textarea type='text' name='description' onChange={onchange} placeholder='description'/>
          </div>
          <div>
            <input type='number' name='year' onChange={onchange} placeholder='year'/><br/>
          </div>
            <select name='directorId' onChange={onchange}>
              <option disabled={true}>Choose Director</option>
              {
                data.directors.map(({id,name}) => (
                  <option key={id} value={id}>{name}</option>
                ))
              }
            </select>
          <div>
          </div>
          <button type='submit'>ADD</button>
        </form>
      </div>
      { mutationLoading && <div>Loading...</div>}
      { mutationError && <div>Error!</div>}
    </div>
  )
}

export default AddMovie
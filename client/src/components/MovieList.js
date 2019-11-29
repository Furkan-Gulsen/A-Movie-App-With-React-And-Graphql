import React, { useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_MOVIE,  GET_MOVIE_ID} from '../queries/queries'
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css'

function DogPhoto({id}) {
  const { loading, error, data } = useQuery(GET_MOVIE_ID, {
    variables: {
      id:id
     },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <h3>{data.movie.title}</h3>
      <ul className="director-list">
      <p>{data.movie.year}</p>
      <p>{data.movie.description}</p>      
      <h4>{ data.movie.director.name }</h4>
      {
        data.movie.director.movies.map(movie => (
          <li key={movie.id}>
            <div className="bg"></div>
            <div className="title">{movie.title}</div>
          </li>
        ))
      }
      </ul>
    </div>
  );
}

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(GET_MOVIE);
  const[modalSet,setModalSet] = useState({
    loading: false,
    visible: false,
    activeId: ''
  });

  const showModal = (id) => {
    setModalSet({
      visible: true,
      activeId: id
    });
  };

  const handleOk = e => {
    setModalSet({
      loading: true
    });
    setTimeout(() => {
      setModalSet({
        loading: false,
        visible: false
      });
    },3000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return(
    <div className='container' data-state='Movie App'>
      <div>
        <Modal
          visible={modalSet.visible}
          title="Detail"
          footer={[
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
          <DogPhoto id={modalSet.activeId}/>
        </Modal>
      </div>
      <div className='device' data-view='list'>
        <ul className='layer' data-layer='list'>
        {
          data.movies.map(movie => (
            <li className='content' key={movie.title} onClick={() => {
              showModal(movie.id)
            }}>
              <div className='bg'></div>
              <div className='avatar'></div>
              <div className='title'>{movie.title}</div>
              <p>{movie.description}</p>
            </li>
            ) 
          )
        }
        </ul>
      </div>
    </div>
  )

}

export default ExchangeRates;
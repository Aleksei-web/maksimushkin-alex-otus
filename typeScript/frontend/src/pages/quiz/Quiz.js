import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import axios from 'axios';

const Quiz = ({match}) => {
  const [rating, setRating] = useState(10)
  const [inputValue, setInputValue] = useState('')
  const [show, setShow] = useState(false);
  const [nameCompany, setNameCompany] = useState('')

  const history = useHistory()
  const {url} = match.params

  useEffect(() => {
    document.title = "Oценка компании"
    axios.get(`http://192.168.1.150:35512/quiz/${url}`).then(res => {
      if(res.data.status === 400) {
        history.push('/error')
      } else {
        setNameCompany(res.data)
        setShow(true)
      }
    }).catch(err => {
      document.title = "Ошибка"
      history.push('/error')
    })
    
  }, [])
  
  document.title = `Oценка компании/${nameCompany}`;
  const changeRating = (e) => {
    setRating(e)
    console.log(e);
  }

  const handleClick = (e) => {
    e.preventDefault()
    axios.post(`http://192.168.1.150:35512/quiz/${url}`, {rating, comment: inputValue})
      .then(res => {
        if(res.status === 200) {
          history.push('/bye')
        }
      })
      .catch(e => {
        console.log(e.message);
      })
  }

  return ( 
    <>

    <div className='mt-5'>
      { !show ? (<h1>Загрузка...</h1>) : (
        <>
        {nameCompany && <h1>{nameCompany}</h1>}
        
        <div> <h4>Какова вероятность того, что вы порекомендуете нас другу или коллеге?</h4></div>
        <StarRatings
            onClick={() => console.log(111)}
            className='m-2'
            rating={rating}
            starRatedColor="red"
            changeRating={changeRating}
            numberOfStars={10}
            name='blue'
          />

        <div className="input-group m-2" style={{width: '50%'}}>
          <span className="input-group-text">Оставьте комментарий</span>
          <textarea 
            className="form-control"
            aria-label="With textarea"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        <button 
          className="btn btn-outline-info"
          onClick={handleClick}
        >
          Отправить
        </button>
      </>
      )}
    </div>
</>
    ) 
}

export default Quiz

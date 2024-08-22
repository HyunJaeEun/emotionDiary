import { useState } from 'react'
import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useReducer, useRef,createContext  } from 'react';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';

import Button from './components/Button';
import Header from './components/Header';

import { getEmotionImage } from './util/get-emotion-image';

const mockData = [
  { id : 1,
    createdDate : new Date().getTime(),
    emotionId : 1,
    content :"1번 일기 내용"
  },
  { id : 2,
    createdDate : new Date().getTime(),
    emotionId : 2,
    content :"2번 일기 내용"
  }
];

function reducer(state,action){
  switch(action.type){
    case "CREATE" : 
      return [action.data,...state];
    case "UPDATE" :
      return state.map((item) => String(item.id) === String(action.data.id) ? action.date : item);
    case "DELETE" :
      return state.filter((itme) => String(item.id !== String(action.data.id)));
    default : return ;
  }
}

function App() {
  const [data,dispatch] = useReducer(reducer , mockData);
  const idRef = useRef(3);

  const DiaryStateContext = createContext();
  const DiaryDispatchContext = createContext();
  
  const onCreate = (createdDate,emotionId,content) =>{
    dispatch({
      type:"CREATE",
      data : {
        id : idRef.current++,
        createdDate,
        emotionId,
        content,

      }
    })
    //새로운일기 추가
  };

  //기존일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type:"UPDATE",
      data:{
        id, createdDate, emotionId, content
      }
    })
  };

  //기존일기 삭제
  const onDelete = (id)=>{
    dispatch({
      type:"DELETE",
      data: id
    })
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/new' element={<New />}/>
            <Route path='/diary/:id' element={<Diary/>}/>
            <Route path='/edit/:id' element={<Edit/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}


export default App

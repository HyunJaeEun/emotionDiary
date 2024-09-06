import "./Editor.css";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";


const Editor = ({initData,onSubmit}) =>{

    const nav = useNavigate() ;

    useEffect(()=>{
         if(initData){
            setInput({...initData,
                createdDate : new Date(Number(initData.createdDate)),
            });
         }
    },[initData])

    const[input,setInput] = useState({
        createdDate : new Date(),
        emotionId : 3,
        content : ''
    });

    const onChangeInput = (e) =>{

        let name = e.target.name;
        let value = e.target.value;

        if(name === 'createdDate'){
            value = new Date(e.target.value);
        }

        setInput({...input,
            [name] : value,
        });
    }
    
    const onClickSubmitButton = () =>{
        onSubmit(input);
    }

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input 
                    name="createdDate"
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)} type="date"/>
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_wrapper">
                    {emotionList.map((item)=>
                     <EmotionItem 
                        onClick={()=>onChangeInput({
                            target:{
                                name:"emotionId",
                                value: item.emotionId,
                            } 
                        })}
                        key={item.emotionId} {...item} isSelected={input.emotionId===item.emotionId}/>)}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea name="content" value={input.content} onChange={onChangeInput} placeholder="오늘은 어땠나요?"/>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={()=> nav(-1)}/>
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmitButton} />
            </section>
        </div>
    );
}

export default Editor;
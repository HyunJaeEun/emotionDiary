import { useParams,useNavigate } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { DiaryDispatchContext,DiaryStateContext } from "../App";
import Header from "../components/Header";
import Editor from "../components/Editor";
import Button from "../components/Button";
import DiaryItem from "../components/DiaryItem";
import useDiary from "../hooks/useDiary";

const Edit = ({id}) => {
    const params = useParams();
    const nav = useNavigate();
    const {onDelete,onUpdate} = useContext(DiaryDispatchContext);
   
    const curDiaryItem = useDiary(params.id);

    const onClickDelete = () =>{
        if(window.confirm("일기를 정말 삭제할까요?\n다시 복구되지 않아요.")){
            
            //일기삭제 로직
            onDelete(params.id);
            nav('/',{replace:true})
        };
    }

    const onSubmit = (input) =>{
        if(window.confirm("일기를 정말 수정할까요?")){
            onUpdate(params.id,
                input.createdDate.getTime(),
                input.emotionId,
                input.content);

            nav("/",{replace:true});
        };
    };

    return (
        <div>
            <Header title={"일기 수정하기"} 
                leftChild={<Button text={"< 뒤로가기"} onClick={() =>nav(-1)}/>}
                rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"}/>}
                />
            <Editor initData={curDiaryItem} onSubmit={onSubmit}/>
        </div>
    );
}

export default Edit;
import React from 'react'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'
import Options from '../Option/options.jsx'
import './question.css'
export default function questions({data,setData,setNewGame}){
    const Data=data //all data from api imported from app component via questions method
    const[submit , SetSubmit]= React.useState(false) //when i click on submit and all questions are attempted toMatch array will be updated then it will be true 
    const[submitAttempt , setSubmitAttempt]= React.useState(false)//it will be true if all ques  attempted in handleSubmit ,if it is true then no warning ,if false because of unattempt show warning
    const[qna,setQna]=React.useState(randomArray(Data)) //it is an array of indexes for coorect answer of every question
    const[key,setKey]=React.useState(qna) //copy of qna
    const[score,setScore]=React.useState(0)
    const[toMatch,setMatch]=React.useState(Array(5).fill(-1))//array which stores indexes of options when clicked ,whenever u click on any option it will store the index of that option in this array at specific location ,if u click on 2nd option it will update this array with 2 on for that question
   
/* rhis method is used for getting random indexes for correct answer to be positioned if the type of ques is boolean it will have only 2 option */
function randomArray(data){ 
     let arr=[]
     
    for(let i=0;i<5;i++){
        if(data[i].type==='boolean')
            arr.push(Math.floor(Math.random()*2))
        else
            arr.push(Math.floor(Math.random()*4))
    }
        return arr
    
    }/*ends randomarray*/
    
function getOptions(correctIndex,quesIndex){//this will generate options for 1 question and map over it and for each option we use option component,in this mapping correctIndex and ques index is the values and index of qna mapping 
let optionArray=[]
let k=0;
let n
if(Data[quesIndex].type=='boolean')
n=2
else 
n=4
for(let i=0;i<n;i++){
    if(i==correctIndex){
        optionArray.push(Data[quesIndex].correct_answer)
    }else{
        optionArray.push(Data[quesIndex].incorrect_answers[k++])
    }
}
return optionArray.map((optionValue,optIndex)=>{
    return (
        
        <Options 
        key={nanoid()}
        oneOption={optionValue}
        optIndex={optIndex}
        quesIndex={quesIndex}
        rightOption={key[quesIndex]===optIndex}
        toMatch={toMatch}
        handleOption={handleOption}
        
        submit={submit}
        />
        
    )
})
}/*get option ends here */
function handleOption(e){
    let newMatch=toMatch
const selectedOption=parseInt(e.target.value)
const quesindex=parseInt(e.target.name)
        newMatch[quesindex]=selectedOption
        setMatch(newMatch)   
}
/*hanldeoption ends */
 
function handleSubmit(e){
     //check if all the options are selected
    e.preventDefault()
    if(!toMatch.includes(-1)&& !submit){
        let score=0
        for(let i=0;i< key.length; i++){
            if(toMatch[i]===qna[i]){
                score++;
            }
        }
        setScore(score)
        setQna(randomArray(Data))
        setKey(qna)
        SetSubmit(true)
        setSubmitAttempt(false)
    }
    else{
        setSubmitAttempt(true)
    }
}

function handleNewGame(){
    setNewGame((prev)=>!prev)
    setData(null)
    setMatch(Array(5).fill(-1))
    SetSubmit(false)
    setScore(0)

}
const QNA=qna.map((correctIndex,quesIndex)=>{
    
    let quest=decode(Data[quesIndex].question)
    return (
        
        <div key={nanoid()} className='item'>
            <p>{quesIndex+1}. {quest}</p>
            <div className='Options'>
                      {getOptions(correctIndex,quesIndex)}
                    </div>
          </div>
         
    )
})
    return (
        <form onSubmit={handleSubmit} noValidate>
        <div className="quiz">
            {QNA}
        </div>
        <footer>
            {submitAttempt && <div className="warning"><p>please attempt all questions</p></div> }
           {submit &&  <div className="score">You Scored {score}/{key.length}</div> }
            <button className='btn-quiz' type='submit'>Submit Quiz</button>
            {submit && <button className='btn-quiz' onClick={handleNewGame}>play again</button>}
        </footer>
        
        </form>
    )
    }
import React from 'react'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'
import './options.css'
export default function options({oneOption,optIndex,quesIndex,toMatch,rightOption,submit,handleOption}){
return (
   
                <label className='label' 
                key={nanoid()} htmlFor={`q${quesIndex}o${optIndex}`}> 
               <input 
               key={nanoid()}
                id={`q${quesIndex}o${optIndex}`} 
                type='radio'
                 name={quesIndex} 
                 value={optIndex} 
                 disabled={submit}
                onChange={handleOption} 
                required
                />
                    <div id="onewe" 
                    className={submit && rightOption?"green" :submit && toMatch[quesIndex] ===optIndex ? "red" : "select"} >
                    <p className='opt'>{decode(oneOption)}</p>
                        </div>
               
               </label>
      
)
}
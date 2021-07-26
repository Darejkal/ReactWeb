import React, { useState } from 'react'
import ScreenFiller from '../parts/ScreenFiller';
import { POST_USER_LINK, CODE, Answer, DELETE_USER_LINK } from '../Accessibility';
export type UserRemoveProps = { }
export const UserRemove: React.FC<UserRemoveProps> = ({ }) => {
    const [userID,setUserID]=useState("thanhnam12@gmail.com");
    const [classID,setClassID]=useState("12TN1");
    const [schoolID,setSchoolID]=useState("tpc");
    //TODO:remove
    const [tempHolder,setHolder]=useState<any>("");
    const [editable,setEditable]=useState(true);
    const onHandleFuncChange = (e:React.ChangeEvent<HTMLInputElement>,callback:(val:string)=>any)=>{
        callback(e.target.value)
    }
    return (
        <div>
        {!editable?<ScreenFiller/>:<div/>}
        <form className="InputForm">
        <p>User to remove</p>
        <input 
        value={userID}
        onChange={(e)=>onHandleFuncChange(e,setUserID)}
        type="text"  placeholder="Email"/>
        <input type="text"  
        placeholder="ClassID"
        value={classID}
        onChange={(e)=>onHandleFuncChange(e,setClassID)}/>
        <input type="text"  
        placeholder="SchoolID"
        value={schoolID}
        onChange={(e)=>onHandleFuncChange(e,setSchoolID)}/>
        <button
        onClick={
            async (e)=>{
                e.preventDefault();
                setEditable(false);
                console.log(JSON.stringify({
                  "userID":userID,
                  "classID":classID,
                  "schoolID":schoolID
                }))
                const respone = await fetch(DELETE_USER_LINK, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      "userID":userID,
                      "classID":classID,
                      "schoolID":schoolID
                    })
                    });
                    if(respone.ok)
                    respone.json().then(
                        (answer:Answer)=>{
                          setHolder(answer)
                        switch(answer.internalStatus){
                        case CODE.SUCCESS:
                          alert(`User with the info: \nEmail ${userID}\nClass' ID:${classID} \nSchool's ID: ${schoolID}\n is now removed`);
                          setUserID("");
                          setClassID("")
                          setSchoolID("")
                          setEditable(true);
                          break;
                        // case CODE.NULL:
                        //   alert(`All input cannot be empty`);
                        //   setEditable(true);
                        //   break;
                        case CODE.NOT_EXISTED:
                          alert(`Email  ${userID} is not linked to any accounts. Please make sure what you typed in is correct.`);
                          setEditable(true);
                          break;
                        case CODE.FAILED:
                          alert(`Unknown error`);
                          setEditable(true);
                          break;
                        default:
                          throw "Unknown code";
                        }
                      }
                    ).catch(e=>{
                      alert(`Unknown error`);
                      setEditable(true);
                        console.log(`Error while deleting user: ${e}`)
                    })
                    else
                        alert("Error while connecting to server")
                        setEditable(true);
                    }
            }
        >Remove</button>
        </form>
        </div>
    )
};

export default UserRemove;
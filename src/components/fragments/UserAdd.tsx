export default function userAddIsDeprecated(){}
// import React, { useState } from 'react'
// import { POST_USER_LINK, CODE } from '../Accessibility';
// // import { deprecate } from 'util';
// export type UserAddProps = { 

// }
// // @deprecated
// export const UserAdd: React.FC<UserAddProps> = ({ }) => {
//   const [email,setEmail]=useState<string>();
//   const [classID,setClassID]=useState<string>();
//   const [username,setUsername]=useState<string>();
//   const [password,setPassword]=useState<string>();
//   const [showPassword,setShowPassword] = useState(false);
//   const [editable,setEditable] = useState(true)
//   const [schoolID,setSchoolID] = useState<string>();
//     // console.log("reload");
//     return( 
//       <div>
//       {!editable?<div id="screenFiller" />:<div/>}
//       <form className="InputForm">
//         <text>Create new user</text>
//         <input type="text" 
//         value ={email}
//         onChange={(e)=>setEmail(e.target.value)}
//         placeholder="Email"/>
//         <input type="text" 
//         value ={schoolID}
//         onChange={(e)=>setSchoolID(e.target.value)}
//         placeholder="Your school ID"/>
//         <input type="text" 
//         value ={classID}
//         onChange={(e)=>setClassID(e.target.value)}
//         placeholder="Your class ID"/>
//         <input type="text" 
//         value ={username}
//         onChange={(e)=>setUsername(e.target.value)}
//         placeholder="New username"/>
//         <div>
//         <input value={password} onChange={(e)=>{
//           // e.preventDefault();
//           setPassword(e!.target.value);
//           }} type={showPassword?"text":"password"} placeholder="New password"/>
//         <button  
//         onClick={(e)=>{
//           e.preventDefault();
//         }}
//         onMouseDown={(e)=>{
//           e.preventDefault();
//           setShowPassword(true)}}
//           onMouseUp={
//             (e)=>{
//           e.preventDefault();
//           setShowPassword(false)
//             }
//           }>SHOW</button>
//         </div>
//         <button
//         onClick={async (e)=>{
//         console.log("button clicked")
//         e.preventDefault();
//         setEditable(false);
//         const userHolder = {
//             email: email,
//             name: username,
//             password:password,
//             classID:classID,
//             schoolID:schoolID
//         }
//         console.log(userHolder)
//         const respone = await fetch(POST_USER_LINK, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userHolder)
//         });
//         if(respone.ok)
//         respone.json().then(
//             (answer:Answer)=>{
//             switch(answer.success){
//             case CODE.SUCCESS:
//               alert(`user added: ${userHolder.name}`);
//               break;
//             case CODE.NULL:
//               alert(`All input cannot be empty`);
//               break;
//             case CODE.EXISTED:
//               alert(`Email  ${userHolder.email} is already linked to another account`);
//               break;
//             case CODE.FAILED:
//               alert(`Unknown error`);
//               break;
//             default:
//               throw "Unknown code";
//             }
//           }
//         ).catch(e=>{
//           alert(`Unknown error`);
//             console.log(`Error while posting user: ${e}`)
//         })
//         else
//             alert("Error while connecting to server")
//         }}>Add</button>
//         </form> 
//       </div>
//       )
// };
// export type UserData ={
//   email: string,
//   name: string,
//   password:string,
//   classID:string,
// }
// type Answer = {
//   success:string,
// }
// export default UserAdd;
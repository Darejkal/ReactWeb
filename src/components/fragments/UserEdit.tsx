import React from 'react'
import { POST_USER_LINK, CODE, Answer, PUT_USER_LINK, VALIDATE_USER_LINK } from '../Accessibility';
import ScreenFiller from '../parts/ScreenFiller';
export type UserAdd2Props = {}
// export type UserAdd2State ={
//     email:string,
//     name:string,
//     classID:string,
//     password:string,
//     editable:boolean,
// }
export interface UserAdd2State {
  userID: string,
  oldUserID: string,
  username: string,
  classID: string,
  oldClassID: string,
  password: string,
  editable: boolean,
  showPassword: boolean,
  schoolID: string,
  oldSchoolID: string,
}
export class UserAdd2 extends React.Component<UserAdd2Props, UserAdd2State> {
  constructor(props: UserAdd2Props) {
    super(props);
    this.state = {
      // userID: "",
      // username: "",
      // classID: "",
      // password: "",
      // editable: true,
      // showPassword: false,
      // schoolID: ""
      oldUserID:"thanhnam12@gmail.com",
      oldClassID:"12TN1",
      oldSchoolID:"tpc",
      userID: "thanhnam12@gmail.com",
      username: "xamlon",
      classID: "12TN1",
      password: "sdad",
      schoolID: "tpc",
      editable: true,
      showPassword: false,
    }
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value })
  }
  resetInput() {
    this.setState({
      userID: "",
      username: "",
      classID: "",
      password: "",
      schoolID: "",
      oldClassID:"",
      oldSchoolID:"",
      oldUserID:"",
      editable: true

    })
  }
  render() {
    return (
      <div>
        {!this.state.editable ? <ScreenFiller /> : <div />}
        <form className="InputForm">
            <p>User to edit</p>
            <input type="text"
            name="oldUserID"
            value={this.state.oldUserID}
            onChange={this.handleChange.bind(this)}
            placeholder="User's CURRENT ID (Email)" />
            <input type="text"
              name="oldSchoolID"
              value={this.state.oldSchoolID}
              onChange={this.handleChange.bind(this)}
              placeholder="CURRENT SchoolID" />
            <input type="text"
              name="oldClassID"
              value={this.state.oldClassID}
              onChange={this.handleChange.bind(this)}
              placeholder="CURRENT ClassID" />
          <p>New information:</p>
          <input type="text"
            name="userID"
            value={this.state.userID}
            onChange={this.handleChange.bind(this)}
            placeholder="User's ID (Email)" />
            <input type="text"
              name="schoolID"
              value={this.state.schoolID}
              onChange={this.handleChange.bind(this)}
              placeholder="School ID" />
            <input type="text"
              name="classID"
              value={this.state.classID}
              onChange={this.handleChange.bind(this)}
              placeholder="ClassID" />
            <input type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange.bind(this)}
              placeholder="New username" />
            <div>
              <input
                name="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
                type={this.state.showPassword ? "text" : "password"} placeholder="New password" />
              <button
                name="showPassword"
                onClick={(e) => {
                  e.preventDefault();
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  this.setState({ showPassword: true });
                }}
                onMouseUp={
                  (e) => {
                    e.preventDefault();
                    this.setState({ showPassword: false });
                  }
                }>SHOW</button>
            </div>
            <button
              onClick={async (e) => {
                console.log("mamy")
                e.preventDefault();
                this.setState({ editable: false });
                const oldUserHolder ={
                  userID:this.state.oldUserID,
                  classID:this.state.oldClassID,
                  schoolID:this.state.oldSchoolID,
                }
                console.log("-----------------------------------donefetching")
                fetch(VALIDATE_USER_LINK, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(oldUserHolder)
                }).then((response)=>{
                  if(!response.ok)
                  {
                    alert("Error while connecting to server")
                    this.setState({ editable: true });
                    return
                  } 
                  response.json().then((answer:{internalStatus:string,_isValid:boolean})=>
                  {
                    if(answer.internalStatus===CODE.FAILED)
                    {
                      alert(`Unknown error`);
                      return
                    } else if(answer.internalStatus===CODE.NOT_EXISTED||!answer._isValid){
                      alert(`Email  ${oldUserHolder.userID} is not yet linked to any known account of class ${oldUserHolder.classID} (school ${oldUserHolder.schoolID}). If you intent to add an user, please select +.`);
                      return
                    }
                const userHolder = {
                  userID: this.state.userID,
                  username: this.state.username,
                  password: this.state.password,
                  classID: this.state.classID,
                  schoolID:this.state.schoolID,
                }
                const isLegit = Object.values(userHolder).every(x=>(x&&x!==""))
                if(!isLegit) {
                  alert(`All input cannot be empty`);
                  this.setState({ editable: true });
                  console.log("hello")
                  console.log(JSON.stringify(userHolder))
                  return
                }
                console.log(JSON.stringify(userHolder))
                console.log("-----------------------------------donefetching")
                fetch(PUT_USER_LINK, {
                  method: 'PUT',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userHolder)
                }
                ).then((_respone)=>{
                  if (_respone.ok){
                  _respone.json().then(
                    (_answer: Answer) => {

                      switch (_answer.internalStatus) {
                        case CODE.SUCCESS:
                          alert(`User edited:\n
                          Current username:${userHolder.username}\n
                          Current email/User's ID:${userHolder.userID}\n
                          Current class:${userHolder.classID}\n
                          Current school:${userHolder.schoolID}\n
                          Current password:${userHolder.password}
                          `
                          );
                          this.resetInput();
                          break;
                        // case CODE.NULL:
                        //   alert(`All input cannot be empty`);
                        //   this.setState({ editable: true });
                        //   break;
                        case CODE.FAILED:
                          alert(`Unknown error`);
                          this.setState({ editable: true });
                          break;
                        default:
                          throw "Unknown code:   "+ _answer.internalStatus;
                      }
                    }
                  ).catch(e => {
                    alert(`Unknown error 101`);
                    this.setState({ editable: true });
                    console.log(`Error while posting user: ${e}`)
                  })}
                else{
                  alert("Error while connecting to server")
                  this.setState({ editable: true });
              }
                }).catch((err)=>{
                  alert("Error while connecting to server")
                  this.setState({ editable: true });
                })
            })
            })
              }}>Sumbit Edit</button>
          </form> 
      </div>
        )
};
};
      export type UserData ={
        userID: string,
        username: string,
        password:string,
        classID:string,
        schoolID:string,
  }

        export default UserAdd2;

import React from 'react'
import { POST_USER_LINK, CODE, Answer } from '../Accessibility';
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
  username: string,
  classID: string,
  password: string,
  editable: boolean,
  showPassword: boolean,
  schoolID: string,
  tempObj:Object|null
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
      userID: "thanhnam12@gmail.com",
      username: "xamlon",
      classID: "12TN1",
      password: "sdad",
      schoolID: "tpc",
      editable: true,
      showPassword: false,
      tempObj:null
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
      editable: true

    })
  }
  render() {
    return (
      <div>
        {!this.state.editable ? <ScreenFiller /> : <div />}
        <form className="InputForm">
          <p>User to create</p>
          <input type="text"
            name="userID"
            value={this.state.userID}
            onChange={this.handleChange.bind(this)}
            placeholder="User's ID (Email)" />
            <input type="text"
              name="schoolID"
              value={this.state.schoolID}
              onChange={this.handleChange.bind(this)}
              placeholder="SchoolID" />
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
                const userHolder = {
                  userID: this.state.userID,
                  username: this.state.username,
                  password: this.state.password,
                  classID: this.state.classID,
                  schoolID:this.state.schoolID
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
                fetch(POST_USER_LINK, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userHolder)
                }
                ).then((respone)=>{
                  if (respone.ok){
                  respone.json().then(
                    (answer: Answer) => {

                      switch (answer.internalStatus) {
                        case CODE.SUCCESS:
                          alert(`User added:\nUsername:${userHolder.username}\nEmail/User's ID:${userHolder.userID}`);
                          this.resetInput();
                          break;
                        // case CODE.NULL:
                        //   alert(`All input cannot be empty`);
                        //   this.setState({ editable: true });
                        //   break;
                        case CODE.EXISTED:
                          alert(`Email  ${userHolder.userID} is already linked to another account. If you want to change user's profile, please select edit.`);
                          this.setState({ editable: true });
                          break;
                        case CODE.FAILED:
                          alert(`Unknown error`);
                          this.setState({ editable: true });
                          break;
                        default:
                          throw "Unknown code:   "+ answer.internalStatus;
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
                
              }}>Add</button>
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
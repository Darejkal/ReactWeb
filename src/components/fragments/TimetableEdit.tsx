import React from 'react'
import { POST_USER_LINK, CODE, Answer, TIMETABLE_EDIT_LINK } from '../Accessibility';
import ScreenFiller from '../parts/ScreenFiller';
export type TimetableEditProps = {}
// export type TimetableEditState ={
//     email:string,
//     name:string,
//     classID:string,
//     password:string,
//     editable:boolean,
// }
export interface TimetableEditState {
  Mon: string,
  Tue: string,
  Wed: string,
  Thu: string,
  Fri: string,
  Sat: string,
  Sun: string,
  classID: string,
  editable: boolean,
  schoolID: string,
  tempObj: Object | null
}
export class TimetableEdit extends React.Component<TimetableEditProps, TimetableEditState> {
  constructor(props: TimetableEditProps) {
    super(props);
    this.state = {
      Mon: "dsdsd",
      Tue: "dsd",
      Wed: "dsd",
      Thu: "ds",
      Fri: "dsd",
      Sat: "ds",
      Sun: "ds",
      schoolID: "tpc",
      classID: "12TN6",
      editable: true,
      tempObj: null
    }
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value })
  }
  resetInput() {
    this.setState({
      Mon: "",
      Tue: "",
      Wed: "",
      Thu: "",
      Fri: "",
      Sat: "",
      Sun: "",
      classID: "",
      schoolID: "",
      editable: true

    })
  }
  render() {
    return (
      <div>
        {!this.state.editable ? <ScreenFiller /> : <div />}
        <form className="InputForm">
          <p>Enter class to edit timetable from</p>
          <input type="text"
            name="classID"
            value={this.state.classID}
            onChange={this.handleChange.bind(this)}
            placeholder="ClassID" />
          <input type="text"
            name="schoolID"
            value={this.state.schoolID}
            onChange={this.handleChange.bind(this)}
            placeholder="schoolID" />
          <p>Enter the new timetable's details by day (Each subject should be separated by a space)</p>
          <input type="text"
            name="Mon"
            value={this.state.Mon}
            onChange={this.handleChange.bind(this)}
            placeholder="Mon" />
          <input type="text"
            name="Tue"
            value={this.state.Tue}
            onChange={this.handleChange.bind(this)}
            placeholder="Tue" />
          <input type="text"
            name="Wed"
            value={this.state.Wed}
            onChange={this.handleChange.bind(this)}
            placeholder="Wed" />
          <input type="text"
            name="Thu"
            value={this.state.Thu}
            onChange={this.handleChange.bind(this)}
            placeholder="Thu" />
          <input type="text"
            name="Fri"
            value={this.state.Fri}
            onChange={this.handleChange.bind(this)}
            placeholder="Fri" />
          <input type="text"
            name="Sat"
            value={this.state.Sat}
            onChange={this.handleChange.bind(this)}
            placeholder="Sat" />
          <input type="text"
            name="Sun"
            value={this.state.Sun}
            onChange={this.handleChange.bind(this)}
            placeholder="Sun" />
          <button
            onClick={async (e) => {
              console.log("mamy")
              e.preventDefault();
              this.setState({ editable: false });
              const timetableHolder = {
                method: "edit",
                obj: {
                  Mon: this.state.Mon,
                  Tue: this.state.Tue,
                  Wed: this.state.Wed,
                  Thu: this.state.Thu,
                  Fri: this.state.Fri,
                  Sat: this.state.Sat,
                  Sun: this.state.Sun,
                  classID: this.state.classID,
                  schoolID: this.state.schoolID
                }
              }
              const isLegit = Object.values(timetableHolder).every(x => (x && x !== ""))
              if (!isLegit) {
                alert(`All input cannot be empty`);
                this.setState({ editable: true });
                console.log("hello")
                console.log(JSON.stringify(timetableHolder))
                return
              }
              console.log(JSON.stringify(timetableHolder))
              console.log("-----------------------------------donefetching")
              fetch(TIMETABLE_EDIT_LINK, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(timetableHolder)
              }
              ).then((respone) => {
                if (respone.ok) {
                  respone.json().then(
                    (preanswer: any) => {
                        console.log(JSON.stringify(preanswer));
                      let answer = JSON.parse(preanswer.body)
                      if (!answer.internalStatus) throw "Received invalid response";
                      switch (answer.internalStatus) {
                        case CODE.SUCCESS:
                          alert(`Tmetable changed:\nTimetable of class:${timetableHolder.obj.classID}\nDetails:${JSON.stringify(timetableHolder.obj)}`);
                          this.resetInput();
                          break;
                        // case CODE.NULL:
                        //   alert(`All input cannot be empty`);
                        //   this.setState({ editable: true });
                        //   break;
                        case CODE.NOT_EXISTED:
                          alert(`Timetable of class  ${timetableHolder.obj.classID} or the class itself might've not yet existed. If you want to add new class' timetable, please select +.`);
                          this.setState({ editable: true });
                          break;
                        case CODE.FAILED:
                          alert(`Unknown error`);
                          this.setState({ editable: true });
                          break;
                        default:
                          throw "Unknown code:   " + answer.internalStatus;
                      }
                    }
                  ).catch(e => {
                    alert(`Unknown error 101`);
                    this.setState({ editable: true });
                    console.log(`Error while posting user: ${e}`)
                  })
                }
                else {
                  alert("Error while connecting to server")
                  this.setState({ editable: true });
                }
              }).catch((err) => {
                alert("Error while connecting to server")
                this.setState({ editable: true });
              })

            }}>Edit</button>
        </form>
      </div>
    )
  };
};

export default TimetableEdit;
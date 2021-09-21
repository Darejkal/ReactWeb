import React from 'react'
import { POST_USER_LINK, CODE, Answer, TIMETABLE_EDIT_LINK } from '../Accessibility';
import ScreenFiller from '../parts/ScreenFiller';
export type NewsManageProps = {}
// export type NewsManageState ={
//     email:string,
//     name:string,
//     classID:string,
//     password:string,
//     editable:boolean,
// }
export interface NewsManageState {
  editable: boolean,
  schoolID: string,
}
export class NewsManage extends React.Component<NewsManageProps, NewsManageState> {
  constructor(props: NewsManageProps) {
    super(props);
    this.state = {
      editable: true,
      schoolID:""
    }
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <div>
        {!this.state.editable ? <ScreenFiller /> : <div />}
        
      </div>
    )
  };
};

export default NewsManage;
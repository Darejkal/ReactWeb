import React, { useState } from 'react'
import {  BrowserRouter,Switch,Route,Link } from 'react-router-dom'
import Tools from './Tools';
import UserAdd2 from './fragments/UserAdd2';
import UserRemove from './fragments/UserRemove';
import UserEdit from './fragments/UserEdit';
import TimetableAdd from './fragments/TimetableAdd';
import TimetableRemove from './fragments/TimetableRemove';
import TimetableEdit from './fragments/TimetableEdit';
import NewsManage from './fragments/NewsManage';
export type FragmentProps = { }
export const Fragment: React.FC<FragmentProps> = ({ }) => {
    return (
        <BrowserRouter>
        <div >
          <nav>
            <Tools/>
          </nav>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch >
            <Route path="/User+">
              <UserAdd2 />
            </Route>
            <Route path="/User-">
              <UserRemove />
            </Route>
            <Route path="/UserEdit">
              <UserEdit />
            </Route>
            <Route path="/Timetable+">
              <TimetableAdd />
            </Route>
            <Route path="/Timetable-">
              <TimetableRemove />
            </Route>
            <Route path="/TimetableEdit">
              <TimetableEdit />
            </Route>
            <Route path="/NewsManage">
              <NewsManage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
};
//
export default Fragment;

  
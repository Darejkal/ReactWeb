import React, { useState } from 'react'
import {  BrowserRouter,Switch,Route,Link } from 'react-router-dom'
import Tools from './Tools';
import UserAdd2 from './fragments/UserAdd2';
import UserRemove from './fragments/UserRemove';
import UserEdit from './fragments/UserEdit';
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
          </Switch>
        </div>
      </BrowserRouter>
    )
};
//
export default Fragment;

  
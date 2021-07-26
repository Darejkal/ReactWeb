import React from 'react'
import ToolsBar from './parts/ToolsBar';
export type ToolsProps = { }
export const Tools: React.FC<ToolsProps> = ({ }) => {
    return (
        <div className="Tools">
        <ToolsBar texts={["+","-","Edit","User"]}/>
        <ToolsBar texts={["+","-","Edit","Timetable"]}/>
        <ToolsBar texts={["+","-","Edit","Class"]}/>
        </div>
    )
};

export default Tools;
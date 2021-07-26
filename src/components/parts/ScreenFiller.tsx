import React from 'react'
export type ScreenFillerProps = { }
export const ScreenFiller: React.FC<ScreenFillerProps> = ({ }) => {
    return (
        <div className="ScreenFiller">
        <div className="Loader"/>
        <div className="Filler" />
        </div>
    )
};

export default ScreenFiller;
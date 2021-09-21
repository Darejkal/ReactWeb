import React from 'react'
import LinkButton from './LinkButton';
export type ToolsBarProps = {
    texts:Array<string>
}
export const ToolsBar: React.FC<ToolsBarProps> = ({texts }) => {
    var toolText = texts.pop();
    return (
        <div className="ToolHolder">
        <p>{toolText}</p>
        <div className="ToolContainer">
            {texts.map(text => 
            (<LinkButton key={text} to={`${toolText+text}`} > 
             {`${text}`}
            </LinkButton>
            ))
            }
        </div>
        </div>
    )
};

export default ToolsBar;
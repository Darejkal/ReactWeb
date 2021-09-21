import React, { useState } from 'react'
import ScreenFiller from '../parts/ScreenFiller';
import { POST_USER_LINK, CODE, Answer, DELETE_USER_LINK, TIMETABLE_EDIT_LINK } from '../Accessibility';
export type TimetableRemoveProps = {}
export const TimetableRemove: React.FC<TimetableRemoveProps> = ({ }) => {
    const [classID, setClassID] = useState("12TN1");
    const [schoolID, setSchoolID] = useState("tpc");
    const [editable, setEditable] = useState(true);
    const onHandleFuncChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (val: string) => any) => {
        callback(e.target.value)
    }
    return (
        <div>
            {!editable ? <ScreenFiller /> : <div />}
            <form className="InputForm">
                <p>Class to remove timetable from</p>
                <input type="text"
                    placeholder="ClassID"
                    value={classID}
                    onChange={(e) => onHandleFuncChange(e, setClassID)} />
                <input type="text"
                    placeholder="SchoolID"
                    value={schoolID}
                    onChange={(e) => onHandleFuncChange(e, setSchoolID)} />
                <button
                    onClick={
                        async (e) => {
                            e.preventDefault();
                            setEditable(false);
                            console.log(JSON.stringify({
                                "classID": classID,
                                "schoolID": schoolID
                            }))
                            fetch(TIMETABLE_EDIT_LINK, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(
                                    {
                                        method: "delete",
                                        obj: {
                                            "classID": classID,
                                            "schoolID": schoolID
                                        }
                                    }
                                )
                            }
                            ).then(
                                (response) => {
                                    if (response.ok)
                                        response.json().then(
                                            (preanswer: any) => {
                                                let answer = JSON.parse(preanswer.body);
                                                switch (answer.internalStatus) {
                                                    case CODE.SUCCESS:
                                                        alert(`Removed timetable of\n${JSON.stringify({
                                                            "classID": classID,
                                                            "schoolID": schoolID
                                                        })}`);
                                                        setClassID("")
                                                        setSchoolID("")
                                                        setEditable(true);
                                                        break;
                                                    // case CODE.NULL:
                                                    //   alert(`All input cannot be empty`);
                                                    //   setEditable(true);
                                                    //   break;
                                                    case CODE.NOT_EXISTED:
                                                        alert(`Class  ${classID} is not linked to any timetable. Please make sure what you typed in is correct.`);
                                                        setEditable(true);
                                                        break;
                                                    case CODE.FAILED:
                                                        alert(`Unknown error`);
                                                        setEditable(true);
                                                        break;
                                                    default:
                                                        throw "Unknown code";
                                                }
                                            }
                                        )
                                    else
                                        alert("Error while connecting to server")
                                    setEditable(true);
                                }).catch(e => {
                                    alert(`Unknown error`);
                                    setEditable(true);
                                    console.log(`Error while deleting: ${e}`)
                                })
                        }
                    }>Remove</button>
            </form>
        </div>
    )
};

export default TimetableRemove;
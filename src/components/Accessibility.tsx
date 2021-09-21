export const POST_USER_LINK = "https://y2lnrwnc98.execute-api.ap-southeast-1.amazonaws.com/TestStage1/access/write/test/adduser"
export const DELETE_USER_LINK = "https://y2lnrwnc98.execute-api.ap-southeast-1.amazonaws.com/TestStage1/access/write/test/deleteuser"
export const PUT_USER_LINK="https://y2lnrwnc98.execute-api.ap-southeast-1.amazonaws.com/TestStage1/access/write/test/edituser"
export const VALIDATE_USER_LINK="https://y2lnrwnc98.execute-api.ap-southeast-1.amazonaws.com/TestStage1/access/info/acc"
export const TIMETABLE_EDIT_LINK="https://y2lnrwnc98.execute-api.ap-southeast-1.amazonaws.com/TestStage1/access/write/ttwrite"
export const CODE = {
    //post success
    SUCCESS:"00001",
    //data existed
    EXISTED:"00002",
    NOT_EXISTED:"0000201",
    //post failed for many reasons
    FAILED:"00003",
    //post failed because input was null/undefined/empty
    NULL:"00004",
}
export type Answer = {
    internalStatus:string,
}
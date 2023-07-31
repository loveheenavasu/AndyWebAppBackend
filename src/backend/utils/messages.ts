interface messages {
    INTERNAL_SERVER_ERROR : string,
    METHOD_NOT_ALLOWED : string,
    USER_NOT_FOUND : string,
    UNAUTHORIZED_USER : string,
    CORRECT_ANSWER : string,
    INCORRECT_ANSWER : string,
    TOKEN_NOT_FOUND : string,
    INCOMPLETE_DATA : string,
    QUESTION_NOT_EXIST : string,
    MODULE_NOT_EXIST : string,
    INVALID_CONTENT_ID : string,
    INVALID_MODULE_ID : string,
    INVALID_COURSE_ID : string,
    INVALID_QUESTION_ID : string,
    CONTENT_NOT_EXIST :string,
    COURSE_NOT_ENROLLED : string,
}
const MESSAGES : messages = {
    INTERNAL_SERVER_ERROR : 'Internal server error',
    METHOD_NOT_ALLOWED : "Method Not Allowed",
    USER_NOT_FOUND : 'User not found',
    UNAUTHORIZED_USER: 'Not an authenticated user',
    CORRECT_ANSWER : 'Correct answer',
    INCORRECT_ANSWER : 'Oops Invalid answer',
    TOKEN_NOT_FOUND : 'Token not found',
    INCOMPLETE_DATA : 'Invalid request recieved',
    QUESTION_NOT_EXIST : 'Question not exist for the requested content',
    MODULE_NOT_EXIST: 'Module not exist for the requested course',
    INVALID_CONTENT_ID : 'Invalid content Id', 
    INVALID_MODULE_ID : 'Invalid module Id',
    INVALID_COURSE_ID : 'Invalid course Id',
    INVALID_QUESTION_ID : 'Invalid question Id',
    CONTENT_NOT_EXIST : 'Content not exist for the requested module',
    COURSE_NOT_ENROLLED : 'Course not enrolled',
};
export default MESSAGES;
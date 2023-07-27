interface messages {
    INTERNAL_SERVER_ERROR : string,
    METHOD_NOT_ALLOWED : string,
    USER_NOT_FOUND : string,
    UNAUTHORIZED_USER : string,
    CORRECT_ANSWER : string,
    INCORRECT_ANSWER : string,
    TOKEN_NOT_FOUND : string,
    INVALID_REQUEST : string,
    CONTENT_NOT_FOUND : string,
}
const MESSAGES : messages = {
    INTERNAL_SERVER_ERROR : 'Internal server error',
    METHOD_NOT_ALLOWED : "Method Not Allowed",
    USER_NOT_FOUND : 'User not found',
    UNAUTHORIZED_USER: 'Not an authenticated user',
    CORRECT_ANSWER : 'Correct answer',
    INCORRECT_ANSWER : 'Oops Invalid answer',
    TOKEN_NOT_FOUND : 'Token not found',
    INVALID_REQUEST : 'Invalid request recieved',
    CONTENT_NOT_FOUND : 'Content not found with the requested id',
};
export default MESSAGES;
const emailPattern = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email"
};

const passwordPattern = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,14}$/,
    message: "one capital & one small letter, one digit and greater than 7 chars.",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;   // 10 MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

export { emailPattern, passwordPattern, MAX_FILE_SIZE, MAX_VIDEO_SIZE };
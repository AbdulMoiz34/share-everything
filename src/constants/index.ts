const emailPattern = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email"
};

const passwordPattern = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,14}$/,
    message: "one capital & one small letter, one digit and greater than 7 chars.",
};

export { emailPattern, passwordPattern };
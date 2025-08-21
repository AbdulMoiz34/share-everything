export const firebaseErrorMessages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered.",
};

const getFirebaseErrorMessage = (err: unknown): string => {

    if (typeof err === "object" && err !== null && "code" in err) {
        const code = (err as { code: string }).code;
        return firebaseErrorMessages[code] ?? "Failed. Please try again.";
    }

    return "Failed. Please try again.";
}

export { getFirebaseErrorMessage };
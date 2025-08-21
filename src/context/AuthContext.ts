import { createContext } from "react";

export interface User {
    email: string | null | undefined;
    uid: string | null | undefined;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    setUser: () => { },
});

export default AuthContext;
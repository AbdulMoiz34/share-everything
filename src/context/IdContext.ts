import { createContext } from "react";

interface IdContextType {
    id: string;
    setId: (newId: string) => void;
}

const IdContext = createContext<IdContextType>({
    id: "",
    setId: () => { },
});

export default IdContext;

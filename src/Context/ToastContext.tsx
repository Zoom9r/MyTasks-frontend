import { createContext, SetStateAction, useState } from "react";

type ToastContextProviderProps = {
    children: React.ReactNode
}

export const ToastContext = createContext({} as ToastContextType);

type ToastContextType = {
    toastState: boolean,
    setToastState: React.Dispatch<SetStateAction<boolean>>,
    message: string,
    setMessage: React.Dispatch<SetStateAction<string>>
}

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {

    const [toastState, setToastState] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    return <ToastContext.Provider value={{ toastState, setToastState, message, setMessage }}>
        {children}
    </ToastContext.Provider> 
}
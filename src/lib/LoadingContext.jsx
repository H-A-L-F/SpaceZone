import { Spinner } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";

const loadingContext = createContext()

export function LoadingContextProvider({ children }) {
    const [loading, setLoading] = useState(false)

    return (
        <loadingContext.Provider value={{ setLoading }}>
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                    }}
                >
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </div>
            )}
            {children}
        </loadingContext.Provider>
    )
}

export function useLoadingContext() {
    return useContext(loadingContext)
}
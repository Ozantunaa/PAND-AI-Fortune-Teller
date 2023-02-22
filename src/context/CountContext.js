import React, { createContext, useState } from "react";

const CountContext = createContext();
export default CountContext;

export const CountProvider = ({ children }) => {

    const [countdownFinished, setCountdownFinished] = useState(false)
    const [countdown, setCountdown] = useState(0)

    const value = {
        countdown,
        setCountdown,
        countdownFinished,
        setCountdownFinished
    }

    return (
        <CountContext.Provider value={value}>
            {children}
        </CountContext.Provider>
    )


}

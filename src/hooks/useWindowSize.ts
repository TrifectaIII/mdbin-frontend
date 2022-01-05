import {
    useEffect,
    useState,
} from 'react';

// type of return object
export interface WindowSize {
    width: number;
    height: number;
}

// uses state and effect hooks to track window size
const useWindowSize = (): WindowSize => {

    // state to track size
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    // handler pulls from global window object
    const handleResize = (): void => setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {

        // set up a listener
        window.addEventListener('resize', handleResize);

        // execute the function once to start
        handleResize();

        // return a cleanup function to remove the listener
        return () => window.removeEventListener('resize', handleResize);

    }, []);
    // empty dep array means this will only run once

    return windowSize;

};

export default useWindowSize;

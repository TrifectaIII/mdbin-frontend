import {
    useEffect,
    useState,
} from 'react';

export interface WindowSize {
    width: number;
    height: number;
}

const useWindowSize = (): WindowSize => {

    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    const handleResize = (): void => setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return windowSize;

};

export default useWindowSize;

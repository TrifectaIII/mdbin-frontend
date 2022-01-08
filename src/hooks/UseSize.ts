import {
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';

// type of return object
export interface Size {
    width: number;
    height: number;
}

// uses state and effect hooks to track window size
export const useWindowSize = (): Size => {

    // state to track size
    const [windowSize, setWindowSize] = useState<Size>({
        width: 0,
        height: 0,
    });

    // handler pulls from global window object
    const handleResize = (): void => setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {

        // execute the function once to start
        handleResize();

        // set up a resize listener
        window.addEventListener('resize', handleResize);

        // return a cleanup function to remove the listener
        return () => window.removeEventListener('resize', handleResize);

    }, []);
    // empty dep array means this will only run once

    return windowSize;

};

// tracks the height of an element using a ref
export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [
    size: Size,
    ref: (node: T | null) => void,
    manualUpdate: () => void,
] => {

    // state to hold size
    const [elementSize, setElementSize] = useState<Size>({
        width: 0,
        height: 0,
    });

    // state to hold ref to element
    const [ref, setRef] = useState<T | null>(null);

    // function to update state based on element ref
    const updateSize = () => setElementSize({
        width: ref?.offsetWidth || 0,
        height: ref?.offsetHeight || 0,
    });

    // call update function when element changes
    useLayoutEffect(
        updateSize,
        [ref?.offsetWidth, ref?.offsetHeight, ref],
    );

    // return the size, the ref setter
    // and the update function for manual updates
    return [elementSize, setRef, updateSize];

};

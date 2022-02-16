import globalReducer, {
    GlobalState,
    toggleDarkMode,
    openMenuDrawer,
    closeMenuDrawer,
} from './globalSlice';

describe('globalSlice', () => {

    describe('toggleDarkMode', () => {

        it('should disable dark mode when enabled', () => {

            const previousState: GlobalState = {
                darkMode: true,
                menuDrawerOpen: true,
                cookieAuth: true,
            };
            expect(globalReducer(previousState, toggleDarkMode())).
                toEqual({
                    darkMode: false,
                    menuDrawerOpen: true,
                    cookieAuth: true,
                });

        });

        it('should enable dark mode when disabled', () => {

            const previousState: GlobalState = {
                darkMode: false,
                menuDrawerOpen: true,
                cookieAuth: true,
            };
            expect(globalReducer(previousState, toggleDarkMode())).
                toEqual({
                    darkMode: true,
                    menuDrawerOpen: true,
                    cookieAuth: true,
                });

        });

    });

    describe('openMenuDrawer', () => {

        it('should open the menu when closed', () => {

            const previousState: GlobalState = {
                darkMode: true,
                menuDrawerOpen: false,
                cookieAuth: true,
            };
            expect(globalReducer(previousState, openMenuDrawer())).
                toEqual({
                    darkMode: true,
                    menuDrawerOpen: true,
                    cookieAuth: true,
                });

        });

        it('should do nothing when the menu is already opened', () => {

            const previousState: GlobalState = {
                darkMode: true,
                menuDrawerOpen: true,
                cookieAuth: true,
            };
            expect(globalReducer(previousState, openMenuDrawer())).
                toEqual(previousState);

        });

    });

    describe('closeMenuDrawer', () => {

        it('should close the menu when opened', () => {

            const previousState: GlobalState = {
                darkMode: true,
                menuDrawerOpen: true,
                cookieAuth: true,
            };
            expect(globalReducer(previousState, closeMenuDrawer())).
                toEqual({
                    darkMode: true,
                    menuDrawerOpen: false,
                    cookieAuth: true,
                });

        });

        it('should do nothing when the menu is already closed', () => {

            const previousState: GlobalState = {
                darkMode: true,
                menuDrawerOpen: false,
                cookieAuth: true,
            };
            expect(globalReducer(previousState, closeMenuDrawer())).
                toEqual(previousState);

        });

    });

});

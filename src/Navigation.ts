import {SvgIconTypeMap} from '@material-ui/core';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import {
    Filter as FilterIcon,
    Apps as AppsIcon,
    Filter2 as Filter2Icon,
    Filter3 as Filter3Icon,
} from '@material-ui/icons';

// Type to determine navigation options on header
export interface NavMapType {
    [key: string]: {
        icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
        route: string,
    } | {
        icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
        children: {
            [key: string]:{
                icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
                route: string,
            },
        },
    };
}

// navmap for this app
export const navMap: NavMapType = {
    'Counter App': {
        icon: AppsIcon,
        route: '/counter',
    },
    'Nav Point Group': {
        icon: FilterIcon,
        children: {
            'Nav Point 2': {
                icon: Filter2Icon,
                route: '/np2',
            },
            'Nav Point 3': {
                icon: Filter3Icon,
                route: '/np3',
            },
        },
    },
};

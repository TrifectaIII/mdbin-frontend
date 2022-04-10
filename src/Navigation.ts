import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Edit as EditPublishIcon, Info as InfoIcon } from "@material-ui/icons";

// Type to determine navigation options on header
export interface NavMapType {
    [key: string]:
        | {
              icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
              route: string;
          }
        | {
              icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
              children: {
                  [key: string]: {
                      icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
                      route: string;
                  };
              };
          };
}

// navmap for this app
export const navMap: NavMapType = {
    "Edit / Publish": {
        icon: EditPublishIcon,
        route: "/",
    },
    "Info": {
        icon: InfoIcon,
        route: "/info",
    },
};

import {
    imageButtonNameMathType,
    imageButtonNameChemType
} from './common';
import {
    addMenubarItem,
} from 'editor_tiny/utils';

const configureMenu = (menu) => {
    addMenubarItem(menu, 'insert', `${imageButtonNameChemType}`);
    addMenubarItem(menu, 'insert', `${imageButtonNameMathType}`);
    return menu;
};

const configureToolbar = (toolbar) => {
    // The toolbar contains an array of named sections.
    // The Moodle integration ensures that there is a section called 'content'.
    return toolbar.map((section) => {
        if (section.name === 'content') {
            section.items.unshift(imageButtonNameChemType);
            section.items.unshift(imageButtonNameMathType);
        }

        return section;
    });
};

export const configure = (instanceConfig) => {
    // Update the instance configuration to add the Media menu option to the menus and toolbars and upload_handler.
    return {
        toolbar: configureToolbar(instanceConfig.toolbar),
        menu: configureMenu(instanceConfig.menu),
    };
};

import {
    pluginName,
    imageButtonNameMathType,
    imageButtonNameChemType
} from './common';
import {
    getInitialPluginConfiguration,
    getPluginOptionName,
} from 'editor_tiny/options';
import {
    addMenubarItem,
    addToolbarButton,
    removeMenubarItem,
    removeToolbarButton,
} from 'editor_tiny/utils';

// Name of the default equation editor in Tiny
const TINY_EQUATION = 'tiny_equation';

// Due to the timing the plugin options are available, we need to get at the options in this slightly unconventional way.
// Also used in the tiny_premium plugin.
const shouldReplaceTinyEquation = (options) => {
    const replaceTinyEquation = getPluginOptionName(pluginName, 'replaceTinyEquation');
    const config = getInitialPluginConfiguration(options);

    return config[replaceTinyEquation] ?? true;
};

const configureMenu = (menu, options) => {
    if (shouldReplaceTinyEquation(options)) {
        menu = removeMenubarItem(menu, 'insert', TINY_EQUATION);
    }

    menu = addMenubarItem(menu, 'insert', imageButtonNameMathType);
    menu = addMenubarItem(menu, 'insert', imageButtonNameChemType);

    return menu;
};

const configureToolbar = (toolbar, options) => {
    if (shouldReplaceTinyEquation(options)) {
        toolbar = removeToolbarButton(toolbar, 'advanced', TINY_EQUATION);
    }

    toolbar = addToolbarButton(toolbar, 'content', imageButtonNameMathType);
    toolbar = addToolbarButton(toolbar, 'content', imageButtonNameChemType);

    return toolbar;
};

export const configure = (instanceConfig, options) => {
    // Update the instance configuration to add the Media menu option to the menus and toolbars and upload_handler.
    return {
        toolbar: configureToolbar(instanceConfig.toolbar, options),
        menu: configureMenu(instanceConfig.menu, options),
    };
};

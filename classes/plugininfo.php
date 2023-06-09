<?php

namespace tiny_wiris;

use context;
use editor_tiny\editor;
use editor_tiny\plugin;
use editor_tiny\plugin_with_configuration;

class plugininfo extends plugin implements plugin_with_configuration {
    public static function get_plugin_configuration_for_context(
        context $context,
        array $options,
        array $fpoptions,
        ?editor $editor = null
    ): array {
        global $COURSE, $PAGE, $CFG;
        // We need to know if  MathType filter are active in the context of the course.
        // If not MathType for Atto should be disabled.
        $filterwirisactive = true;
        // Get MathType and Chemistry buttons enabled configuration.
        $editorisactive = get_config('filter_wiris', 'editor_enable') === '1';
        $chemistryisactive = get_config('filter_wiris', 'chem_editor_enable') === '1';
        // Filter disabled at course level.
        if (!get_config('filter_wiris', 'allow_editorplugin_active_course')) {
            $activefilters = filter_get_active_in_context($context);
            $filterwirisactive = array_key_exists('wiris', $activefilters);

            // Filter disabled at activity level.
            if ($filterwirisactive) {
                // Check if context is context module.
                $pagecontext = $PAGE->context;
                // We need to check only module context. Other contexts (like block context)
                // shouldn't be checked.
                if ($pagecontext instanceof context_module) {
                    $activefilters = filter_get_active_in_context($PAGE->context);
                    $filterwirisactive = array_key_exists('wiris', $activefilters);
                }
            } else {
                // If filter is deactivated and allowalways is disabled we don't add buttons.
                $editorisactive = false;
                $chemistryisactive = false;
            }
        }

        return [
            'filterEnabled' => $filterwirisactive,
            'editorEnabled' => $editorisactive,
            'chemistryEnabled' => $chemistryisactive,
            'moodleCourseCategory' => $COURSE->category,
            'moodleCourseName' => $COURSE->fullname,
            'moodleVersion' => $CFG->branch,
        ];
    }
}

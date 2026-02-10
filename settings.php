<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny wiris settings file.
 *
 * @package     tiny_wiris
 * @copyright   WIRIS Europe (Maths for more S.L)
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editortiny', new admin_category('tiny_wiris', get_string('pluginname', 'tiny_wiris')));

$settings = new admin_settingpage('tiny_wiris_settings', get_string('settings', 'tiny_wiris'));
if ($ADMIN->fulltree) {
    $settings->add(new admin_setting_configcheckbox(
            'tiny_wiris/replacetinyequation',
            get_string('replacetinyequation', 'tiny_wiris'),
            get_string('replacetinyequation_desc', 'tiny_wiris'),
            1
    ));
}

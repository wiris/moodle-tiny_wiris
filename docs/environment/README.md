# Environment

This project can be run in two different environments. To run in a development environment, follow the instructions in the [development](#development) section of this very document. If what you need are instructions about how to use it in a production environment, please head to the [usage documentation](../usage/README.md#production).

## Requirements

To use the TinyMCE editor's MathType and ChemType plugins for editing and generating mathematical expressions, you need to have a environment for a Moodle instance:

There is a clean environment Docker provided by the official Moodle team:

- https://github.com/moodlehq/moodle-docker

With the previous environment, you need have [MathType Moodle filter plugin](https://github.com/wiris/moodle-filter_wiris) installed in order to use this plugin.

Otherwise, you can use the one created by WIRIS. It helps you install a Moodle instance on your computer with the WIRIS plugins suite installed and some dummy content.

- https://github.com/wiris/wiris-moodle-docker

## Development

### Install MathType Moodle plugin for TinyMCE

Install the plugin like any other plugin in the folder `lib/editor/tiny/plugins/wiris`.

You can use git:

```sh
$ git clone https://github.com/wiris/moodle-tiny_wiris.git lib/editor/tiny/plugins/wiris
```

Alternatively, you can [download the plugin](https://github.com/wiris/moodle-tiny_wiris/archive/main.zip) and unzip the file into previous folder, then rename the new folder to `wiris`.

## Dependencies of MathType filter

This project contains the following external dependencies:

* MathType Web Integration JavaScript SDK.
* MathType Web Integration PHP library.

The **MathType Web Integration JavaScript SDK** is open source ([@wiris/html-integrations](https://github.com/wiris/html-integrations)) and is released under GNU GPLv3 license as a npm package: [@wiris/mathtype-html-integration-devkit](https://www.npmjs.com/package/@wiris/mathtype-html-integration-devkit).

**Note:** More details on the `thirdpartylibs.xml` file.

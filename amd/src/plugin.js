import {getTinyMCE} from 'editor_tiny/loader';
import {component} from './common';
import * as Configuration from './configuration';
import * as Config from 'core/config';

export const baseUrl = `${Config.wwwroot}/lib/editor/tiny/plugins/wiris/js`;

const LOG_PREFIX = '[MathType-TinyMCE]';

const log = (message, ...args) => {
    console.log(`${LOG_PREFIX} [${new Date().toISOString()}] ${message}`, ...args);
};

const warn = (message, ...args) => {
    console.warn(`${LOG_PREFIX} [${new Date().toISOString()}] ${message}`, ...args);
};

const error = (message, ...args) => {
    console.error(`${LOG_PREFIX} [${new Date().toISOString()}] ${message}`, ...args);
};

// eslint-disable-next-line no-async-promise-executor
export default new Promise(async (resolve, reject) => {
    log('Module initialization started.');
    log('Initial DOM / Global State Check:', {
        hasWirisPlugin: typeof window.WirisPlugin !== 'undefined',
        hasWirisTinyMCEPluginPromise: typeof window.WirisTinyMCEPluginPromise !== 'undefined',
        baseUrl: baseUrl,
    });

    try {
        log('Awaiting getTinyMCE()...');
        const [tinyMCE] = await Promise.all([
            getTinyMCE(),
        ]);
        log('getTinyMCE() resolved successfully.', {
            version: tinyMCE.majorVersion ? `${tinyMCE.majorVersion}.${tinyMCE.minorVersion}` : 'Unknown'
        });

        tinyMCE.on('AddEditor', (event) => {
            const editor = event.editor;
            log(`AddEditor event triggered for editor ID: "${editor.id}"`);

            editor.on('PreInit', () => {
                log(`PreInit event triggered for editor ID: "${editor.id}"`);
                if (editor.editorUpload?.addFilter) {
                    log(`Adding image upload filter for editor ID: "${editor.id}"`);
                    editor.editorUpload.addFilter((img) => {
                        const isFormula = img.classList.contains('Wirisformula') || ('mathml' in img.dataset);
                        if (isFormula) {
                            log(`Upload filter excluded formula image from scan on editor "${editor.id}":`, img);
                        }
                        return !isFormula;
                    });
                } else {
                    warn(`editorUpload.addFilter method is unavailable for editor ID: "${editor.id}"`);
                }
            });
        });

        if (!window.WirisTinyMCEPluginPromise) {
            log('Creating window.WirisTinyMCEPluginPromise singleton loader.');
            window.WirisTinyMCEPluginPromise = new Promise((resolveScript, rejectScript) => {
                const head = document.querySelector('head');
                let existingScript = head.querySelector('script[data-mathtype="mathtype"]');

                if (existingScript) {
                    warn('An existing MathType script tag was already present in <head>:', existingScript.src);
                }

                const script = existingScript || document.createElement('script');

                if (!existingScript) {
                    script.dataset.mathtype = 'mathtype';
                    script.src = `${baseUrl}/plugin.min.js`;
                    script.async = true;
                    log(`Created new script element targeting: ${script.src}`);
                }

                script.addEventListener('load', () => {
                    log('Script "load" event fired for:', script.src);
                    log('Post-load check for window.WirisPlugin:', typeof window.WirisPlugin !== 'undefined');

                    if (window.WirisPlugin) {
                        log('WirisPlugin registered successfully on window.');
                        resolveScript();
                    } else {
                        const errMsg = 'MathType TinyMCE script loaded, but window.WirisPlugin is undefined.';
                        error(errMsg);
                        rejectScript(new Error(errMsg));
                    }
                }, {once: true});

                script.addEventListener('error', (err) => {
                    error('Script "error" event fired while loading plugin.min.js:', err);
                    rejectScript(err);
                }, {once: true});

                if (!existingScript) {
                    head.append(script);
                    log('Script element appended to <head>.');
                }
            });
        } else {
            log('Reusing existing window.WirisTinyMCEPluginPromise singleton loader.');
        }

        log('Awaiting window.WirisTinyMCEPluginPromise completion...');
        await window.WirisTinyMCEPluginPromise;
        log('window.WirisTinyMCEPluginPromise successfully resolved.');

        log(`Resolving default plugin promise with component: "${component}/plugin"`);
        resolve([`${component}/plugin`, Configuration]);

    } catch (err) {
        error('Module initialization failed with error:', err);
        reject(err);
    }
});
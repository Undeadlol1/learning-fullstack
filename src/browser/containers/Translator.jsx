import React, { Component } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import enData from 'react-intl/locale-data/en'
import ruData from 'react-intl/locale-data/ru'
import en from '../i18n/en'
import ru from '../i18n/ru'

addLocaleData([...enData, ...ruData]);

const messages = { en, ru }

if (process.env.SERVER) {
// https://formatjs.io/guides/runtime-environments/#server
// var areIntlLocalesSupported = require('intl-locales-supported');
// var localesMyAppSupports = ['en', 'ru'];
 
// if (global.Intl) {
//     // Determine if the built-in `Intl` has the locale data we need. 
//     if (!areIntlLocalesSupported(localesMyAppSupports)) {
//         // `Intl` exists, but it doesn't have the data we need, so load the 
//         // polyfill and replace the constructors with need with the polyfill's. 
//         require('intl');
//         Intl.NumberFormat   = IntlPolyfill.NumberFormat;
//         Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
//     }
// } else {
//     // No `Intl`, so use and load the polyfill. 
//     global.Intl = require('intl');
// }
}

// placeholder to be able to export function later down the code
// because this function only being defined in "render" method
let translate = () => {}

class Translator extends Component {
    render() {
        let language;

        function detectLanguage() {
            // TODO refator everything using this function
        }

        // Different browsers have the user locale defined
        // on different fields on the `navigator` object, so we make sure to account
        // for these different by checking all of them
        const browsersLanguage = 	navigator
                                    ? (navigator.languages && navigator.languages[0])
                                    || navigator.language
                                    || navigator.userLanguage
                                                        : ''
        // Split locales with a region code (ie. 'en-EN' to 'en')
        const languageWithoutRegionCode = browsersLanguage.toLowerCase().split(/[_-]+/)[0];
        if (!messages.hasOwnProperty(languageWithoutRegionCode)) language = 'ru'
        else language = languageWithoutRegionCode
        /**
         * translates message
         * (does not work with variables, simply returns a string of provided id)
         * @export
         * @param {String} id key in object with translation strings
         * @returns {String}
         */
        translate = function translate(id) {
            return messages[language][id]
        }

        return  <IntlProvider locale={language} messages={messages[language]}>
                    {this.props.children}
                </IntlProvider>
    }
}

export { translate }

export default Translator
import {addLocaleData} from "react-intl";
import nlLocaleData from 'react-intl/locale-data/nl';
import enLocaleData from 'react-intl/locale-data/en';

addLocaleData([ ...nlLocaleData, ...enLocaleData ]);

function getLanguage() {
    let language =
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage;


    language =  language.toLowerCase().replace("_", "-");

    if(/^(([\w]{2})+(|-)){2}$/.test(language)) {
        const l = language.toLowerCase().split(/[-]+/);
        return l[0].toLowerCase() === l[1].toLowerCase() ? l[0] : l.join("-");
    }
    else {
        return language.toLowerCase();
    }
}

const language = getLanguage();

/**
 * Require localization for moment
 */
try {
    require(`moment/locale/${language}`)
}
catch (e) {
    //If language does not exist in the moment package, use a fallback language
    require(`moment/locale/en-gb`)
}

const localization = require(`../../resources/lang/${language}`).default;

export {language};
export const messages = { ...localization };
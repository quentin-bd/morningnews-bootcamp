export default function (language = 'fr', action) {
    if (action.type == 'chooseLang') {
        return action.language;
    } else {
        return language;
    }}
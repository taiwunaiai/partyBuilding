
const validators = {

    required(value, target) {

        if (target.type === 'checkbox') {
            return target.checked;
        } else if (target.type === 'radio') {

        }

        return /[^\s]+/.test(value);
    },

    /** Check if the value matches the comparison */
    equals(value, target, comparison) {
        return value === comparison;
    },

    equalsIgnoreCase(value, target, comparison) {
        return this.equals((value || '').toLowerCase(), (comparison || '').toLowerCase());
    },

    /** Check if the value contains the seed */
    contains(value, target, seed) {
        return value && seed && value.indexOf(seed) > -1;
    },

    /** String start with a given startWith parameter */
    startWith(value, target, startWith) {
        return value && startWith && value.indexOf(startWith) === 0;
    },

    /** String end with a given endWith parameter */
    endWith(value, target, endWith) {
        return value && endWith && value.lastIndexOf(endWith) === value.length - endWith.length;
    },

    /** Is number under comparison parameter */
    min(value, target, comparison) {
        return value && comparison && +value.replace(/,/g, '') > comparison.toString().replace(/,/g, '');
    },

    /** Is number above comparison parameter */
    max(value, target, comparison) {
        return !this.min.apply(this, arguments);
    },

    /** String length is less length */
    minLength(value, target, length) {
        return !!(value && !isNaN(+length) && value.length > length);
    },

    /** Is a given date past? */
    past(value) {
        var now = new Date();
        return new Date(value) < +now;
    },

    /** Is a given date future? */
    future() {
        return !this.past.apply(this, arguments);
    },

    /** Check if the value is a date that's after the specified date(defaults to now) */
    after(value, target, comparison) {
        return +new Date(value) > new Date(comparison);
    },

    /** Value that's before the specified date */
    before() {
        return !this.after.apply(this, arguments);
    }
};

const regexps = {
    int: /^(?:[-+]?(?:0|[1-9][0-9]*))$/,
    float: /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,
    alpha: /^[A-Z]+$/i,
    numeric: /^[-+]?[0-9]+$/,
    hexadecimal: /^[0-9a-fA-F]+$/,
    alphaNumeric: /^[A-Za-z0-9]+$/,
    uppercase: /[A-Z]+/,
    lowercase: /[a-z]+/,
    email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    phone: /^(\+?0?86\-?)?1[345789]\d{9}$/,
    url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
    zipCode: /^[1-9]d{5}$/,
    timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
    dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
    hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
};

function regexpCheck(key, regexp) {
    validators[key] = (value) => regexp.test(value);
}

for (let key in regexps) {
    if (regexps.hasOwnProperty(key)) {
        regexpCheck(key, regexps[key]);
    }
}

export default validators;

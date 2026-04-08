export const APP_REGEX = {
    // Text-area
    NEW_LINE: /\r\n|\r|\n/g,
    END_OF_LINE: /\r\n/g,
    LINE_FEED: /\n/g,
    CARRIAGE_RETURN: /[\r]/g,
    NEW_LINE_AND_SPACE: /\r\n|\r|\n/g,
    // HTML Editor
    HTML_TAGS: /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/ig,
    HTML_BR_TAG_ONLY: /<br.*?>/g,
    HTML_STYLE_TAG_ONLY: /<style.*?>.*?<\/style>/g,
    HTML_COMMENT_TAG_ONLY: /<!--.*?-->/sg,
    // URL
    URL_PROTOCOL_INCLUDES: /(?:(?:https|http):\/\/)/,
    URL_PROTOCOL_START_WITH: /^(?:(?:https|http):\/\/)/,
    URL_HTTPS_AND_HTTP_VALIDATION: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?\s*$/,
    URL_HTTPS_ONLY_VALIDATION: /^(https:\/\/www\.|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?\s*$/,
    // Email
    EMAIL_DOMAIN_REGEX: '(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]',
    Email: /^[\d\w._-]+@([\d\w._-]+\.)+[\w]+$/i
};

export class RegexHelper {
    public static checkEmailIsValid(email: string): boolean {
        return APP_REGEX.Email.test(email);
    }
}

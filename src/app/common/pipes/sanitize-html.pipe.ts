import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
//
import { APP_REGEX } from '@app/utilities';

export const SanitizeConfig = {
    ALLOWED_TAGS: ['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'b', 'bdi', 'big', 'blockquote', 'br',
        'button', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn',
        'dir', 'div', 'dl', 'dt', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5',
        'h6', 'head', 'header', 'hr', 'html', 'i', 'img', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark',
        'menu', 'menuitem', 'meter', 'nav', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt',
        'ruby', 's', 'samp', 'section', 'small', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody',
        'td', 'tfoot', 'th', 'thead', 'time', 'tr', 'tt', 'u', 'ul', 'var', 'wbr'],
    ALLOWED_ATTR: ['abbr', 'accept-charset', 'accept', 'accesskey', 'action', 'align', 'alt', 'autocomplete', 'autosave',
        'axis', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'challenge', 'char', 'charoff', 'charset', 'checked',
        'cite', 'clear', 'color', 'cols', 'colspan', 'compact', 'contenteditable', 'coords', 'datetime', 'dir', 'disabled',
        'draggable', 'dropzone', 'enctype', 'for', 'frame', 'headers', 'height', 'high', 'href', 'hreflang', 'hspace',
        'ismap', 'keytype', 'label', 'lang', 'list', 'longdesc', 'low', 'max', 'maxlength', 'media', 'method', 'min',
        'multiple', 'name', 'nohref', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder',
        'prompt', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'rows', 'rowspan', 'rules',
        'scope', 'selected', 'shape', 'size', 'span', 'spellcheck', 'src', 'start', 'step', 'style', 'summary', 'tabindex',
        'target', 'title', 'type', 'usemap', 'valign', 'value', 'vspace', 'width', 'wrap', 'class', 'hasclickevent'],
};

@Pipe({
    name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string): SafeHtml {
        if (!value) {
            return '';
        }
        // prevent xss for body tag
        const indexOfOpenBody = value.indexOf('<body');
        const indexOfCloseBody = value.indexOf(`/body>`);
        if (indexOfCloseBody !== -1 && indexOfOpenBody !== -1) {
            value = value.substring(indexOfOpenBody, indexOfCloseBody - 1);
        }
        //
        value = value.replace(APP_REGEX.HTML_COMMENT_TAG_ONLY, '');
        const safeHtmlByDomPurify: string = DOMPurify.sanitize(`${value}`, SanitizeConfig);
        return this.sanitizer.bypassSecurityTrustHtml(safeHtmlByDomPurify);
    }
}

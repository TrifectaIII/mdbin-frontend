import DOMPurify from 'dompurify';
import {
    marked,
} from 'marked';

const renderMD =
    (md: string): string => DOMPurify.sanitize(marked.parse(md));

export default renderMD;

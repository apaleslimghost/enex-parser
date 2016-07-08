import cheerio from 'cheerio';
import toMarkdown from 'to-markdown';

const $_ = ($, fn) => (i, el) => fn($(el), $);
const parseDate = dateString => {
	const [matches, Y, M, d, h, m, s] = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(dateString) || [];
	if(matches) return new Date(Y, M, d, h, m, s);
};

const cheerioParse = fn => data => fn(cheerio.load(data, {
	xmlMode: true,
	normalizeWhitespace: true,
}));

const parseContent = cheerioParse($ => toMarkdown($('en-note').html()));

const parseNote = (el, $) => ({
	title: el.find('title').text(),
	created: parseDate(el.find('created').text()),
	updated: parseDate(el.find('updated').text()),
	tags: el.find('tag').map($_($, tag => tag.text())).toArray(),
	content: parseContent(el.find('content').contents().contents().text()),
});

const parseNotes = $ => $('note').map($_($, parseNote)).toArray();

module.exports = cheerioParse(parseNotes);

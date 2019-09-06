import date from './date';
import text from './text';
import textarea from './textarea';
import image from './image';
import arrayOfObjects from './body-page-editor/body-page-editor';

const controls = {
	text: text,
	date: date,
	slug: text,
	textarea: textarea,
	image: image,
};

controls['array-of-objects'] = arrayOfObjects;

export default controls;

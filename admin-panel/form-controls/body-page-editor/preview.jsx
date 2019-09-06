import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid/v4';

async function generateRenderedHTML(uuid, elements) {
	return await fetch('/api/v1/render', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ uuid, body: elements }),
	}).then(response => response.text());
}

export default function Preview({ elements }) {
	const [previewUrl, setPreviewUrl] = useState('');
	const [uuid] = useState(uuidv4());

	useEffect(() => {
		generateRenderedHTML(uuid, elements).then(url => setPreviewUrl(url));
	}, [JSON.stringify(elements)]);

	return <iframe className="preview" src={previewUrl} />;
}

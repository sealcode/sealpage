const React = require('react');
const { useState } = React;

module.exports = function date(props) {
	const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
	const [imageFile, setImageFile] = useState(null);

	return (
		<div>
			<input
				id={props.name}
				name={props.name}
				onChange={function onChange(e) {
					const reader = new FileReader();
					const file = e.target.files[0];
					reader.onloadend = () => {
						setImageFile(file);
						setImagePreviewUrl(reader.result);
					};
					reader.readAsDataURL(file);
					return props.onChange(e.target.value);
				}}
				required={props.required}
				accept={'image/*'}
				type={'file'}
				value={props.value}
			/>
			<img
				src={imagePreviewUrl}
				style={{
					height: '100px',
					width: '100px',
					objectFit: 'contain',
				}}
			/>
		</div>
	);
};

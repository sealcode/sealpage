import React, { useState } from 'react';
import FloatingLabel from '../floating-label/floating-label';

function image(props) {
	const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	return (
		<FloatingLabel label={props.name} type="file" htmlFor={props.name}>
			<div className="image-container">
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
		</FloatingLabel>
	);
}

export default image;

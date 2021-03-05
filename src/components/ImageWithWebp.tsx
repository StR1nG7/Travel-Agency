import React from "react";

interface IImageWithWebp {
	srcWebp: string,
	fallback: string,
	alt?: string,
	title?: string,
	style: object
}

const ImageWithWebp: React.FC<IImageWithWebp> = (
		{
			srcWebp,
			fallback,
			...imgAttrs
		}
) => {

	return (
			<picture>
				<source srcSet={srcWebp} type='image/webp'/>
				<img src={fallback} {...imgAttrs} />
			</picture>
	)
};

export default ImageWithWebp;


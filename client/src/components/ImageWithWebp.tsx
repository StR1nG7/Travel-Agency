import React from 'react';

interface IImageWithWebp {
  srcWebp: string,
  fallback: string,
  alt?: string,
  title?: string,
  style?: object
}

const ImageWithWebp: React.FC<IImageWithWebp> = (
    {
      srcWebp,
      fallback,
      alt,
      ...imgAttrs
    },
) => (
  <picture>
    <source srcSet={srcWebp} type="image/webp" />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <img src={fallback} alt={alt} {...imgAttrs} />
  </picture>
);

export default ImageWithWebp;

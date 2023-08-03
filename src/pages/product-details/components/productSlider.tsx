/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Stack, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductSlider = ({ product }: { product: any }) => {
  const [activeImages, setActiveImages] = useState(0);

  return (
    <Stack spacing={1}>
      <img
        src={product?.images[activeImages].image_url}
        alt={product?.slug}
        height={530}
        width={560}
      />
      <Stack direction='row' spacing={1} width='100%' position='relative'>
        <IconButton
          sx={{
            position: 'absolute',
            left: -16,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        {product.images.map((img: any, idx: number) => (
          <img
            onClick={() => setActiveImages(idx)}
            key={img.id}
            src={img.image_url}
            className='cursor-pointer'
            alt='img-thumbnail'
            height={165}
            width={165}
          />
        ))}
        <IconButton
          sx={{
            position: 'absolute',
            right: -16,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ProductSlider;

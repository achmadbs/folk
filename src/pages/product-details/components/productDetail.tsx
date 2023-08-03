/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography, Rating, Button } from '@mui/material';
import { FormatRupiah } from 'utils/mixins';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ProductDetail = ({ product }: { product: any }) => {
  return (
    <Stack>
      <Typography
        variant='h5'
        fontFamily='Gotham'
        fontWeight='bold'
        color='text.secondary'
      >
        {product?.name}
      </Typography>
      <Typography
        variant='h6'
        fontFamily='Gotham'
        color='text.secondary'
        lineHeight={2}
      >
        {product?.product_type.name}
      </Typography>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Rating name='rating' value={7} readOnly size='small' />
        <Typography variant='body2'>(7)</Typography>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography
          variant='subtitle1'
          color='#EB3F36'
          textAlign='center'
          lineHeight={2}
          fontWeight='bold'
        >
          Rp. {FormatRupiah.format(product?.price)}
        </Typography>
        <Button size='small' startIcon={<EventAvailableIcon />}>
          Tersedia
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductDetail;

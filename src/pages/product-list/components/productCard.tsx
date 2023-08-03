/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FormatRupiah } from 'utils/mixins';

const ProductCard = ({
  product,
  isRecommendation,
}: {
  product: any;
  isRecommendation?: boolean;
}) => {
  return (
    <Link
      to={isRecommendation ? '' : `details/${product.id}`}
      state={{ product }}
    >
      <Card
        sx={{
          ':hover': {
            border: isRecommendation ? 'none' : '1px solid #EB3F36',
          },
        }}
      >
        <CardMedia
          component='img'
          image={product?.images[0]?.image_url}
          alt={product?.slug}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant='caption'
            fontFamily='Gotham'
            color='text.secondary'
            fontWeight='bold'
          >
            {product?.name}
          </Typography>
          <Typography variant='body2' color='text.secondary' lineHeight={2}>
            {product?.product_type.name}
          </Typography>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            spacing={1}
          >
            <Rating name='rating' value={7} readOnly size='small' />
            <Typography variant='body2'>(7)</Typography>
          </Stack>
          <Typography
            variant='subtitle1'
            color='#EB3F36'
            lineHeight={2}
            fontWeight='bold'
          >
            Rp. {FormatRupiah.format(product?.price)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;

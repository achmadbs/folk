/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  Breadcrumbs,
  Container,
  Stack,
  Typography,
  Link,
  Button,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProductCard from 'pages/product-list/components/productCard';
import ProductSlider from './components/productSlider';
import ProductDetail from './components/productDetail';

const ProductDetails = () => {
  const {
    state: { product },
  } = useLocation();
  const [counter, setCounter] = useState(0);
  const [activeTabs, setActiveTabs] = useState(0);

  const _TABCONTENT = [product?.description, 'Informasi'];

  const renderActions = (
    <Stack direction='row' spacing={2}>
      <Stack direction='row' spacing={1}>
        <button
          className='border border-gray-100 p-3'
          onClick={() => {
            if (counter < 1) return null;
            setCounter((prevState) => prevState - 1);
          }}
        >
          <RemoveIcon />
        </button>
        <Box py={2} px={3} border='1px solid #F1F1F1'>
          {counter}
        </Box>
        <button
          className='border border-gray-100 p-3'
          onClick={() => setCounter((prevState) => prevState + 1)}
        >
          <AddIcon />
        </button>
      </Stack>
      <Button
        variant='contained'
        color='info'
        size='large'
        sx={{ borderRadius: 0 }}
      >
        Tambah Ke Keranjang
      </Button>
      <button
        className='border border-gray-100 p-3.5 bg-[#F5F5F5]'
        onClick={() => setCounter((prevState) => prevState + 1)}
      >
        <FavoriteBorderIcon color='info' />
      </button>
    </Stack>
  );

  const renderTabs = (
    <Stack direction='row' justifyContent='center'>
      <Stack direction='row' spacing={2}>
        <Box width={160} textAlign='center'>
          <Typography
            color={activeTabs === 0 ? '#EB3F36' : '#BEBEBE'}
            variant='h6'
            fontFamily='Gotham'
            fontWeight='bold'
            lineHeight={2}
            sx={{ cursor: 'pointer' }}
            onClick={() => setActiveTabs(0)}
            textTransform='uppercase'
          >
            Deskripsi
          </Typography>
          {activeTabs === 0 && (
            <Divider
              color='#EB3F3'
              sx={{
                borderBottomWidth: 4,
                borderRadius: 8,
              }}
            />
          )}
        </Box>
        <Box width={160} textAlign='center'>
          <Typography
            color={activeTabs === 1 ? '#EB3F36' : '#BEBEBE'}
            variant='h6'
            fontFamily='Gotham'
            fontWeight='bold'
            lineHeight={2}
            sx={{ cursor: 'pointer' }}
            onClick={() => setActiveTabs(1)}
            textTransform='uppercase'
          >
            Informasi
          </Typography>
          {activeTabs === 1 && (
            <Divider
              color='#EB3F3'
              sx={{
                borderBottomWidth: 4,
                borderRadius: 8,
              }}
            />
          )}
        </Box>
      </Stack>
    </Stack>
  );

  const renderRecommendation = (
    <Stack alignItems='center' spacing={3}>
      <Box textAlign='center'>
        <Typography
          color={'#EB3F36'}
          variant='h6'
          fontFamily='Gotham'
          fontWeight='bold'
          lineHeight={2}
          sx={{ cursor: 'pointer' }}
          onClick={() => setActiveTabs(1)}
          textTransform='uppercase'
        >
          Rekomendasi untuk anda
        </Typography>
        <Divider
          variant='middle'
          color='#EB3F3'
          sx={{
            borderBottomWidth: 4,
            borderRadius: 8,
          }}
        />
      </Box>
      <Grid
        container
        columns={{ xs: 3, sm: 8, md: 12 }}
        gap={2}
        justifyContent='center'
      >
        {Array.from(Array(3)).map((_, index: number) => (
          <Grid xs={2} sm={3} md={3} key={index}>
            <ProductCard {...{ product }} isRecommendation={true} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );

  return (
    <Container sx={{ paddingY: '1.5rem' }} maxWidth={false}>
      <Stack px={3} spacing={4}>
        <Stack spacing={2}>
          <Breadcrumbs separator='››' aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/product'>
              Home
            </Link>
            <Typography color='#EB3F36'>{product?.name}</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack direction='row' spacing={3}>
          <ProductSlider {...{ product }} />
          <Stack spacing={3}>
            <ProductDetail {...{ product }} />
            {renderActions}
            <Typography color='#696969'>
              {product?.short_description}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} px={6}>
          {renderTabs}
          <Typography color='#696969'>{_TABCONTENT[activeTabs]}</Typography>
        </Stack>
        {renderRecommendation}
      </Stack>
    </Container>
  );
};

export default ProductDetails;

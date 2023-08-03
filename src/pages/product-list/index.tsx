import { useEffect, useState } from 'react';
import {
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  MenuItem,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormatRupiah } from 'utils/mixins';
import {
  ACCORDION_DATA,
  PAGE_SIZE_OPTIONS,
  SORT_OPTIONS,
} from 'utils/constant';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'utils/axiosInstance';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'hooks/useDebounce';
import ProductCard from './components/productCard';

const CustomSliderStyles = {
  '& .MuiSlider-thumb': {
    width: 10,
    height: 10,
    color: '#EB3F36',
  },
  '& .MuiSlider-track': {
    color: '#EB3F36',
  },
  '& .MuiSlider-rail': {
    color: '#757575',
  },
};

const MIN_PRICE = 10000;
const MAX_PRICE = 250000;

const ProductList = () => {
  const [value, setValue] = useState<number[]>([10000, 225000]);
  const [pageSize, setPageSize] = useState('12');
  const [sortBy, setSortBy] = useState('product_name');
  const [productsData, setProductsData] = useState([]);
  const { search } = useLocation();
  const searchKeyword = new URLSearchParams(search).get('keyword');
  const minPrice = useDebounce(value[0], 500);
  const maxPrice = useDebounce(value[1], 500);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get('product', {
          params: {
            keyword: searchKeyword,
            price: `${minPrice},${maxPrice}`,
            page: 1,
            limit: pageSize,
            order: `${sortBy},ASC`,
          },
        });
        setProductsData(data.data.data.list);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [pageSize, sortBy, searchKeyword, minPrice, maxPrice]);

  function handleChangePriceRange(_: Event, newValue: number | number[]) {
    setValue(newValue as number[]);
  }

  function handleChangePageSize(e: SelectChangeEvent) {
    setPageSize(e.target.value);
  }

  function handleChangeSortBy(e: SelectChangeEvent) {
    setSortBy(e.target.value);
  }

  const renderAccordion = ACCORDION_DATA.map(({ name, data }) => (
    <Accordion defaultExpanded elevation={0} disableGutters key={name}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        sx={{ backgroundColor: '#F5F5F5' }}
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data.map(({ name, value }) => (
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            key={name}
          >
            <FormControlLabel control={<Checkbox disabled />} label={name} />
            <Typography variant='subtitle2' color='#868686'>
              ({value})
            </Typography>
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  ));

  const renderFilterActions = (
    <Stack justifyContent='space-between' flexDirection='row' width='100%'>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography variant='subtitle1'>Menampilkan</Typography>
        <FormControl
          sx={{ m: 1, width: 'min-content', backgroundColor: '#F8F8F8' }}
        >
          <Select value={pageSize} onChange={handleChangePageSize} size='small'>
            {PAGE_SIZE_OPTIONS.map((value) => (
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant='subtitle1'>dari</Typography>
        <Typography variant='subtitle1'>132</Typography>
      </Stack>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography variant='subtitle1'>Urutkan</Typography>
        <FormControl
          sx={{ m: 1, width: 'min-content', backgroundColor: '#F8F8F8' }}
        >
          <Select value={sortBy} onChange={handleChangeSortBy} size='small'>
            {SORT_OPTIONS.map(({ label, value }) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );

  return (
    <Container sx={{ paddingY: '1.5rem' }} maxWidth={false}>
      <Stack spacing={2}>
        <Breadcrumbs separator='››' aria-label='breadcrumb'>
          <Link underline='hover' color='inherit' href='/product'>
            Home
          </Link>
          <Link underline='hover' color='inherit' href='/product'>
            Product
          </Link>
          <Typography color='#EB3F36'>Roasted Bean</Typography>
        </Breadcrumbs>
      </Stack>
      <Stack direction='row' my={4}>
        <Box width={338}>
          <Accordion defaultExpanded elevation={0} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>URUTKAN BERDASARKAN</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Harga</Typography>
              <Slider
                getAriaLabel={() => 'Price range'}
                sx={CustomSliderStyles}
                value={value}
                onChange={handleChangePriceRange}
                min={MIN_PRICE}
                max={MAX_PRICE}
              />
              <Stack direction='row' spacing={1}>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <p>Rp.</p>
                  <TextField
                    size='small'
                    sx={{ width: 100, backgroundColor: '#F8F8F8' }}
                    disabled
                    value={FormatRupiah.format(value[0])}
                  />
                </Stack>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <p>- Rp.</p>
                  <TextField
                    size='small'
                    sx={{ width: 100, backgroundColor: '#F8F8F8' }}
                    disabled
                    value={FormatRupiah.format(value[1])}
                  />
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          {renderAccordion}
        </Box>
        <Box
          flex={1}
          pt={1.5}
          pl={2}
          display='flex'
          alignItems='flex-start'
          flexDirection='column'
          gap={4}
        >
          {renderFilterActions}
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} gap={2}>
            {productsData.map((product, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <ProductCard {...{ product }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default ProductList;

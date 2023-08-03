import {
  Box,
  Button,
  Toolbar,
  TextField,
  Stack,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSearchParams, Outlet } from 'react-router-dom';

const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('keyword') ?? '';
  const [searchValue, setSearchValue] = useState(query);

  function handleSearchParams() {
    if (!searchValue) {
      setSearchParams({});
    } else {
      setSearchParams({ keyword: searchValue });
    }
  }

  const renderNavbar = (
    <Toolbar>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='end'
        width='100%'
        spacing={2}
      >
        <Stack direction='row'>
          <TextField
            size='small'
            placeholder='Cari Produk'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ boxShadow: 3, padding: 0, borderRadius: 2, minWidth: 300 }}
          />
          <Button
            aria-label='delete'
            variant='contained'
            color='info'
            onClick={handleSearchParams}
          >
            <SearchIcon />
          </Button>
        </Stack>
        <Stack direction='row'>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <LocalMallOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlineIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Toolbar>
  );

  return (
    <>
      {renderNavbar}
      <Box bgcolor='#F5F5F5' paddingLeft={8}>
        <Button
          variant='contained'
          color='info'
          size='large'
          sx={{ borderRadius: 0 }}
          endIcon={<ArrowDropDownIcon />}
        >
          Belanja
        </Button>
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;

import React from 'react';
import { Box, Typography, Button,Theme} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdminToken } from '../../redux/Features/reducers/adminAuthSlice';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
      },
  },
  imageBox: {
    width: '40%',
    height: 'auto',
    [theme.breakpoints.down('lg')]: {
      width: '80%',
    },
  },
  contentBox: {
    position: 'absolute',
    bottom: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  header: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.spacing(2),
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  const adminToken = useSelector(selectAdminToken)

  return (
    <Box className={classes.root}>
      <img src="assets/404img1.svg" alt="" className={classes.imageBox} />
      <Box className={classes.contentBox}>
        <Typography variant="h5" color={'white'} className={classes.header}>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Link to={location.pathname.includes('admin')&&adminToken ? '/admin':'/'}>
        <Button variant="contained" color="primary" className={classes.button} sx={{textTransform:'initial',fontSize:22}}>
          GoToHome
        </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFoundPage;


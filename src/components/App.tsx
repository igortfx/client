import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import 'dotenv/config';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'assets/styles/App.scss';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

// Layout
import Navbar from 'components/layout/Navbar';
import Header from 'components/layout/Header';
import LeftSidebar from 'components/layout/LeftSidebar';
import MainContent from 'components/layout/MainContent';
import RightSidebar from 'components/layout/RightSidebar';
import Footer from 'components/layout/Footer';

// Partials
import Loader from 'components/partials/Loader';
import ReactNotification from 'react-notifications-component';

//  Actions
import { verification } from 'actions/user';
import { getConfig } from 'actions/config';

// Types
import AppState from '../redux/types/app';

// Axios auth header
axios.defaults.headers.common.nyxAuthToken = localStorage.nyxToken;

interface Props {}

const App: React.FC<Props> = () => {
  const loading = useSelector((state: AppState) => state.user.account.verified);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verification());
    dispatch(getConfig());
  }, [dispatch]);

  return (
    <>
      <title>{process.env.REACT_APP_MU_NAME}</title>
      <Router>
        <div className='App'>
          <Navbar />
          <Header />
          <div className='Container'>
            <LeftSidebar />
            <MainContent />
            <RightSidebar />
          </div>
          <Footer />
          <Loader active={loading === null} styles='dark' />
        </div>
        <ReactNotification />
      </Router>
    </>
  );
};

export default App;

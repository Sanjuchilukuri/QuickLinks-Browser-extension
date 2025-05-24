// import { useEffect, useRef } from 'react'
import Header from './components/header/Header';
import QuickAccessBar from './components/quickAccessBar/QuickAccessBar';
import LinksList from './components/linksList/LinksList';
import Footer from './components/Footer/Footer';
import AddLinkModal from './components/addLinkModal/AddLinkModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import { UseTheme } from './Hooks/UseTheme';
import { Themes } from './constants';
import UseAuth from './Hooks/UseAuth';
import { IoLogoGithub } from "react-icons/io";

function App() {

  const {currentTheme} = UseTheme();
  const {isAuthenticated, AuthenticateWithGithub, continueWithoutLogin} = UseAuth();

  return (
    <>
      <div 
        data-bs-backdrop="false"
        data-theme={currentTheme == Themes.light?Themes.light:Themes.dark}
        className={`ms-auto vh-100 py-3  bg-primary d-flex flex-column justify-content-between position-relative`}
      >
        <Header/>
        {isAuthenticated ?
          <div className='d-flex flex-column' style={{overflowY:"hidden"}}>
            <QuickAccessBar/>
            <LinksList/>
          </div>
          :
          <>
            <div className='d-flex flex-column h-100 align-items-center justify-content-center'>
              <button className=' btn text-white p-2 bg-secondary' onClick={() => AuthenticateWithGithub()}>
                Authenticate With Github
                <span className='text-primary fs-4 ms-2'>
                  <IoLogoGithub />
                </span>
              </button>
              <span className='text-primary'>OR</span>
              <a className='text-links cursor-pointer' onClick={() => continueWithoutLogin()}>Continue Without Login</a>
            </div>
          </>
        }
        <Footer/>
        <AddLinkModal/>
      </div>
    </>

  )
}

export default App

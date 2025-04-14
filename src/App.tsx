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

function App() {

  const {currentTheme} = UseTheme();
  

  return (

    <div 
      style={{minWidth:"400px"}} 
      data-bs-backdrop="false"
      data-theme={currentTheme == Themes.light?Themes.light:Themes.dark}
      className=" ms-auto vh-100 w-25 py-3  bg-primary position-relative"
    >
      <Header/>
      <QuickAccessBar/>
      <LinksList/>
      <Footer/>
      <AddLinkModal/>
    </div>
    
  )
}

export default App

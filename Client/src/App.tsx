import Routing from './Components/LayoutArea/Routing/Routing';
import Navbar from './Components/LayoutArea/Navbar/Navbar';

// import { LocalizationProvider } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

import './App.css';
import Header from './Components/LayoutArea/Header/Header';
import Footer from './Components/LayoutArea/Footer/Footer';

function App() {
  return(
  // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className='App'>
      <header>
        <Header />
      </header>
      <main>
        <Routing />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  // </LocalizationProvider>
  )
}

export default App;

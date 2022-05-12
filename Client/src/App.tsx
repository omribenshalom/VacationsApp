import Header from "./Components/LayoutArea/Header/Header";
import Footer from "./Components/LayoutArea/Footer/Footer";
import Routing from "./Components/LayoutArea/Routing/Routing";

import "./App.css";

function App() {
  return (
    <div className="App">
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
  );
}

export default App;

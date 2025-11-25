import Home from './pages/Home'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import CountryCard from './components/CountryCard'
import NavBar from './components/NavBar'
import { ThemeProvider } from './context/ThemeContext'
import CountryList from './components/CountryList'
function App() {


  return (
   
    <ThemeProvider>
         <NavBar />
      <h1>Countries App</h1>
   <main>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/country" element={<CountryList/>}/>
          <Route path="/country/:code" element={<CountryCard/>}/>
      </Routes>
      {/* <Home/> */}
      </main>
  
    </ThemeProvider>
  )
}

export default App

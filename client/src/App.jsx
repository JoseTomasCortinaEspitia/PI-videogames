//importo las librerias o dependencias
import { Routes, Route } from 'react-router-dom'

//importo los componentes
import Landing from './views/landing/landing.component'
import Home from './views/home/home.component'
import Form from './views/form/form.component'
import Detail from './views/detail/detail.component'

import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route exact path='/home' element={<Home/>}/>
      <Route path='/home/:id' element={<Detail/>}/>
      <Route path='/form' element={<Form/>}/>
    </Routes>
    </>
  )
}

export default App

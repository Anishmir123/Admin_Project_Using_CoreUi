import React, { Suspense, useEffect } from 'react'
import { Form, HashRouter, Route, Routes } from 'react-router-dom'
// import { Form, BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from './views/dashboard/Dashboard'
import Buttons from './views/buttons/buttons/Buttons'
// import FormPage from './views/forms/FormPage';
// import FormPage from './components/FormPage';
import FormPage from './views/buttons/forms/FormPage'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';

// import Button from './views/pages/button/Button'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ButtonForm = React.lazy(()=> import ('./views/buttons/buttonsform/ButtonForm'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Button = React.lazy(()=>import('./views/pages/button/Button'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
           <Route path="/form" name="ButtonForm" element={<FormPage />} />

          

          <Route path="/form" element={<Form />} />
          <Route path="/button" name="Form Page" element={<Button />} />
          <Route path='/buttons' name='Form Submit' element={<ButtonForm/>}/>
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
          
          {/* <Route exact path="/dashboard" name="Dashboard" element={<Dashboard />} /> */}
          <Route path='/Home' name='Home' element={<DefaultLayout/>}/>
          <Route path="/" element={<Buttons />} />
          {/* <Route path="/form" element={<FormPage />} /> */}
        </Routes>

      </Suspense>
    </HashRouter>
  )
}

export default App



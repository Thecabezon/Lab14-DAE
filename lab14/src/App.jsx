import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import SeriePage from './pages/SeriePage'
import SerieFormPage from './pages/SerieFormPage'
import CategoryFormPage from './pages/CategoryFormPage'
import PrimaryLayout from './layout/PrimaryLayout'
import { AppContextProvider } from './contexts/AppContext'

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrimaryLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/series" element={<SeriePage />} />
            <Route path="/series/new" element={<SerieFormPage />} />
            <Route path="/series/edit/:id" element={<SerieFormPage />} />
            <Route path="/categories/new" element={<CategoryFormPage />} />
            <Route path="/categories/edit/:id" element={<CategoryFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  )
}
export default App
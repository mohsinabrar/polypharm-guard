import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DrugCheckerPage from './pages/DrugCheckerPage'
import DrugInfoPage from './pages/DrugInfoPage'
import ScannerPage from './pages/ScannerPage'
import HealthToolsPage from './pages/HealthToolsPage'
import ResourcesPage from './pages/ResourcesPage'

const WITH_RIGHT_PANEL = ['/', '/checker', '/info', '/scan', '/tools', '/resources']

function Layout() {
  const location = useLocation()
  const showRight = WITH_RIGHT_PANEL.includes(location.pathname)
  return (
    <div className="flex flex-col min-h-screen" style={{background:'#f4f6f9'}}>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"          element={<HomePage />} />
              <Route path="/checker"   element={<DrugCheckerPage />} />
              <Route path="/info"      element={<DrugInfoPage />} />
              <Route path="/scan"      element={<ScannerPage />} />
              <Route path="/tools"     element={<HealthToolsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
          </AnimatePresence>
        </div>
        {showRight && <RightPanel />}
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return <BrowserRouter><Layout /></BrowserRouter>
}

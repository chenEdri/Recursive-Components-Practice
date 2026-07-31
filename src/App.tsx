import { Routes, Route } from 'react-router-dom'
import { PopupHost } from '@/components/common/popup'
import { Layout } from '@/components/Layout'
import { FileExplorer } from '@/features/fileExplorer'
import { About } from '@/pages/About'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<FileExplorer />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <PopupHost />
    </>
  )
}

export default App

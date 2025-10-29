// import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className="flex gap-9">
      <Toaster
        toastOptions={{
          style: {
            color: '#35383E',
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App

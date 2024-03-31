import Banner from "./components/Banner"
import Navbar from "./components/Navbar"
import NewEvent from "./components/NewEvent"
import Shows from "./components/Shows"

function App() {
  return (
    <div>
    
    <Navbar />
    
    <div>
      <Banner />
      <div className="w-full md:w-4/5 mx-auto mt-8">
        <Shows />
      </div>
    </div>
        <NewEvent />
       
        
    
    </div>
  )
}

export default App

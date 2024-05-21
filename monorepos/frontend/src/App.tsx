import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <div className='wrapper'>
        <div className='logo'>
          <img src="https://avatars.githubusercontent.com/u/80271990?s=280&v=4" alt="scratch for discord logo" width="200px" style={{
            marginRight: "10px"
          }}/>
          <p style={{
            marginLeft: "10px"
          }}>Scratch For Discord Code runner</p>
        </div>
        <div style={{
          paddingTop: "20px"
        }}>
          <Link to={"/run"} id='start'>Get Started</Link>
        </div>
      </div>
    </>
  )
}

export default App

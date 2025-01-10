// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import artistLogo from './assets/artist.svg'
import customerLogo from './assets/customer.svg'
import uploadImg from './assets/upload.svg'
import sellImg from './assets/sell.svg'
import './App.css'

function App() {

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <a href="/demo/artist">
          <img src={artistLogo} className="logo" alt="Artist logo" />
          <p>Artist Experience</p>
        </a>
        <a href="/demo/customer">
          <img src={customerLogo} className="logo" alt="Customer logo" />
          <p>Customer Experience</p>
        </a>
      </div>
      <h1>Noise to Ink</h1>

      <h3 className="card">
        <u>Quickly</u> and <u>Easily</u> share & sell prints of your generative artwork.
      </h3>
      <p>
        Noise to Ink is a lightweight platform that allows generative artists like you to easily share their artwork and sell prints to fans!
      </p>
      <p>
        Inspired by the lack of options for showcasing and selling generative artwork (You can't interact with a twitter or instagram post!), 
        I built this platform to let artists showcase their work and allow fans to create and buy original prints, unique to each customer. 
        <br/>
        <br/>
        Currently supports P5.js, with more coming soon.
      </p>
      <br/>
      
      <p>
        How it works:
      </p>
      <div className="explainer">
        <div className="explainer-item">
          <img src={uploadImg} className="logo" alt="Upload Image" />
          <h2>Upload & Edit</h2>
          <p>Upload and edit your code in our browser-based editor.</p>
        </div>
        <div className="explainer-item">
          <img src={sellImg} className="logo" alt="Sell Image" />
          <h2>Generate Link</h2>
          <p>Generate a unique purchase link to your artwork. Share your link with customers, where they can interact with your piece and buy a print.</p>
        </div>
        <div className="explainer-item">
          <img src={customerLogo} className="logo" alt="Print Image" />
          <h2>Share & Sell</h2>
          <p>We'll handle printing and shipping! Thats it!</p>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Icons above to see a quick demo of each side of the experience.
      </p>
    </>
  )
}

export default App

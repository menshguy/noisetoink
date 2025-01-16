// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {useEffect, useState} from 'react'
import artistLogo from './assets/artist.svg'
import customerLogo from './assets/customer.svg'
import uploadImg from './assets/upload.svg'
import sellImg from './assets/sell.svg'
import './App.css'

function App() {
  const products = [
    { name: 'Posters', image: './hero-poster.jpg' },
    { name: 'Mugs', image: './hero-mugs.jpg' },
    { name: 'Prints', image: './hero-print.jpg' },
    { name: 'Stickers', image: './hero-stickers.jpg' },
  ];

  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient-filter" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgb(89, 77, 255)' }} />
            <stop offset="100%" style={{ stopColor: 'rgb(40, 242, 249)' }} />
          </linearGradient>
          <filter id="svg-gradient">
            <feImage href="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='rgb(89, 77, 255)'/%3E%3Cstop offset='100%25' stop-color='rgb(40, 242, 249)'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"/>
            <feComposite operator="in" in2="SourceGraphic"/>
          </filter>
        </defs>
      </svg>

      <nav id="main-nav">
        <div className="nav-left">
          <a href="/" id="nav-logo">
            <span className="noise">Noise</span> to <span className="ink">Ink</span>
          </a>
          <a href="/demo/artist">Artist Demo</a>
          <a href="/demo/customer">Customer Demo</a>
        </div>
        <div className="nav-right">
          <a title="I am the developer of this project! Feel free to email me directly with feedback, ideas, or just to chat!" href="mailto:fenster.js@gmail.com">Contact Me</a>
        </div>
      </nav>


      <div id="header">
        <h1 id="main-title">
          Sell <span>Gen Art</span> Prints... <span className="cursive">Fast</span>
        </h1>

        <h3 id="subtitle">
          The fastest way to create & sell 
          <br/>
          <span>Physical Prints</span> of your <span>Generative Artwork</span>.
        </h3>

        <div className="cta-container">
          <a href="/demo/artist" className="cta-button">
            <img src={artistLogo} className="cta-icon" alt="Artist icon" />
            Try Artist Demo
          </a>
          <a href="/demo/customer" className="cta-button">
            <img src={customerLogo} className="cta-icon" alt="Customer icon" />
            Try Customer Demo
          </a>
        </div>
      </div>

      <div className="showcase-image">
        <img 
          src={products[currentProduct].image} 
          alt={`${products[currentProduct].name} Product Image`} 
        />
        <div className="product-buttons">
          {products.map((product, index) => (
            <button
              key={product.name}
              className={`product-button ${index === currentProduct ? 'active' : ''}`}
              onClick={() => setCurrentProduct(index)}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>
      


      <section id="showcase">
        <h2>How it works</h2>

        <div className="showcase-container">
          <div className="showcase-steps">
              <div className="step">
                <h3>✨ Step 1: Create or Upload</h3>
                <p>Bring your artwork to life in seconds with our <span>in-browser editor.</span></p>
                <img src="./steps-editor.png" alt="editor step" />
              </div>
              <div className="step">
                <h3>✨ Step 2: Generate Link</h3>
                <div className="share-link">
                  <input 
                    type="text" 
                    value="https://noisetoink.com/demo/customer" 
                    readOnly
                  />
                  <button className="copy-button" onClick={() => {}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 3H4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 7H20V20H8V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <p>Each piece gets its own <span>unique purchase link</span> that you can share anywhere.</p>
              </div>
              <div className="step">
                <h3>✨ Step 3: Share & Sell</h3>
                <p>Customers can use your unique link to interact with your arwork and purchase beautiful prints and other products!</p>
              </div>
            </div>
        </div>

        <div className="disclaimer">
          <div className="disclaimer-item">
            <h3>Always Free</h3>
            <p>We make money by adding a small fee to every sale. We will never charge you a dime.</p>
          </div>
          <div className="disclaimer-item">
            <h3>Your Code is Yours</h3>
            <p>We use your code solely to bring your creations to life. We will never share your code with anyone or use it for any other purpose.</p>
          </div>
        </div>
        
      </section>

      {/* <h2 className="section-title">How it works:</h2>
      <div className="explainer">
        <div className="explainer-item">
          <img src={uploadImg} className="logo" alt="Upload Image" />
          <h3>Upload & Edit</h3>
          <p>Upload and edit your code in our browser-based editor.</p>
        </div>
        <div className="explainer-item">
          <img src={sellImg} className="logo" alt="Sell Image" />
          <h3>Generate Link</h3>
          <p>Generate a unique purchase link to your artwork. Share your link with customers, where they can buy a print.</p>
        </div>
        <div className="explainer-item">
          <img src={customerLogo} className="logo" alt="Print Image" />
          <h3>Share & Sell</h3>
          <p>We'll handle printing and shipping! That's it!</p>
        </div>
      </div> */}
{/* 
      <h2 className="section-title">Value Prop:</h2>
      <div className="explainer">
        <div className="explainer-item">
          <h3>Completely Free</h3>
          <p>We will never charge you anything. We make a small fee on every sale that is added to the customer's charge.</p>
        </div>
        <div className="explainer-item">
          <h3>Your Artwork and Algorithms are yours.</h3>
          <p>We will never use your code for anything other than generating your print.</p>
        </div>
        <div className="explainer-item">
          <h3>Friction Free</h3>
          <p>Share your links with anyone, anywhere. No need to worry about hosting or payment processing.</p>
        </div>
      </div>



      <div className="card value-prop">
        <ul>
          <li>Always Free (we add a small fee to every sale you make - thats it) </li>
          <li>Your code are artwork are always yours (we will never use your code or artwork for anything)</li>
        </ul>
      </div>
      
      <p className="platform-description">
        Noise to Ink is a lightweight platform that allows generative artists like you to easily share their artwork and sell prints to fans!
      </p>
      <p className="platform-description">
        Inspired by the lack of options for showcasing and selling generative artwork (You can't interact with a Twitter or Instagram post!), 
        I built this platform to let artists showcase their work and allow fans to create and buy original prints, unique to each customer. 
        <br/>
        <br/>
        Currently supports P5.js, with more coming soon.
      </p>
      <br/> */}
    </>
  )

}

export default App

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {useEffect, useState} from 'react'
import artistLogo from './assets/artist.svg'
import customerLogo from './assets/customer.svg'
// import uploadImg from './assets/upload.svg'
// import sellImg from './assets/sell.svg'
import './App.css'

function App() {
  const products = [
    { name: 'Posters', image: '/hero-poster.jpg' },
    { name: 'Mugs', image: '/hero-mugs.jpg' },
    { name: 'Prints', image: '/hero-print.jpg' },
    { name: 'Stickers', image: '/hero-stickers.jpg' },
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
          {/* <a href="/demo/artist">Artists Demo</a>
          <a href="/demo/customer">Customer Demo</a> */}
        </div>
        <div className="nav-right">
          <a title="I am the developer of this project! Feel free to email me directly with feedback, ideas, or just to chat!" href="mailto:fenster.js@gmail.com">Contact Me</a>
        </div>
      </nav>


      <section id="hero">
        <h1 id="main-title">
          <span>Generative Art...</span> <span className="cursive">unplugged</span>
        </h1>

        <h3 id="subtitle">
          The fastest way to create, share, and sell 
          <br/>
          your Generative Artwork as <span>Physical Prints</span>.
        </h3>
        
        <div id="cta-section">
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

        <div 
          className="scroll-indicator" 
          onClick={() => {
            document.querySelector('.showcase-wrapper')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
        >
          <div className="scroll-text">Learn More</div>
          <div className="scroll-arrow"></div>
        </div>
        
      </section>

      <div className="showcase-wrapper">
        <section className="showcase-image">
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
        </section>

        <section id="showcase">
          {/* <h2>How it works</h2> */}
          <div className="showcase-container">
            <div className="showcase-steps">
              <div className="step">
                <h3>1. In-Browser Editor</h3>
                <p>Create and edit your artwork using our <span>in-browser code editor.</span></p>
                {/* <img src="./steps-editor.png" alt="editor step" /> */}
              </div>
              <div className="step">
                <h3>2. Share *Instantly*</h3>
                <p>Generate a <span>shareable link</span> for each project that you can post anywhere.</p>
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
              </div>
              <div className="step">
                <h3>3. Sell Easily</h3>
                <p>
                  Simply select the products you want sell and our print partners will handle the rest for you!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section>
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
    </>
  )

}

export default App

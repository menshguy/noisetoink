import React, { useState, useEffect, useRef } from 'react';
import p5 from 'p5';
import { HslColorPicker } from 'react-colorful';
import TutorialPrompt from './TutorialPrompt'
import './CustomerDemo.css';
import { useNav } from '../../context/NavContext';

interface SketchConfig {
  strokeColor: { h: number; s: number; l: number };
  backgroundColor: { h: number; s: number; l: number };
  circleSize: number;
}

interface CheckoutModalProps {
  config: SketchConfig;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ config, onClose }) => {
  const modalSketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!modalSketchRef.current) return;
    const { strokeColor, backgroundColor, circleSize } = config;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(600, 600);
        canvas.parent(modalSketchRef.current!);
        p.colorMode(p.HSL)
      };

      p.draw = () => {
        p.background(backgroundColor.h, backgroundColor.s, backgroundColor.l);
        p.stroke(strokeColor.h, strokeColor.s, strokeColor.l);
        p.noFill();
        p.circle(p.width / 2, p.height / 2, circleSize * 3);
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      p5Instance.current?.remove();
    };
  }, [config]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Checkout</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div ref={modalSketchRef} className="modal-sketch-container" />
        <div className="modal-body">
          <h3>Your Custom Print</h3>
          <div className="print-details">
            <p>Size: 12" x 12"</p>
            <p>Material: Premium Matte Paper</p>
            <p>Price: $29.99</p>
          </div>
          <button className="primary-button">Complete Purchase</button>
        </div>
      </div>
    </div>
  );
};

const CustomerDemo: React.FC = () => {
  const {navHeight} = useNav();
  const [config, setConfig] = useState<SketchConfig>({
    strokeColor: { h: 0, s: 50, l: 50 },
    backgroundColor: { h: 180, s: 50, l: 90 },
    circleSize: 50,
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  // P5.js sketch setup
  useEffect(() => {
    if (!sketchRef.current) return;
    const { strokeColor, backgroundColor, circleSize } = config;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(500, 500);
        canvas.parent(sketchRef.current!);
        p.colorMode(p.HSL)
      };

      p.draw = () => {
        p.background(backgroundColor.h, backgroundColor.s, backgroundColor.l);
        p.stroke(strokeColor.h, strokeColor.s, strokeColor.l);
        p.noFill();
        p.circle(p.width / 2, p.height / 2, circleSize * 3);
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      p5Instance.current?.remove();
    };
  }, [config]);

  const handleRegenerate = () => {
    p5Instance.current?.redraw();
  };

  const handleSaveImage = () => {
    p5Instance.current?.saveCanvas('artwork', 'png');
  };

  return (
    <div className="customer-demo" style={{ height: `calc(100vh - ${navHeight}px)`, maxHeight: '100vh' }}>
      {/* Left Section - Artwork Display */}
      <div className="artwork-section">
        <div className="artwork-container">
          <TutorialPrompt message="Here customers can view and play with your piece." />
          <div ref={sketchRef} className="sketch-container" />
          <div className="button-container">
            <button onClick={handleRegenerate}>Regenerate</button>
            <button onClick={handleSaveImage}>Save as PNG</button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="controls-section">
        {/* Customer Config Section */}
        <div className="config-section">
          <h2>Customer Configuration</h2>

          <TutorialPrompt message="Here is where your customer can configure any variables you have exposed to them." />
          
          <div className="pickers-section">
            <div className="config-item">
              <label>Stroke Color</label>
              <HslColorPicker
                color={config.strokeColor}
                onChange={(color) => setConfig({ ...config, strokeColor: color })}
                />
            </div>

            <div className="config-item">
              <label>Background Color</label>
              <HslColorPicker
                color={config.backgroundColor}
                onChange={(color) => setConfig({ ...config, backgroundColor: color })}
                />
            </div>
          </div>

          <div className="config-item">
            <label>Circle Size</label>
            <input
              type="range"
              min="1"
              max="100"
              value={config.circleSize}
              onChange={(e) => setConfig({ ...config, circleSize: Number(e.target.value) })}
            />
            <span>{config.circleSize}</span>
          </div>

          {/* Checkout Section */}
          <TutorialPrompt message="Product selection UI will be implemented using the Printful API" />
          <button 
            className="checkout-button"
            onClick={() => setIsModalOpen(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {isModalOpen && <CheckoutModal config={config} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default CustomerDemo;
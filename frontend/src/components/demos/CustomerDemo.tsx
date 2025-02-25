import React, { useState, useEffect, useRef } from 'react';
import p5 from 'p5';
import { HslColorPicker } from 'react-colorful';
import './CustomerDemo.css';

interface SketchConfig {
  strokeColor: { h: number; s: number; l: number };
  backgroundColor: { h: number; s: number; l: number };
  circleSize: number;
}

const CustomerDemo: React.FC = () => {
  const [config, setConfig] = useState<SketchConfig>({
    strokeColor: { h: 0, s: 50, l: 50 },
    backgroundColor: { h: 180, s: 50, l: 90 },
    circleSize: 50,
  });
  
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  // P5.js sketch setup
  useEffect(() => {
    if (!sketchRef.current) return;
    const { strokeColor, backgroundColor, circleSize } = config;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(400, 400);
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
    <div className="customer-demo">
      {/* Left Section - Artwork Display */}
      <div className="artwork-section">
        <div className="artwork-container">
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

          <p>Product selection UI will be implemented using the Printful API</p>
          <button 
            className="checkout-button"
            onClick={() => console.log('Navigate to checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDemo;
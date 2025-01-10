import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import Controlled from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { FaClipboard, FaExternalLinkAlt } from 'react-icons/fa';

// Extend the Window interface to include p5Instance
declare global {
  interface Window {
    p5Instance?: p5;
  }
}

const startCode =
`
/** 
 * IMPORTANT NOTE:
 * For now, all P5JS methods must be 
 * called from the p5 instance object "p".
 * 
 * For example, instead of circle(...), 
 * you must call p.cirlce(...) 
 */

p.setup = () => {
  p.createCanvas(400, 400);
  p.noLoop();
  p.colorMode(p.HSL);
}
    
p.draw = () => {
  p.background(230, 30, 95);
  p.noFill();
  p.strokeWeight(2);

  let gridSize = 10;
  for (let x = 0; x < p.width; x += gridSize) {
    for (let y = 0; y < p.height; y += gridSize) {
      let n = p.noise(x * 0.05, y * 0.05);
      let hue = p.map(n, 0, 1, 180, 360);
      p.stroke(hue, 80, 100, 80);
      
      p.push();
      p.translate(x + gridSize / 2, y + gridSize / 2);
      let angle = n * p.TWO_PI;
      let radius = gridSize / 3;
      
      // Draw inky squiggle lines
      p.beginShape();
      for (let i = 0; i < 8; i++) {
        let px = p.cos(angle + i * p.PI / 4) * radius * p.noise(i * 0.3);
        let py = p.sin(angle + i * p.PI / 4) * radius * p.noise(i * 0.3);
        p.vertex(px, py);
      }
      p.endShape(p.CLOSE);

      // Add a small dot at the center
      p.fill(hue, 100, 90, 90);
      p.noStroke();
      p.ellipse(0, 0, 5);
      p.pop();
    }
  }
}
`

const CodeEditor = ({ code, setCode, styles }: { code: string; setCode: (value: string) => void; styles: React.CSSProperties }) => {

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  return (
    <Controlled
      value={code}
      onChange={(value) => handleEditorChange(value)}
      theme={oneDark}
      extensions={[
        javascript(),
        EditorView.lineWrapping, // For wrapping long lines
      ]}
      style={styles}
    />
  );
};


const P5SketchRunner = ({ sketchCode, styles }: { sketchCode: string; styles: React.CSSProperties }) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runSketch = () => {
      try {
        // Cleanup previous p5 instance if it exists
        if (window.p5Instance) {
          window.p5Instance.remove();
        }

        // Create a new p5 instance for the provided sketch code
        if (canvasRef.current) {
          window.p5Instance = new p5((_p) => {
            try {
              eval(sketchCode);
              setError(null);
            } catch (e: any) {
              setError(`Error in sketch: ${e.message}`);
            }
          }, canvasRef.current);
        }

      } catch (err: any) {
        setError(`Failed to run sketch: ${err.message}`);
      }
    };

    runSketch();

    return () => {
      // Cleanup on component unmount
      if (window.p5Instance) {
        window.p5Instance.remove();
      }
    };
  }, [sketchCode]);

  return (
    <div style={styles}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div ref={canvasRef} />
    </div>
  );
};

const GenerativeOptions = () => {
  return (
    <select style={{ padding: '10px', margin: '10px' }}>
      <option value="p5js">
        P5.js
      </option>
      <option value="processing-python" disabled>
        Processing (Python) *Coming Soon*
      </option>
      <option value="processing" disabled>
        Processing *Coming Soon*
      </option>
    </select>
  )
}

const PaperTypeOptions = () => {
  return (
    <div style={{ 
      padding: '4px', 
      margin: '2px', 
      display: 'flex', 
      flexDirection: 'row', 
      gap: '10px',
      justifyContent: 'flex-start',
    }}>
      <div style={{ marginRight: '10px' }}>Paper Types:</div>
      <label>
        <input type="checkbox" value="glossy" />
        Glossy
      </label>
      <label>
        <input type="checkbox" value="matte" />
        Matte
      </label>
      <label>
        <input type="checkbox" value="canvas" />
        Canvas
      </label>
      <label>
        <input type="checkbox" value="watercolor" />
        Watercolor
      </label>
    </div>
  );
};

const PrintSizeOptions = () => {
  return (
    <div style={{ 
      padding: '4px', 
      margin: '2px', 
      display: 'flex', 
      flexDirection: 'row', 
      gap: '10px',
      justifyContent: 'flex-start',
    }}>
      <div style={{ marginRight: '10px' }}>Print Sizes:</div>
      <label>
        <input type="checkbox" value="a4" />
        A4
      </label>
      <label>
        <input type="checkbox" value="a3" />
        A3
      </label>
      <label>
        <input type="checkbox" value="a2" />
        A2
      </label>
      <label>
        <input type="checkbox" value="a1" />
        A1
      </label>
    </div>
  );
};

const ShareModal = ({ closeModal }: { closeModal: () => void }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://www.noisetoink.com/demo/customer")
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  const openInNewTab = () => {
    window.open("/demo/customer", "_blank");
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#e2e3ff',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      zIndex: 1000
    }}>
      <h2>Published!</h2>
      <p>
        Share this purchase link with customers
        <br />
        <a href="https://www.noisetoink.com/demo/customer" target="_blank">https://www.noisetoink.com/demo/customer</a>
        <br />
        <br />
        <button onClick={copyToClipboard} style={{ marginLeft: '10px', cursor: 'pointer' }}>
          Copy to Clipboard <FaClipboard />
        </button>
        <button onClick={openInNewTab} style={{ marginLeft: '10px', cursor: 'pointer' }}>
          Open in New tab <FaExternalLinkAlt />
        </button>
      </p>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

const ArtistDemo:React.FC = () => {
  const [code, setCode] = useState<string>(startCode);
  const [sketch, setSketch] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleRunSketch = () => {
    setSketch(code);
  }

  const handlePublish = () => {
    console.log("Publish button clicked");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const styles = {
    pageContainer: {
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      width: '100vw',
      gap: '10px'
    } as React.CSSProperties,
    actionsContainer: {
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      gap: '10px'
    } as React.CSSProperties,
    contentContainer: {
      display: 'flex', 
      flexDirection: 'row',
      minWidth: '100%',
      height: '100%',
      gap: '10px'
    } as React.CSSProperties,
    editorContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    } as React.CSSProperties,
    editor: {
      flex: 1,
      minWidth: '50%',
      height: '100%',
      textAlign: 'left',
      resize: 'horizontal',
      overflow: 'auto',
    } as React.CSSProperties  ,
    p5SketchRunnerContainer: {
      flex: 1,
      minWidth: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    } as React.CSSProperties,
    p5SketchRunner: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    } as React.CSSProperties,
    runSketchButton: {
      padding: '10px',
      margin: '0px',
      backgroundColor: "rgb(49 195 6)",
      color: "white"
    } as React.CSSProperties,
    publishButton: {
      padding: '10px',
      margin: '0px',
      backgroundColor: "purple",
      color: "white"
    } as React.CSSProperties,
    printSettingsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.pageContainer}>
      <h1>Artist Demo</h1>

      <div style={styles.actionsContainer}>
        <GenerativeOptions />

        <button
            onClick={() => handleRunSketch()}
            style={styles.runSketchButton}
          >
            Run Sketch
        </button>
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.editorContainer}>
          <CodeEditor code={code} setCode={setCode} styles={styles.editor} />
        </div>
        <div style={styles.p5SketchRunnerContainer}>
          {sketch && (
            <div style={styles.printSettingsContainer}>
              <P5SketchRunner sketchCode={sketch} styles={styles.p5SketchRunner} />
              <h2 style={{ margin: '10px 0 0 0' }}>Print Settings</h2>
              <PaperTypeOptions />
              <PrintSizeOptions />
              <button
                onClick={() => handlePublish()}
                style={styles.publishButton}
              >
                Publish
            </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && <ShareModal closeModal={closeModal} />}
    </div>
  );
};

export default ArtistDemo;
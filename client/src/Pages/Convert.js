import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
 
function Convert() {
  const [text, setText] = useState('');
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  const textFromAudio = useRef();
  const textFromInput = useRef();

  const { transcript, resetTranscript } = useSpeechRecognition();

  // === Three.js Scene Setup ===
  useEffect(() => {
    window.scrollTo(0, 0);

    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0x121212);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);

    const canvasContainer = document.getElementById('canvas');
    const initialWidth =
      (canvasContainer && canvasContainer.clientWidth) ||
      Math.floor(window.innerWidth * 0.57);
    const initialHeight =
      (canvasContainer && canvasContainer.clientHeight) ||
      Math.max(window.innerHeight - 70, 400);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      initialWidth / initialHeight,
      0.1,
      1000
    );

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setPixelRatio(window.devicePixelRatio || 1);
    ref.renderer.setSize(initialWidth, initialHeight, false);

    if (canvasContainer) {
      canvasContainer.innerHTML = '';
      ref.renderer.domElement.style.display = 'block';
      ref.renderer.domElement.style.width = '100%';
      ref.renderer.domElement.style.height = 'auto';
      canvasContainer.appendChild(ref.renderer.domElement);
    }

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    const loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === 'SkinnedMesh') {
            child.frustumCulled = false;
          }
        });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
        ref.renderer.render(ref.scene, ref.camera);
      },
      (xhr) => console.log(xhr),
      (err) => console.error('GLTF load error:', err)
    );

    const handleResize = () => {
      const container = document.getElementById('canvas');
      if (!container || !ref.renderer || !ref.camera) return;
      const newWidth = container.clientWidth;
      const newHeight =
        container.clientHeight || Math.max(window.innerHeight - 70, 400);
      ref.camera.aspect = newWidth / newHeight;
      ref.camera.updateProjectionMatrix();
      ref.renderer.setSize(newWidth, newHeight, false);
      ref.renderer.render(ref.scene, ref.camera);
    };

    let resizeObserver = null;
    if (window.ResizeObserver && canvasContainer) {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(canvasContainer);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver && canvasContainer)
        resizeObserver.unobserve(canvasContainer);
    };
  }, [bot]);

  // === Animation Frame Function ===
  ref.animate = () => {
    if (!ref || !ref.animations) return;
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }

    requestAnimationFrame(ref.animate);

    const currentAnim = ref.animations[0];

    if (currentAnim[0] === 'add-text') {
      setText((prevText) => prevText + currentAnim[1]);
      ref.animations.shift();
    } else if (currentAnim.length) {
      if (!ref.flag) {
        for (let i = 0; i < currentAnim.length; ) {
          const [boneName, action, axis, limit, sign] = currentAnim[i];
          const bone = ref.avatar?.getObjectByName(boneName);

          if (!bone) {
            console.warn(`Bone "${boneName}" not found in avatar.`);
            currentAnim.splice(i, 1);
            continue;
          }

          const val = bone[action][axis];
          const shouldUpdate =
            (sign === '+' && val < limit) || (sign === '-' && val > limit);
          const delta = (sign === '+' ? 1 : -1) * speed;

          if (shouldUpdate) {
            bone[action][axis] += delta;
            bone[action][axis] =
              sign === '+'
                ? Math.min(bone[action][axis], limit)
                : Math.max(bone[action][axis], limit);
            i++;
          } else {
            currentAnim.splice(i, 1);
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false;
      }, pause);
      ref.animations.shift();
    }

    if (ref.renderer && ref.camera && ref.scene) {
      ref.renderer.render(ref.scene, ref.camera);
    }
  };

  // === Helper: Clean Text ===
  const sanitizeInput = (str) =>
    (str || '').replace(/[^a-zA-Z ]/g, '').toUpperCase();

  // === Trigger Animation from Input ===
  const sign = (inputRef) => {
    const raw = (inputRef && inputRef.current && inputRef.current.value) || '';
    const str = sanitizeInput(raw);
    const strWords = str.split(' ').filter(Boolean);

    setText('');

    for (let word of strWords) {
      if (words[word]) {
        ref.animations.push(['add-text', word + ' ']);
        try {
          words[word](ref);
        } catch (e) {
          console.warn(`Error animating word: ${word}`, e);
        }
      } else {
        for (const [index, ch] of word.split('').entries()) {
          if (alphabets[ch]) {
            ref.animations.push([
              'add-text',
              ch + (index === word.length - 1 ? ' ' : ''),
            ]);
            try {
              alphabets[ch](ref);
            } catch (e) {
              console.warn(`Error animating alphabet: ${ch}`, e);
            }
          } else {
            console.warn(`Unknown character: ${ch}`);
          }
        }
      }
    }

    if (!ref.pending) {
      ref.pending = true;
      ref.animate();
    }
  };

  // === Handle File Upload ===
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let extractedText = "";

    try {
      if (file.type === "text/plain") {
        extractedText = await file.text();
      } else if (file.type === "application/pdf") {
        const pdfData = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ");
        }
        extractedText = text;
      } else if (
        file.name.endsWith(".docx") ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const buffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buffer });
        extractedText = result.value;
      } else {
        alert("Unsupported file format. Please upload TXT, PDF, or DOCX.");
        return;
      }

      if (textFromInput.current) {
        textFromInput.current.value = extractedText;
      }

      sign(textFromInput);
    } catch (err) {
      console.error("File processing error:", err);
      alert("Error reading file. Please try another format.");
    }
  };

  // === UI ===
  return (
    <div
      className="container-fluid py-4"
      style={{
        background: '#0e0e0e',
        color: '#00ffc3',
        fontFamily: 'Orbitron, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="row flex-grow-1">
        {/* LEFT PANEL */}
        <div className="col-md-3">
          <h4 className="fw-bold mb-2" style={{ color: '#00ffc3' }}>
            Speech & Text
          </h4>

          <div
            className="p-3 rounded shadow-lg"
            style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '16px',
              border: '1px solid rgba(0,255,195,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <label className="form-label">Speech Input:</label>
            <textarea
              ref={textFromAudio}
              value={transcript}
              rows={3}
              readOnly
              className="form-control mb-2 bg-dark text-success border-success"
            />

            <div className="d-flex justify-content-between mb-2">
              <button
                className="btn btn-outline-success w-100 me-1"
                onClick={SpeechRecognition.startListening}
              >
                Mic On <i className="fa fa-microphone" />
              </button>
              <button
                className="btn btn-outline-danger w-100 ms-1"
                onClick={SpeechRecognition.stopListening}
              >
                Mic Off <i className="fa fa-microphone-slash" />
              </button>
            </div>

            <button
              className="btn btn-outline-warning w-100 mb-3"
              onClick={resetTranscript}
            >
              Clear
            </button>
            <button
              className="btn btn-outline-info w-100 mb-3"
              onClick={() => sign(textFromAudio)}
            >
              Start Animation
            </button>

            <label className="form-label">Manual Text Input:</label>
            <textarea
              ref={textFromInput}
              placeholder="Type here..."
              className="form-control mb-2 bg-dark text-success border-success"
              rows={3}
            />
            <button
              className="btn btn-outline-primary w-100 mb-3"
              onClick={() => sign(textFromInput)}
            >
              Start Animation
            </button>

            {/* File Upload Section */}
            <hr className="my-3" />
            <label className="form-label">Upload File (TXT / PDF / DOCX):</label>
            <input
              type="file"
              accept=".txt,.pdf,.docx"
              className="form-control mb-2 bg-dark text-success border-success"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="col-md-6 d-flex justify-content-center">
          <div
            id="canvas"
            className="rounded-4"
            style={{
              minHeight: '500px',
              background: '#111',
              border: '2px solid #00ffc3',
              boxShadow: '0 0 20px #00ffc3',
              display: 'inline-block',
              width: '100%',
              maxWidth: '900px',
            }}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="col-md-3">
          <div
            className="card border-0 rounded-4 shadow p-3"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid #00ffc3',
              backdropFilter: 'blur(10px)',
              color: '#ffffffc7',
            }}
          >
            <h5 className="text-center fw-bold" style={{ color: '#00ffc3' }}>
              Choose Avatar
            </h5>

            <div className="d-flex justify-content-around mb-3">
              <div className="text-center">
                <img
                  src={xbotPic}
                  alt="Mary"
                  className="rounded-circle shadow"
                  style={{
                    width: '90px',
                    cursor: 'pointer',
                    border: '2px solid #000',
                    boxShadow:
                      bot === xbot
                        ? '0 0 12px 4px rgba(0, 255, 195, 0.7)'
                        : '0 0 6px 1px rgba(255, 255, 255, 0.1)',
                    transition: '0.3s',
                  }}
                  onClick={() => setBot(xbot)}
                />
                <div className="mt-1 fw-semibold text-light">Mary</div>
              </div>
              <div className="text-center">
                <img
                  src={ybotPic}
                  alt="Bhau"
                  className="rounded-circle shadow"
                  style={{
                    width: '90px',
                    cursor: 'pointer',
                    border: '2px solid #000',
                    boxShadow:
                      bot === ybot
                        ? '0 0 12px 4px rgba(0, 255, 195, 0.7)'
                        : '0 0 6px 1px rgba(255, 255, 255, 0.1)',
                    transition: '0.3s',
                  }}
                  onClick={() => setBot(ybot)}
                />
                <div className="mt-1 fw-semibold text-light">Bhau</div>
              </div>
            </div>

            {/* Animation Controls */}
            <div
              className="mt-3 p-3 rounded-3"
              style={{ backgroundColor: '#1c1c1c', border: '1px solid #0069ff' }}
            >
              <h6
                className="fw-bold mb-3 text-center"
                style={{ color: '#0069ff' }}
              >
                Animation Settings
              </h6>

              <div className="mb-3">
                <label className="form-label d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-tachometer" /> Speed
                  </span>
                  <strong>{speed.toFixed(2)}</strong>
                </label>
                <Slider
                  axis="x"
                  xmin={0.05}
                  xmax={0.5}
                  xstep={0.01}
                  x={speed}
                  onChange={({ x }) => setSpeed(x)}
                  styles={{
                    track: { backgroundColor: '#333' },
                    active: { backgroundColor: '#00ffc3' },
                    thumb: {
                      width: 18,
                      height: 18,
                      backgroundColor: '#00ffc3',
                      border: '2px solid #000',
                    },
                  }}
                />
              </div>

              <div>
                <label className="form-label d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-clock-o" /> Pause
                  </span>
                  <strong>{pause} ms</strong>
                </label>
                <Slider
                  axis="x"
                  xmin={0}
                  xmax={2000}
                  xstep={100}
                  x={pause}
                  onChange={({ x }) => setPause(x)}
                  styles={{
                    track: { backgroundColor: '#333' },
                    active: { backgroundColor: '#0069ff' },
                    thumb: {
                      width: 18,
                      height: 18,
                      backgroundColor: '#0069ff',
                      border: '2px solid #000',
                    },
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Processed Text:</label>
              <textarea
                rows={3}
                value={text}
                className="form-control bg-dark text-success border-success"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-3"
        style={{ backgroundColor: "#020617", borderTop: "1px solid #1e293b" }}
      >
        <p className="mb-0 text-sm" style={{ color: "#475569" }}>
          © {new Date().getFullYear()} SignFusion. 
        </p>
      </footer>
    </div>
  );
}

export default Convert;

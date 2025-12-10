import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function LearnSign() {
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [selectedAlpha, setSelectedAlpha] = useState('');
  const [selectedWord, setSelectedWord] = useState('');

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    ref.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setSize(width, height);
    if (canvasContainer) {
      canvasContainer.innerHTML = '';
      canvasContainer.appendChild(ref.renderer.domElement);
    }

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    const loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === 'SkinnedMesh') child.frustumCulled = false;
        });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => console.log(xhr)
    );

    const handleResize = () => {
      if (!canvasContainer) return;
      const newWidth = canvasContainer.clientWidth;
      const newHeight = canvasContainer.clientHeight;
      ref.camera.aspect = newWidth / newHeight;
      ref.camera.updateProjectionMatrix();
      ref.renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [bot]);

  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }
    requestAnimationFrame(ref.animate);

    if (ref.animations[0].length) {
      if (!ref.flag) {
        for (let i = 0; i < ref.animations[0].length;) {
          let [boneName, action, axis, limit, sign] = ref.animations[0][i];
          const bone = ref.avatar.getObjectByName(boneName)[action];
          const current = bone[axis];
          const distance = Math.abs(limit - current);
          const dynamicSpeed = Math.max(speed * (distance / 0.5), 0.01);

          if (sign === '+' && current < limit) {
            bone[axis] += dynamicSpeed;
            bone[axis] = Math.min(bone[axis], limit);
            i++;
          } else if (sign === '-' && current > limit) {
            bone[axis] -= dynamicSpeed;
            bone[axis] = Math.max(bone[axis], limit);
            i++;
          } else {
            ref.animations[0].splice(i, 1);
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => (ref.flag = false), pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  };

  const alphabetButtons = Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(i + 65);
    const isActive = selectedAlpha === letter;
    return (
      <button
        key={letter}
        className='btn fw-bold m-1 px-3 rounded-pill shadow-sm'
        style={{
          backgroundColor: isActive ? '#00ffc3' : 'rgba(255,255,255,0.05)',
          color: isActive ? '#000' : '#ffffffc7',
          border: '1px solid #00ffc3',
          transition: '0.2s',
        }}
        onClick={() => {
          if (ref.animations.length === 0) {
            alphabets[letter](ref);
            setSelectedAlpha(letter);
            setSelectedWord('');
          }
        }}
      >
        {letter}
      </button>
    );
  });

  const wordButtons = words.wordList.map((word, i) => {
    const isActive = selectedWord === word;
    return (
      <div className='col-6 mb-2' key={i}>
        <button
          className='btn w-100 fw-medium'
          style={{
            background: isActive ? '#0069ff' : 'rgba(255,255,255,0.05)',
            color: isActive ? '#fff' : '#ffffffc7',
            border: '1px solid #0069ff',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            transition: '0.2s',
          }}
          onClick={() => {
            if (ref.animations.length === 0) {
              words[word](ref);
              setSelectedWord(word);
              setSelectedAlpha('');
            }
          }}
        >
          {word}
        </button>
      </div>
    );
  });

  return (
    <div
      className='container-fluid py-4 d-flex flex-column min-vh-100'
      style={{
        background: '#0e0e0e',
        color: '#00ffc3',
        fontFamily: 'Orbitron, sans-serif',
      }}
    >
      <div className='row flex-grow-1'>
        {/* Left Panel */}
        <div className='col-md-3'>
          <h4 className='fw-bold mb-2' style={{ color: '#00ffc3' }}>
            Alphabets
          </h4>
          {selectedAlpha && (
            <h1 className='fw-bold mb-3' style={{ color: '#0069ff' }}>
              {selectedAlpha}
            </h1>
          )}
          <div className='d-flex flex-wrap'>{alphabetButtons}</div>

          <div
            className='p-3 rounded shadow-lg mt-4'
            style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '16px',
              border: '1px solid rgba(0,255,195,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <h5 className='fw-bold mb-3' style={{ color: '#0069ff' }}>
              Words
            </h5>
            <div
              style={{
                maxHeight: '300px',
                overflowY: 'auto',
              }}
              className="custom-scroll"
            >
              <div className='row'>{wordButtons}</div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="col-md-6 d-flex justify-content-center">
          <div
            id="canvas"
            className="rounded-4"
            style={{
              minHeight: "500px",
              background: "#111",
              border: "2px solid #00ffc3",
              boxShadow: "0 0 20px #00ffc3",
              display: "inline-block",
              width: "100%",
              maxWidth: "900px",
            }}
          />
        </div>

        {/* Right Panel */}
        <div className='col-md-3'>
          <div
            className='card border-0 rounded-4 shadow p-3'
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid #00ffc3',
              backdropFilter: 'blur(10px)',
              color: '#ffffffc7',
            }}
          >
            <h5 className='text-center fw-bold' style={{ color: '#00ffc3' }}>
              Choose Avatar
            </h5>
            <div className='d-flex justify-content-around mb-3'>
              <div className='text-center'>
                <img
                  src={xbotPic}
                  className='rounded-circle shadow'
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
                  alt='Mary'
                  onClick={() => setBot(xbot)}
                />
                <div className='mt-1 fw-semibold text-light'>Mary</div>
              </div>
              <div className='text-center'>
                <img
                  src={ybotPic}
                  className='rounded-circle shadow'
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
                  alt='Bhau'
                  onClick={() => setBot(ybot)}
                />
                <div className='mt-1 fw-semibold text-light'>Bhau</div>
              </div>
            </div>

            <div
              className='mt-3 p-3 rounded-3'
              style={{ backgroundColor: '#1c1c1c', border: '1px solid #0069ff' }}
            >
              <h6 className='fw-bold mb-3 text-center' style={{ color: '#0069ff' }}>
                Animation Settings
              </h6>

              {/* Speed Slider */}
              <div className='mb-3'>
                <label className='form-label d-flex justify-content-between align-items-center'>
                  <span>
                    <i className='fa fa-tachometer' /> Speed
                  </span>
                  <strong>{speed.toFixed(2)}</strong>
                </label>
                <Slider
                  axis='x'
                  xmin={0.05}
                  xmax={0.5}
                  xstep={0.01}
                  x={speed}
                  onChange={({ x }) => setSpeed(x)}
                  styles={{
                    track: { backgroundColor: '#333' },
                    active: { backgroundColor: '#00ffc3' },
                    thumb: { width: 18, height: 18, backgroundColor: '#00ffc3', border: '2px solid #000' },
                  }}
                />
              </div>

              {/* Pause Slider */}
              <div>
                <label className='form-label d-flex justify-content-between align-items-center'>
                  <span>
                    <i className='fa fa-clock-o' /> Pause
                  </span>
                  <strong>{pause} ms</strong>
                </label>
                <Slider
                  axis='x'
                  xmin={0}
                  xmax={2000}
                  xstep={100}
                  x={pause}
                  onChange={({ x }) => setPause(x)}
                  styles={{
                    track: { backgroundColor: '#333' },
                    active: { backgroundColor: '#0069ff' },
                    thumb: { width: 18, height: 18, backgroundColor: '#0069ff', border: '2px solid #000' },
                  }}
                />
              </div>
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

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ffc3, #0069ff);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00c3ff, #0039ff);
        }
      `}</style>
    </div>
  );
}

export default LearnSign;

export const COME = (ref) => {
  let animations = [];

  //  Raise right arm up
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 8, "+"]);

  //  Extend Thumb
  animations.push(["mixamorigRightHandThumb1", "rotation", "z", -Math.PI / 6, "-"]);
  animations.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI / 12, "+"]);

  //  Extend Index
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandIndex3", "rotation", "z", Math.PI / 1.3, "+"]);

  //  Curl Middle
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI / 1.3, "+"]);

  //  Curl Ring
  animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI / 1.3, "+"]);

  //  Extend Pinky
  animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI / 1.3, "+"]);
  animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI / 1.3, "+"]);

  ref.animations.push(animations);

  //  RESET POSE — OPTIONAL
  animations = [];
  const fingers = ["Thumb", "Index", "Middle", "Ring", "Pinky"];
  for (let finger of fingers) {
    for (let i = 1; i <= 3; i++) {
      animations.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "-"]);
    }
  }

  // Reset thumb x-axis rotation too
  animations.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "-"]);

  // Reset arm position
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);

  ref.animations.push(animations);

  // ▶️ Start animation
  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};

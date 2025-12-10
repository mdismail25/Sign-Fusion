export const DOWN = (ref) => {
  let animations = [];

  // === Stage 1: Arms move down gesture ===
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI / 3, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", -Math.PI / 12, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", Math.PI / 3, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", Math.PI / 12, "+"]);

  animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 12, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 12, "+"]);

  animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 18, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", -Math.PI / 18, "-"]);

  ref.animations.push(animations);

  // === Stage 2: Small hold ===
  animations = [];
  animations.push(["mixamorigSpine", "rotation", "x", Math.PI / 180, "+"]);
  ref.animations.push(animations);

  // === Stage 3: RESET to default pose (both arms like PERSON.js style) ===
  animations = [];

  // Right Hand Fingers
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);

  // Left Hand & Fingers — Reset (same style)
    // Left Hand Fingers (mirrored from right)
  animations.push(["mixamorigLeftHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandIndex2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandIndex3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandRing2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandRing3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandPinky2", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandPinky3", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftHandThumb1", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHandThumb2", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigLeftHandThumb3", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", Math.PI / -3, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);


  // Spine reset (optional)
  animations.push(["mixamorigSpine", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigSpine", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigSpine", "rotation", "z", 0, "-"]);

  ref.animations.push(animations);

  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};

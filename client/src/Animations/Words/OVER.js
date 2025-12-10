export const OVER = (ref) => {
  let animations = [];

  // === Stage 1: Down Pose (Arms Down, Palms Forward) ===
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI / 4, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", -Math.PI / 8, "-"]);

  animations.push(["mixamorigLeftArm", "rotation", "x", Math.PI / 4, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", Math.PI / 8, "+"]);

  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 1.8, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 1.8, "-"]);

  animations.push(["mixamorigRightHand", "rotation", "x", Math.PI / 10, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", Math.PI / 10, "+"]);

  ref.animations.push(animations);

  // === Stage 2: Hold briefly ===
  animations = [];
  animations.push(["mixamorigSpine", "rotation", "x", Math.PI / 180, "+"]);
  ref.animations.push(animations);

  // === Stage 3: Opposite of Original Animation ===
  animations = [];

  // Right Hand Fingers Opposite
  [
    "Index1", "Index2", "Index3",
    "Middle1", "Middle2", "Middle3",
    "Ring1", "Ring2", "Ring3",
    "Pinky1", "Pinky2", "Pinky3"
  ].forEach((finger) => {
    animations.push([`mixamorigRightHand${finger}`, "rotation", "z", 0, "+"]);
  });

  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "-"]);

  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);

  // Left Hand Fingers Opposite
  [
    "Index1", "Index2", "Index3",
    "Middle1", "Middle2", "Middle3",
    "Ring1", "Ring2", "Ring3",
    "Pinky1", "Pinky2", "Pinky3"
  ].forEach((finger) => {
    animations.push([`mixamorigLeftHand${finger}`, "rotation", "z", 0, "+"]);
  });

  animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftHandThumb1", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigLeftHandThumb2", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHandThumb3", "rotation", "y", 0, "-"]);

  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", Math.PI / -3, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);

  ref.animations.push(animations);

  // === Stage 4: Reset Both Hands to T-Pose (default) ===
  animations = [];

  const resetBones = [
    "mixamorigSpine",
    // Arms
    "mixamorigRightArm", "mixamorigRightForeArm", "mixamorigRightHand",
    "mixamorigLeftArm", "mixamorigLeftForeArm", "mixamorigLeftHand",
    // Fingers and Thumbs
    ...[
      "Index1", "Index2", "Index3",
      "Middle1", "Middle2", "Middle3",
      "Ring1", "Ring2", "Ring3",
      "Pinky1", "Pinky2", "Pinky3",
      "Thumb1", "Thumb2", "Thumb3"
    ].flatMap((finger) => [
      `mixamorigRightHand${finger}`,
      `mixamorigLeftHand${finger}`
    ])
  ];

  resetBones.forEach((bone) => {
    animations.push([bone, "rotation", "x", 0, "-"]);
    animations.push([bone, "rotation", "y", 3, "-"]);
    animations.push([bone, "rotation", "z", 3, "-"]);
  });

  ref.animations.push(animations);

  // === Run animation ===
  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};

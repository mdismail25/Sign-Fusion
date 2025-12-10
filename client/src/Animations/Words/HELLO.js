export const HELLO = (ref) => {
  let animations = [];

  // === Stage 1: Bring both hands together in Namaste pose ===
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 4, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);

  animations.push(["mixamorigLeftForeArm", "rotation", "z", Math.PI / 2.5, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 2.5, "-"]);

  animations.push(["mixamorigLeftHand", "rotation", "y", Math.PI / 2.8, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI / 2.8, "+"]);

  animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI / 8, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 8, "-"]);

  // Fingers slightly bent to suggest pressed palms
  const fingers = ["Index", "Middle", "Ring", "Pinky"];
  fingers.forEach((finger) => {
    for (let i = 1; i <= 3; i++) {
      animations.push([`mixamorigLeftHand${finger}${i}`, "rotation", "x", Math.PI / 12, "+"]);
      animations.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", Math.PI / 12, "+"]);
    }
  });

  animations.push(["mixamorigLeftHandThumb1", "rotation", "z", Math.PI / 6, "+"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "z", Math.PI / 6, "-"]);

  ref.animations.push(animations);

  // === Stage 2: Slight transition hold ===
  animations = [];
  animations.push(["mixamorigSpine", "rotation", "y", Math.PI / 90, "+"]); // Small body shift if needed
  ref.animations.push(animations);

  // === Stage 3: Reset to neutral ===
  animations = [];

  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

  fingers.forEach((finger) => {
    for (let i = 1; i <= 3; i++) {
      animations.push([`mixamorigLeftHand${finger}${i}`, "rotation", "x", 0, "-"]);
      animations.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "-"]);
    }
  });

  animations.push(["mixamorigLeftHandThumb1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "+"]);

  ref.animations.push(animations);

  // === Trigger animation if not already pending ===
  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};

export const THERE = (ref) => {
  let pose = [];

  // === FINGER CURL (Right hand) ===
  ["Middle", "Ring", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      pose.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", Math.PI / 1.8, "+"]);
    }
  });

  // Index: keep straight
  for (let i = 1; i <= 3; i++) {
    pose.push([`mixamorigRightHandIndex${i}`, "rotation", "z", 0, "-"]);
    pose.push([`mixamorigRightHandIndex${i}`, "rotation", "x", 0, "-"]);
  }

  // Thumb: relaxed outward
  pose.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI / 8, "-"]);
  pose.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI / 10, "+"]);

  // === ARM POSITION (Right side) ===
  pose.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "+"]);  // lift arm
  pose.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 10, "-"]);  // slight inward

  // ✅ 45° Forearm twist only
  pose.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 4, "+"]);

  // === HAND ORIENTATION (No twist now) ===
 pose.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
pose.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
pose.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

  // Push to queue
  ref.animations.push(pose);

  // === RESET PHASE ===
  let reset = [];

  ["Index", "Middle", "Ring", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      reset.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "-"]);
      reset.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "-"]);
    }
  });

  reset.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "+"]);
  reset.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);

  reset.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  reset.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
  reset.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);

  reset.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
  reset.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  reset.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

  ref.animations.push(reset);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};

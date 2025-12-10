export const SMILE = (ref) => {
  let pose = [];

  // === Curl all fingers except index (both hands) ===
  ["Middle", "Ring", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      // Right hand
      pose.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", Math.PI / 1.6, "+"]);
      // Left hand (mirror)
      pose.push([`mixamorigLeftHand${finger}${i}`, "rotation", "z", -Math.PI / 1.6, "-"]);
    }
  });

  // === Keep index finger straight ===
  for (let i = 1; i <= 3; i++) {
    // Right
    pose.push([`mixamorigRightHandIndex${i}`, "rotation", "z", 0, "-"]);
    pose.push([`mixamorigRightHandIndex${i}`, "rotation", "x", 0, "-"]);

    // Left (mirror)
    pose.push([`mixamorigLeftHandIndex${i}`, "rotation", "z", 0, "+"]);
    pose.push([`mixamorigLeftHandIndex${i}`, "rotation", "x", 0, "-"]);
  }

  // === Relax thumb outward ===
  pose.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI / 10, "-"]);
  pose.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI / 16, "+"]);

  pose.push(["mixamorigLeftHandThumb1", "rotation", "y", Math.PI / 10, "+"]);   // mirror
  pose.push(["mixamorigLeftHandThumb2", "rotation", "x", Math.PI / 16, "+"]);

  // === Arms lifted and turned inward ===
  pose.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
  pose.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 5, "-"]);

  pose.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 4, "-"]);
  pose.push(["mixamorigLeftArm", "rotation", "y", Math.PI / 5, "+"]);   // opposite inward

  // === Rotate forearms inward ===
  pose.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 9, "+"]);
  pose.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI / 9, "-"]);

  // === Rotate hands to aim fingers at face ===
  pose.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 4, "-"]);
  pose.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 6, "-"]);
  pose.push(["mixamorigRightHand", "rotation", "z", Math.PI / 2.8, "+"]);

  pose.push(["mixamorigLeftHand", "rotation", "x", -Math.PI / 4, "-"]);
  pose.push(["mixamorigLeftHand", "rotation", "y", Math.PI / 6, "+"]);   // mirror inward
  pose.push(["mixamorigLeftHand", "rotation", "z", -Math.PI / 2.8, "-"]);

  ref.animations.push(pose);

  // === RESET PHASE → Adjusted pose (left forearm slightly left & up) ===
  let reset = [];

  // Fingers back to neutral
  ["Index", "Middle", "Ring", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      reset.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "-"]);
      reset.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "-"]);

      reset.push([`mixamorigLeftHand${finger}${i}`, "rotation", "z", 0, "+"]);
      reset.push([`mixamorigLeftHand${finger}${i}`, "rotation", "x", 0, "+"]);
    }
  });

  // Thumbs
  reset.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "+"]);
  reset.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);
  reset.push(["mixamorigLeftHandThumb1", "rotation", "y", 0, "-"]);
  reset.push(["mixamorigLeftHandThumb2", "rotation", "x", 0, "+"]);

  // Arms back
  reset.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  reset.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
  reset.push(["mixamorigLeftArm", "rotation", "x", -0.3, "+"]);
  reset.push(["mixamorigLeftArm", "rotation", "y", -0.3, "+"]);

  // Forearms back
  reset.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
  // Left forearm → slightly left + a little up
  reset.push(["mixamorigLeftForeArm", "rotation",  "z", -Math.PI/5, "+"]); // tilt left
  reset.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 12, "+"]);  // raise up

  // Hands back to bind pose offsets
  reset.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
  reset.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  reset.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

  reset.push(["mixamorigLeftHand", "rotation", "x", 0, "+"]);
  reset.push(["mixamorigLeftHand", "rotation", "y", 0, "-"]);
  reset.push(["mixamorigLeftHand", "rotation", "z", 0, "+"]);

  ref.animations.push(reset);

  // Trigger animation
  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};

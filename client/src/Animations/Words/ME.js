export const ME = (ref) => {
  let pose = [];

  // === Curl all fingers except index ===
  ["Middle", "Ring", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      pose.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", Math.PI / 1.6, "+"]);
    }
  });

  // === Keep index finger straight ===
  for (let i = 1; i <= 3; i++) {
    pose.push([`mixamorigRightHandIndex${i}`, "rotation", "z", 0, "-"]);
    pose.push([`mixamorigRightHandIndex${i}`, "rotation", "x", 0, "-"]);
  }

  // === Relax thumb a bit outward ===
  pose.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI / 10, "-"]);
  pose.push(["mixamorigRightHandThumb2", "rotation", "x", Math.PI / 16, "+"]);

  // === Right Arm lifted and turned inward toward chest ===
  pose.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);  
  pose.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 5, "-"]);  

  // === Rotate forearm more strongly inward ===
  pose.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 9, "+"]);  

  // === Rotate hand to aim finger at face (chin/nose) ===
  pose.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 4, "-"]);  
  pose.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 6, "-"]);  
  pose.push(["mixamorigRightHand", "rotation", "z", Math.PI / 2.8, "+"]); 

  ref.animations.push(pose);

  // =====================
  // RESET PHASE (corrected to match left-hand neutral pose)
  // =====================

  // Step 1: Forearm reset
  let reset1 = [];
  reset1.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
  ref.animations.push(reset1);

  // Step 2: Small inward forearm motion
  let reset2 = [];
  reset2.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/12, "+"]);
  ref.animations.push(reset2);

  // Step 3: Full reset of fingers, thumb, arm & hand
  let reset3 = [];

  ["Index", "Middle", "Ring", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      reset3.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "-"]);
      reset3.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "-"]);
    }
  });

  // === Thumb reset ===
  reset3.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "+"]);
  reset3.push(["mixamorigRightHandThumb2", "rotation", "x", 0, "-"]);

  // === Arm reset (bring back to neutral) ===
  reset3.push(["mixamorigRightArm", "rotation", "x", 0, "+"]); // drop arm down
  reset3.push(["mixamorigRightArm", "rotation", "y", 0, "+"]); // straighten
  reset3.push(["mixamorigRightArm", "rotation", "z", 0, "+"]); // untwist

  // === Forearm reset ===
  reset3.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);

  // === Hand reset (open, same as left hand) ===
  reset3.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
  reset3.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  reset3.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

  ref.animations.push(reset3);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};

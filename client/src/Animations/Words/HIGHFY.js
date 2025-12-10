export const HIGHFY = (ref) => {
  // Step 1: Raise hand and open palm
  let hiPose = [];

  hiPose.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]); // Lift arm forward
  hiPose.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
  hiPose.push(["mixamorigRightArm", "rotation", "z", 0, "+"]);

  hiPose.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 6, "-"]); // Slight bend
  hiPose.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  hiPose.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

  ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
    [1, 2, 3].forEach((joint) => {
      hiPose.push([`mixamorigRightHand${finger}${joint}`, "rotation", "z", 0, "+"]);
    });
  });

  hiPose.push(["mixamorigRightHandThumb1", "rotation", "z", 0.3, "+"]);
  hiPose.push(["mixamorigRightHandThumb2", "rotation", "z", 0.3, "+"]);
  hiPose.push(["mixamorigRightHandThumb3", "rotation", "z", 0.2, "+"]);

  // Step 2: Pause (simulate hold pose before returning to default)
  let pause = []; // empty for a delay step
  const pauseFrames = 15; // approx 1.5 seconds if each frame = 100ms

  // Step 3: Reset to default pose
  let resetPose = [];

  resetPose.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  resetPose.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
  resetPose.push(["mixamorigRightArm", "rotation", "z", 0, "+"]);

  resetPose.push(["mixamorigRightForeArm", "rotation", "z", 0, "+"]);
  resetPose.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  resetPose.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

  ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
    [1, 2, 3].forEach((joint) => {
      resetPose.push([`mixamorigRightHand${finger}${joint}`, "rotation", "z", 0, "+"]);
    });
  });

  resetPose.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "+"]);
  resetPose.push(["mixamorigRightHandThumb2", "rotation", "z", 0, "+"]);
  resetPose.push(["mixamorigRightHandThumb3", "rotation", "z", 0, "+"]);

  // Push animations in sequence
  ref.animations.push(hiPose);
  for (let i = 0; i < pauseFrames; i++) {
    ref.animations.push(pause);
  }
  ref.animations.push(resetPose);

  // Trigger animation
  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};

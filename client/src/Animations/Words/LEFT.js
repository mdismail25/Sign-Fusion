export const LEFT = (ref) => {
  let animations = [];

  // Step 1: Perform the RIGHT gesture animation
  animations.push(["mixamorigLeftArm", "rotation", "x", +Math.PI / 12, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "y", Math.PI / 8, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "z", +Math.PI / 3, "+"]);

  animations.push(["mixamorigRightArm", "rotation", "x", +Math.PI / 12, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", +Math.PI / 8, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 12, "+"]);

  // Slight wrist bend to align palms
  animations.push(["mixamorigLeftHand", "rotation", "y", Math.PI / 10, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 10, "-"]);

  // Finger straightening (optional)
  ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
    [1, 2, 3].forEach((joint) => {
      animations.push([`mixamorigLeftHand${finger}${joint}`, "rotation", "z", 0, "-"]);
      animations.push([`mixamorigRightHand${finger}${joint}`, "rotation", "z", 0, "-"]);
    });
  });

  ref.animations.push(animations);

  // Step 2: Reset pose to default (add after a short delay, or chained)
  animations = [];

  // Reset left arm rotations to 0 (default)
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "-"]);

  // Reset right arm rotations to 0 (default)
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);

  // Reset wrist bends
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);

  // Fingers reset (optional)
  ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
    [1, 2, 3].forEach((joint) => {
      animations.push([`mixamorigLeftHand${finger}${joint}`, "rotation", "z", 0, "+"]);
      animations.push([`mixamorigRightHand${finger}${joint}`, "rotation", "z", 0, "+"]);
    });
  });

  ref.animations.push(animations);

  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};

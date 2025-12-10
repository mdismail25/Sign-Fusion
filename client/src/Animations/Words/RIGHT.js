export const RIGHT = (ref) => {
  let animations = [];

  // Namaste pose (hands together in front of chest)
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 12, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "y", Math.PI / 8, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI / 3, "-"]);

  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 12, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 8, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 3, "-"]);

  // Slight wrist bend to align palms
  animations.push(["mixamorigLeftHand", "rotation", "y", Math.PI / 10, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 10, "-"]);

  // Finger straightening (palms touching)
  ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
    [1, 2, 3].forEach((joint) => {
      animations.push([`mixamorigLeftHand${finger}${joint}`, "rotation", "z", 0, "+"]);
      animations.push([`mixamorigRightHand${finger}${joint}`, "rotation", "z", 0, "+"]);
    });
  });

  // Push the Namaste animation first
  ref.animations.push(animations);

  // Clear animations array for reset
  animations = [];

  // Reset pose to default
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);

  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "+"]);

  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);

  ["Index", "Middle", "Ring", "Pinky"].forEach((finger) => {
    [1, 2, 3].forEach((joint) => {
      animations.push([`mixamorigLeftHand${finger}${joint}`, "rotation", "z", 0, "+"]);
      animations.push([`mixamorigRightHand${finger}${joint}`, "rotation", "z", 0, "+"]);
    });
  });

  // Push the reset animation after the Namaste pose
  ref.animations.push(animations);

  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};

export const WHAT = (ref) => {
    let animations = [];

    // === RIGHT HAND: Thumbs Up ===
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 2, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI / 1.3, "+"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", Math.PI / 1.3, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 2, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 12, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 5.9, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 36, "-"]);

    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 9, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 72, "-"]);

    // === LEFT HAND: YES Motion ===
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI / 5, "-"]); // mirrored
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 4, "-"]);
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI / 3, "-"]); // outward

    ref.animations.push(animations);

    // === RESET BOTH HANDS TO DEFAULT POSE ===
    animations = [];

    // Right hand reset
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);

    // Left hand reset
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI / 1.5, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI / 1.5, "+"]);

    ref.animations.push(animations);

    // === Trigger animation ===
    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
};

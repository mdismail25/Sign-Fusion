export const NAMASTE = (ref) => {
    let animations = [];

    // === Left Hand (mirror of Right Hand) ===
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", -Math.PI / 4, "-"]);

   // === Left Hand Fingers ===
    animations.push(["mixamorigLeftHandIndex1", "rotation", "z", -Math.PI / 10, "-"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", -Math.PI / 10, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", -Math.PI / 12, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", -Math.PI / 14, "-"]);


    // 👉 Rotate left hand outward (opposite of before)
    animations.push(["mixamorigLeftHand", "rotation", "x", -Math.PI / 10, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI / 6, "-"]); // flipped
    animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI / 2.5, "+"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI / 5, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 4, "-"]);

    // === Right Hand ===
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI / 4, "-"]);
    // === Right Hand Fingers ===
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI / 10, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI / 10, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI / 12, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI / 14, "+"]);

    // 👉 Rotate right hand outward (opposite of before)
    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 10, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI / 6, "+"]); // flipped
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 2.5, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 5, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);

    ref.animations.push(animations);

    // === Reset Pose ===
    animations = [];

    // Reset Left
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "+"]);
        // === Reset Left Hand Fingers ===
    animations.push(["mixamorigLeftHandIndex1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandIndex2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandIndex3", "rotation", "z", 0, "+"]);

    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", 0, "+"]);

    animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing3", "rotation", "z", 0, "+"]);

    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky3", "rotation", "z", 0, "+"]);

    animations.push(["mixamorigLeftHand", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);

    // Reset Right
        // === Reset Right Hand Fingers ===
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
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    // Bring both forearms inward (Namaste center)
    animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI / 1.5, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI / 1.5, "+"]);

    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
};

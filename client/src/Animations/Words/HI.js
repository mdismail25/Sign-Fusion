export const HI = (ref) => {
    let animations = [];

    // === Stage 1: Raise right hand near face (No sign setup) ===
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]); // Raise upper arm
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 10, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 8, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 8, "-"]); // Palm out
    ref.animations.push(animations);

    // === Stage 2: Shake hand (left) ===
    animations = [];
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI / 8, "+"]);
    ref.animations.push(animations);

    // === Stage 3: Shake hand (right) ===
    animations = [];
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 8, "-"]);
    ref.animations.push(animations);

    // === Stage 4: Center the hand again ===
    animations = [];
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    ref.animations.push(animations);

    // === Stage 5: Reset Pose (based on HELLO reset style) ===
    animations = [];

    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

    const fingers = ["Index", "Middle", "Ring", "Pinky"];
    fingers.forEach((finger) => {
        for (let i = 1; i <= 3; i++) {
            animations.push([`mixamorigLeftHand${finger}${i}`, "rotation", "x", 0, "-"]);
            animations.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "-"]);
        }
    });

    animations.push(["mixamorigLeftHandThumb1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "+"]);

    ref.animations.push(animations);

    // === Final Trigger ===
    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
};

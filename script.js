// Elements
const trollButton = document.getElementById('trollButton');
const virusAlert = document.getElementById('virusAlert');
const fakeCursor = document.getElementById('fakeCursor');
const screamText = document.getElementById('screamText');
const crashScreen = document.getElementById('crashScreen');
const glitchText = document.getElementById('glitch');
const deletePrompt = document.getElementById('deletePrompt');
const deleteYes = document.getElementById('deleteYes');
const deleteNo = document.getElementById('deleteNo');
const scrambleText = document.getElementById('scrambleText');
const content = document.getElementById('content');
const trollAudio = document.getElementById('trollAudio');
const trollPopup = document.getElementById('trollPopup');
const trollPopupText = document.getElementById('trollPopupText');
const crashInput = document.getElementById('crashInput');
const crashButton = document.getElementById('crashButton');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    crashScreen.style.display = 'none';
    trollButton.style.left = '50%';
    trollButton.style.top = '50%';
    playRandomAudio();
    trollAudio.addEventListener('ended', playRandomAudio);
    checkCrashTrigger(); // Start crash screen check
});

// Prevent leaving the page
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = "You can’t escape the troll zone!";
});

// Disable context menu, F12, Ctrl+Shift+I, etc.
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        e.key === 'Escape'
    ) {
        e.preventDefault();
        showTrollPopup("NO CHEATING ALLOWED!");
    }
});

// Fallback to start audio on first click
document.addEventListener('click', () => {
    if (trollAudio.paused) {
        console.log("Audio paused, starting on click...");
        trollAudio.play().catch(error => console.log("Play error:", error));
    }
}, { once: true });

// Moving button
trollButton.addEventListener('mouseover', () => {
    moveElement(trollButton);
});

trollButton.addEventListener('click', () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    showTrollPopup("HAHA YOU CAN’T CATCH ME!");
    virusAlert.classList.remove('hidden');
});

// Non-blocking troll pop-ups
function showTrollPopup(message) {
    trollPopupText.textContent = message;
    trollPopup.classList.remove('hidden');
    setTimeout(() => trollPopup.classList.add('hidden'), 3000);
}

setInterval(() => {
    const messages = [
        "LOL U STILL HERE?",
        "YOUR SCREEN IS MINE NOW!",
        "TROLOLOLOLOL!",
        "BET YOU CAN’T CLOSE THIS!"
    ];
    showTrollPopup(messages[Math.floor(Math.random() * messages.length)]);
}, 5000);

// Blocking alerts to annoy user (less frequent)
setInterval(() => {
    alert("YOU CAN’T LEAVE! KEEP TROLLING!");
}, 30000); // Every 30 seconds

// Glitchy title
setInterval(() => {
    glitchText.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
}, 500);

// Random audio playback with true randomness
function playRandomAudio() {
    fetch('randomAudio.php')
        .then(response => {
            if (!response.ok) throw new Error('Fetch failed: ' + response.status);
            return response.text();
        })
        .then(randomAudio => {
            const cleanedAudio = randomAudio.trim();
            if (!cleanedAudio || cleanedAudio === "No audio files found!") {
                console.log("No valid audio file returned:", cleanedAudio);
                return;
            }
            console.log("Setting trollAudio.src to:", cleanedAudio);
            trollAudio.src = cleanedAudio;
            trollAudio.load();
            trollAudio.play().catch(error => console.log("Autoplay prevented:", error));
        })
        .catch(error => console.log("Fetch error:", error));
}

// Fake cursor with inversion
let isInverted = false;
setInterval(() => {
    isInverted = !isInverted;
}, 5000);

document.addEventListener('mousemove', (e) => {
    if (isInverted) {
        fakeCursor.style.left = `${window.innerWidth - e.pageX + 20}px`;
        fakeCursor.style.top = `${window.innerHeight - e.pageY + 20}px`;
    } else {
        fakeCursor.style.left = `${e.pageX + 20}px`;
        fakeCursor.style.top = `${e.pageY + 20}px`;
    }
});

// Screaming text with hitbox
const screamMessages = [
    "STOP CLICKING ME!!!",
    "I’M WATCHING YOU!!!",
    "GET OUT NOW!!!",
    "TROLL POWER!!!"
];
setInterval(() => {
    screamText.textContent = screamMessages[Math.floor(Math.random() * screamMessages.length)];
    screamText.style.transform = `scale(${Math.random() * 0.5 + 1})`;
}, 3000);

screamText.addEventListener('click', () => {
    moveElement(screamText);
});

// Creative crash screen trigger: After 5 "STOP CLICKING ME!!!" messages
let stopClickingCount = 0;
function checkCrashTrigger() {
    setInterval(() => {
        if (screamText.textContent === "STOP CLICKING ME!!!") {
            stopClickingCount++;
            console.log("Stop clicking count:", stopClickingCount);
            if (stopClickingCount >= 5) {
                showCrashScreen();
            }
        }
    }, 1000); // Check every second
}

function showCrashScreen() {
    crashScreen.classList.remove('hidden');
    crashScreen.style.display = 'flex';
    crashInput.value = '';
    crashInput.focus();
}

crashButton.addEventListener('click', () => {
    if (crashInput.value.toLowerCase() === "escape") {
        alert("NICE TRY, STILL TRAPPED!");
        stopClickingCount = 0; // Reset count
        crashScreen.classList.add('hidden');
        crashScreen.style.display = 'none';
    } else {
        alert("WRONG! KEEP GUESSING!");
        crashInput.value = '';
    }
});

// Delete system32 prompt
setTimeout(() => {
    deletePrompt.classList.remove('hidden');
}, 10000);

deleteYes.addEventListener('click', () => {
    showTrollPopup("DELETING SYSTEM32... JK LOL!");
    deletePrompt.classList.add('hidden');
});

deleteNo.addEventListener('click', () => {
    showTrollPopup("TOO LATE, TROLLING ANYWAY!");
    deletePrompt.classList.add('hidden');
});

// Text scramble
function scramble(text) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    return text.split('').map(c => Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : c).join('');
}

setInterval(() => {
    scrambleText.textContent = scramble("YOU CAN’T ESCAPE THE FUN!");
    setTimeout(() => scrambleText.textContent = "YOU CAN’T ESCAPE THE FUN!", 1000);
}, 7000);

// Screen shake with hitboxes
function moveElement(element) {
    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;
}

setInterval(() => {
    content.classList.add('shake');
    glitchText.classList.add('shake');
    scrambleText.classList.add('shake');
    screamText.classList.add('shake');
    fakeCursor.classList.add('shake');
    setTimeout(() => {
        content.classList.remove('shake');
        glitchText.classList.remove('shake');
        scrambleText.classList.remove('shake');
        screamText.classList.remove('shake');
        fakeCursor.classList.remove('shake');
    }, 2000);
}, 12000);

glitchText.addEventListener('click', () => moveElement(glitchText));
scrambleText.addEventListener('click', () => moveElement(scrambleText));

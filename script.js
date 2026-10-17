// GANTI DENGAN nama adik dan URL file musik .mp3 kalian di sini.
const birthdayConfig = {
  name: "khansa",
  musicUrl: ""
};

document.querySelectorAll("[data-sister-name]").forEach((element) => {
  element.textContent = birthdayConfig.name;
});

const audio = document.getElementById("birthday-audio");
const musicButton = document.getElementById("music-button");
const musicIcon = document.getElementById("music-icon");
const musicStatus = document.getElementById("music-status");
let statusTimeout;

if (birthdayConfig.musicUrl.trim()) {
  audio.src = birthdayConfig.musicUrl.trim();
}

function showMusicStatus(message) {
  musicStatus.textContent = message;
  musicStatus.classList.remove("hidden");
  window.clearTimeout(statusTimeout);
  statusTimeout = window.setTimeout(() => musicStatus.classList.add("hidden"), 3500);
}

musicButton.addEventListener("click", async () => {
  if (!birthdayConfig.musicUrl.trim()) {
    showMusicStatus("Tambahkan URL file .mp3 di birthdayConfig.musicUrl dulu ya 🎵");
    return;
  }
  if (audio.paused) {
    try {
      await audio.play();
    } catch (error) {
      showMusicStatus("Musik belum bisa diputar. Cek URL file .mp3 dan coba lagi.");
      console.error("Gagal memutar musik ulang tahun:", error);
    }
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  musicIcon.className = "fa-solid fa-pause";
  musicButton.setAttribute("aria-label", "Jeda musik");
  musicButton.setAttribute("aria-pressed", "true");
});
audio.addEventListener("pause", () => {
  musicIcon.className = "fa-solid fa-play";
  musicButton.setAttribute("aria-label", "Putar musik");
  musicButton.setAttribute("aria-pressed", "false");
});
audio.addEventListener("error", () => showMusicStatus("File musik tidak dapat dimuat. Periksa URL .mp3 kamu."));

const wishModal = document.getElementById("wish-modal");
const wishMessage = document.getElementById("wish-message");
const closeModalButton = document.getElementById("close-modal");
let lastFocusedElement;

function closeWishModal() {
  wishModal.classList.add("hidden");
  wishModal.classList.remove("flex");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll("[data-wish]").forEach((card) => {
  card.addEventListener("click", () => {
    lastFocusedElement = card;
    wishMessage.textContent = card.dataset.wish;
    wishModal.classList.remove("hidden");
    wishModal.classList.add("flex");
    closeModalButton.focus();
  });
});
closeModalButton.addEventListener("click", closeWishModal);
document.getElementById("modal-done").addEventListener("click", closeWishModal);
wishModal.addEventListener("click", (event) => {
  if (event.target === wishModal) closeWishModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !wishModal.classList.contains("hidden")) closeWishModal();
});

document.getElementById("celebrate-button").addEventListener("click", () => {
  if (typeof window.confetti !== "function") {
    console.error("Canvas Confetti tidak berhasil dimuat dari CDN.");
    return;
  }
  const duration = 2200;
  const end = Date.now() + duration;
  const colors = ["#F59E0B", "#FFFBEB", "#FCA5A5", "#FFFFFF"];
  (function frame() {
    window.confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.75 },
      colors
    });
    window.confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.75 },
      colors
    });
    if (Date.now() < end) window.requestAnimationFrame(frame);
  })();
});

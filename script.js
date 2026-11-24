const audio = document.querySelector("#background-audio");
const openBirthdayButton = document.querySelector("#open-birthday");
const birthdayCover = document.querySelector("#birthday-cover");

openBirthdayButton.addEventListener("click", () => {
  document.body.classList.add("cover-opened");
  playAudio();
  window.setTimeout(() => {
    birthdayCover.setAttribute("aria-hidden", "true");
  }, 750);
});

const tracks = [
  {
    title: "A Thousand Years",
    src: "assets/lagu/Christina%20Perri%20-%20A%20Thousand%20Years%20Official%20Music%20Video.mp3",
  },
  {
    title: "Semua Aku Dirayakan",
    src: "assets/lagu/Semua+Aku+Dirayakan%20%5BCCw8K2Sskkk%5D.mp3",
  },
];
let currentTrack = 0;

const retryAudioOnInteraction = () => playAudio();

function playAudio() {
  audio.play().then(() => {
    document.removeEventListener("pointerdown", retryAudioOnInteraction);
    document.removeEventListener("keydown", retryAudioOnInteraction);
  }).catch((error) => {
    if (error.name === "NotAllowedError") {
      document.addEventListener("pointerdown", retryAudioOnInteraction, { once: true });
      document.addEventListener("keydown", retryAudioOnInteraction, { once: true });
      return;
    }
    console.error("Musik latar gagal diputar.", error);
  });
}

audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  audio.src = tracks[currentTrack].src;
  playAudio();
});

playAudio();

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");

document.querySelectorAll(".memory-card").forEach((card) => {
  const image = card.querySelector(".memory-image img");
  const openButton = card.querySelector(".memory-image");

  openButton.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  lightboxImage.src = "";
});

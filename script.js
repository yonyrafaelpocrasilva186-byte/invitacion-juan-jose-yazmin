const intro = document.getElementById('intro');
const invitation = document.getElementById('invitation');
const envelope = document.getElementById('envelope');
const openButton = document.getElementById('openInvite');
const music = document.getElementById('music');
const musicToggle = document.getElementById('musicToggle');

openButton.addEventListener('click', async () => {
  envelope.classList.add('open');
  openButton.disabled = true;
  openButton.textContent = 'Abriendo...';
  try {
    await music.play();
    musicToggle.hidden = false;
    musicToggle.classList.add('playing');
    musicToggle.setAttribute('aria-label', 'Pausar música');
  } catch (error) {
    // Si el navegador bloquea el audio, el botón flotante permitirá intentarlo de nuevo.
    musicToggle.hidden = false;
  }
  window.setTimeout(() => {
    intro.hidden = true;
    invitation.classList.add('visible');
    invitation.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => invitation.classList.add('show'));
    musicToggle.hidden = false;
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, 850);
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-label', 'Pausar música');
    } catch (error) {
      musicToggle.setAttribute('aria-label', 'No se pudo reproducir. Toca para intentar otra vez');
    }
  } else {
    music.pause();
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-label', 'Reproducir música');
  }
});

const weddingDate = new Date('2026-12-19T15:00:00-05:00').getTime();
function updateCountdown() {
  const remaining = weddingDate - Date.now();
  const values = remaining <= 0
    ? [0, 0, 0, 0]
    : [
        Math.floor(remaining / 86400000),
        Math.floor((remaining % 86400000) / 3600000),
        Math.floor((remaining % 3600000) / 60000),
        Math.floor((remaining % 60000) / 1000)
      ];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => {
    document.getElementById(id).textContent = String(values[index]).padStart(2, '0');
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

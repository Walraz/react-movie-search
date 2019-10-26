export default function fadeInTop(querySelector) {
  const el = document.querySelector(querySelector)
  setTimeout(() => {
    el.classList.remove('opacity-0')
    el.classList.remove('translate-y-n1')
  }, 0)
}
'use strict';
(() => {
 document.querySelectorAll('.carousel').forEach(carousel => {
 const track = carousel.querySelector('.track');
 const slides = [...track.querySelectorAll('.slide')];
 const selectors = [...carousel.querySelectorAll('.selector')];
 const previous = carousel.querySelector('.previous');
 const next = carousel.querySelector('.next');
 const counter = carousel.querySelector('.counter');
 const names = ['Speech', 'Gesture', 'Sound', 'Space', 'Identity'];
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 let current = 0, frame;
 const position = i => slides[i].offsetLeft - slides[0].offsetLeft;
 function update(i) {
  if (current !== i) slides[current].querySelectorAll('video,audio').forEach(media => media.pause());
  current = i;
  selectors.forEach((button, n) => button.setAttribute('aria-pressed', String(n === i)));
  slides.forEach((slide, n) => { slide.inert = n !== i; slide.setAttribute('aria-hidden', String(n !== i)); });
  previous.disabled = i === 0; next.disabled = i === slides.length - 1;
  counter.textContent = `${String(i + 1).padStart(2, '0')} / 05 · ${names[i]}`;
 }
 function go(i) { i = Math.max(0, Math.min(slides.length - 1, i)); slides[current].querySelectorAll('video,audio').forEach(media => media.pause()); track.scrollTo({left:position(i),behavior:reduced.matches ? 'instant' : 'smooth'}); }
 previous.addEventListener('click', () => go(current - 1));
 next.addEventListener('click', () => go(current + 1));
 selectors.forEach((button, i) => button.addEventListener('click', () => go(i)));
 carousel.addEventListener('keydown', e => {
  if (e.target.closest('video,audio') || e.altKey || e.ctrlKey || e.metaKey) return;
  const target = {ArrowLeft:current-1,ArrowRight:current+1,Home:0,End:slides.length-1}[e.key];
  if (target !== undefined) {e.preventDefault();go(target);}
 });
 track.addEventListener('scroll', () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
   let closest = 0;
   slides.forEach((_, i) => { if (Math.abs(position(i)-track.scrollLeft) < Math.abs(position(closest)-track.scrollLeft)) closest=i; });
   update(closest);
  });
 }, {passive:true});
 window.addEventListener('resize', () => track.scrollTo({left:position(current),behavior:'instant'}));
 carousel.querySelectorAll('video,audio').forEach(media => {
  media.addEventListener('play', () => document.querySelectorAll('video,audio').forEach(other => {if(other !== media) other.pause();}));
 });
 document.addEventListener('visibilitychange', () => {if(document.hidden) carousel.querySelectorAll('video,audio').forEach(media => media.pause());});
 update(0);
 });
})();

// Synthetic samples pair an image with a separate audio player.
document.querySelectorAll('.sample-audio').forEach(player => {
 const audio = player.querySelector('audio');
 const button = player.querySelector('.audio-toggle');
 const label = button.querySelector('.audio-label');
 const icon = button.querySelector('.audio-icon');
 const status = player.querySelector('.audio-status');
 const ready = () => {
  const available = Boolean(audio.getAttribute('src') || audio.querySelector('source[src]'));
  button.disabled = !available;
  status.textContent = available ? '' : 'Audio coming soon';
 };
 const sync = () => {
  label.textContent = audio.paused ? 'Play audio' : 'Pause audio';
  icon.textContent = audio.paused ? '▶' : 'Ⅱ';
  button.setAttribute('aria-label', `${audio.paused ? 'Play' : 'Pause'} ${audio.getAttribute('aria-label')}`);
 };
 button.addEventListener('click', async () => {
  if (!audio.paused) {audio.pause();return;}
  try {await audio.play();status.textContent = '';}
  catch {status.textContent = 'Audio unavailable';}
 });
 ['play','pause','ended'].forEach(event => audio.addEventListener(event,sync));
 audio.addEventListener('error', () => {status.textContent = 'Audio unavailable';sync();});
 audio.addEventListener('loadstart',ready);
 ready();
});
document.querySelectorAll('.sample-video').forEach(player => {
 const video = player.querySelector('video');
 const pending = player.querySelector('.video-pending');
 const ready = () => {pending.hidden = Boolean(video.getAttribute('src') || video.querySelector('source[src]'));};
 video.addEventListener('loadstart',ready);
 video.addEventListener('error', () => {pending.hidden = false;pending.textContent = 'Video unavailable';});
 ready();
});

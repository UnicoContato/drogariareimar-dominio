const header=document.getElementById('header')
const menuButton=document.getElementById('menuButton')
const mobileMenu=document.getElementById('mobileMenu')
const privacyModal=document.getElementById('privacyModal')
const privacyOpen=document.getElementById('privacyOpen')
const privacyClose=document.getElementById('privacyClose')
const lightbox=document.getElementById('lightbox')
const lightboxImage=document.getElementById('lightboxImage')
const lightboxClose=document.getElementById('lightboxClose')
let lastScroll=0
let lastFocused=null

window.addEventListener('scroll',()=>{
  const currentScroll=window.scrollY
  if(currentScroll>lastScroll&&currentScroll>120){
    header.classList.add('hidden-header')
    closeMenu()
  }else{
    header.classList.remove('hidden-header')
  }
  lastScroll=Math.max(currentScroll,0)
},{passive:true})

function closeMenu(){
  mobileMenu.classList.remove('open')
  menuButton.classList.remove('open')
  menuButton.setAttribute('aria-expanded','false')
  menuButton.setAttribute('aria-label','Abrir menu')
}

menuButton.addEventListener('click',()=>{
  const isOpen=mobileMenu.classList.toggle('open')
  menuButton.classList.toggle('open',isOpen)
  menuButton.setAttribute('aria-expanded',String(isOpen))
  menuButton.setAttribute('aria-label',isOpen?'Fechar menu':'Abrir menu')
})

document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',closeMenu))

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
},{threshold:.13})

document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element))

const sections=[...document.querySelectorAll('main section[id]')]
const navLinks=[...document.querySelectorAll('.desktop-nav a')]
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))
    }
  })
},{rootMargin:'-35% 0px -55% 0px'})

sections.forEach(section=>sectionObserver.observe(section))

function openPrivacy(){
  lastFocused=document.activeElement
  privacyModal.classList.add('open')
  privacyModal.setAttribute('aria-hidden','false')
  document.body.classList.add('modal-open')
  privacyClose.focus()
}

function closePrivacy(){
  privacyModal.classList.remove('open')
  privacyModal.setAttribute('aria-hidden','true')
  document.body.classList.remove('modal-open')
  if(lastFocused)lastFocused.focus()
}

privacyOpen.addEventListener('click',openPrivacy)
privacyClose.addEventListener('click',closePrivacy)
privacyModal.querySelector('[data-close-modal]').addEventListener('click',closePrivacy)

document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    lightboxImage.src=item.dataset.image
    lightboxImage.alt=item.querySelector('img').alt
    lightbox.classList.add('open')
    lightbox.setAttribute('aria-hidden','false')
    document.body.classList.add('modal-open')
    lightboxClose.focus()
  })
})

function closeLightbox(){
  lightbox.classList.remove('open')
  lightbox.setAttribute('aria-hidden','true')
  document.body.classList.remove('modal-open')
  setTimeout(()=>{lightboxImage.src=''},300)
}

lightboxClose.addEventListener('click',closeLightbox)
lightbox.addEventListener('click',event=>{
  if(event.target===lightbox)closeLightbox()
})

document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    if(privacyModal.classList.contains('open'))closePrivacy()
    if(lightbox.classList.contains('open'))closeLightbox()
    closeMenu()
  }
})

document.getElementById('currentYear').textContent=new Date().getFullYear()

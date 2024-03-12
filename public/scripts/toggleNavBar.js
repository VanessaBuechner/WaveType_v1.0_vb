let nav = document.querySelector('nav')

document.querySelector('nav-bar').addEventListener('mouseenter', ()=>{ 
    nav.style.width = '20%'
    nav.style.textAlign = 'start'

    document.querySelector('.hidden-menu').style.display = 'block'
})

document.querySelector('nav-bar').addEventListener('mouseleave', ()=>{
    nav.style.width = '7.5vh' //still have to make this value dynamic
    nav.style.textAlign = 'center'

    document.querySelector('.hidden-menu').style.display = 'none'
})
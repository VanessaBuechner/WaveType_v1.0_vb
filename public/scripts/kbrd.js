const colorUntyped = 'rgb(189, 189, 189)'
                const display = document.querySelector('.display-text')
                const keyboard = document.querySelector('.keyboard')

                // const sentence = 'motherfucker'
                const sentence = document.querySelector('.lyrics-span').innerText
                const kb_rows = [
                        '^ 1 2 3 4 5 6 7 8 9 0 ß ´ Backspace',
                        'Tab q w e r t z u i o p ü + Enter',
                        'CapsLock a s d f g h j k l ö ä # Enter2',
                        'Shift < y x c v b n m , . - Shift',
                        'Fn Control Alt Meta Space Meta Alt ArrowLeft ArrowUp/ArrowDown ArrowRight'
                    ]

                const congrats = (t, f, time) =>{
                    if(confirm(`Congrats you did it! \n
                    You had ${t - f} out of ${sentence.length} correct. \n
                    Your mistake count is: ${f}. \n
                    Time: ${time} \n
                    Do you want to reload?`)){
                        const relativeURL = '/'
                        const absoluteURL = new URL(relativeURL, window.location.href)
                        window.location.href = absoluteURL.href
                    }
                    // alert(`Congrats you did it! Your mistakes count is: ${f}`)
                }

               addEventListener('load', (e)=>{
                    const scrollTo = document.querySelector('#scrollTo').innerText
                    document.querySelector(scrollTo).scrollIntoView()

                    sentence.split('').map((e)=>{
                        const span = document.createElement('span')
                        span.style.color = colorUntyped
                        span.style.fontSize = '2vw'
                        span.innerText = e
                        display.append(span)
                    })
                

    
                    kb_rows.map((e)=>{
                        const div_row = document.createElement('div')
                        div_row.classList.add('kb-row')
                        

                        e.split(' ').map((e)=>{
                            const div_key = document.createElement('div')
                            div_key.classList.add('kb-key')

                            if(e == 'ArrowUp/ArrowDown'){
                                div_key.style.background = 'transparent'
                                let arrows = e.split('/')
                                arrows.map((e)=>{
                                    const arrow_key = document.createElement('div')
                                    if(e == 'ArrowUp') arrow_key.innerText = '↑'
                                    else arrow_key.innerText = '↓'

                                    arrow_key.id = e
                                    arrow_key.classList.add('kb-key-item')

                                    div_key.append(arrow_key)
                                })
                                
                            }else{
                                div_key.innerText = e
                                div_key.id = e
                            }

                            switch (e) {
                                case 'Backspace':
                                    div_key.innerText = '⌫'
                                    div_key.style.width = `76px`
                                    break
                                case 'Enter':
                                    div_key.innerText = '⏎'
                                    div_key.style.width = `76px`
                                    break
                                case 'Tab':
                                    div_key.innerText = '⇥'
                                    break
                                case 'Shift':
                                    div_key.innerText = '⇧'
                                    div_key.style.width = `76px`
                                    break
                                case 'CapsLock':
                                    div_key.innerText = '⇪'
                                    div_key.style.width = `76px`
                                    break
                                case 'Space':
                                    div_key.style.width = `190px`
                                    break
                                case 'Control':
                                    div_key.innerText = 'Ctr'
                                    break
                                case 'Meta':
                                    div_key.innerText = 'Cmd'
                                    break
                                case 'ArrowLeft':
                                    div_key.innerText = '←'
                                    div_key.style.fontSize = '12px'
                                    break
                                case 'ArrowRight':
                                    div_key.innerText = '→'
                                    div_key.style.fontSize = '12px'
                                    break
                                default:
                                    break
                            }

                            div_row.append(div_key)
                        })

                        keyboard.append(div_row)
                    })
                    
               })

                let i = 0

                let complete = false

                let minutes = 0
                let seconds = 0
                let time = ''

                let false_count = 0
                let true_count = 0

                
             
                const div = document.querySelector('.timer')
                let mousedown = false

                div.addEventListener('mousedown', (e)=>{ 
                    mousedown = true
                    console.log('true')
                })

                div.addEventListener('mouseup', (e)=>{
                    mousedown = false
                    console.log('false')
                })

                div.addEventListener('mousemove', (e)=>{
                    
                    if(mousedown == true){
                        let x = e.clientX - 50
                        let y = e.clientY - 10
    
                        div.style.left = `${x}px`
                        div.style.top = `${y}px`
                        console.log(x,y)
                    }
                    // console.log(div.offsetLeft)
                    })



                document.querySelector('.typing-start').addEventListener('click', (e)=>{
                    document.querySelector('.display-start').style.display = 'none'

                    let timer = setInterval(() => {
                        let min = ''
                        let sec = ''

                        seconds += 1
                        
                        if(minutes < 10) min = `0${minutes}`
                        else min = minutes

                        if(seconds < 10) sec = `0${seconds}`
                        else sec = seconds

                        time = `${min}:${sec}`

                        document.querySelector('.timer').innerText = time
                        //console.log(time)

                    
                        if(seconds == 60){
                            seconds = 0
                            minutes += 1

                            if(minutes == 2){
                                congrats(true_count, false_count, time)
                                clearInterval(timer)
                            }
                        }


                    }, 1000)


                    document.querySelector('body').addEventListener('keydown', (e)=>{
                
                        const keys = document.querySelectorAll('.kb-key')
                        
                        Array.from(keys).forEach((el)=>{
                            if(e.key == el.id){
                                el.style.opacity = '0.5'
                            }
                        })
                    })
                        
    
                    document.querySelector('body').addEventListener('keyup', (e)=>{
                    
                        const keys = document.querySelectorAll('.kb-key')
                        
                        Array.from(keys).forEach((el)=>{
                            if(e.key == el.id){
                                el.style.opacity = '1'
                            }
                        })
    
                        const characters = display.children
                  
                        while(characters[i] != undefined && characters[i].style.color != 'white' && i < characters.length){
                            // console.log('char', i)
                            // console.log(characters.length)
                            
                            if(e.key == characters[i].innerText){
                                // document.querySelector('.keyboard').style.background = 'rgb(156, 227, 161)'
    
                                true_count += 1
                                characters[i].style.color = 'rgb(156, 227, 161)'
                                i++
    
                                if(i == characters.length){
                                    complete = true
                                    setTimeout(function(){
                                        congrats(true_count, false_count, time)
                                        clearInterval(timer)
                                    }, 300);
                                }
    
                                break
                            }else if(e.key == 'Backspace' && i > 0){
                                i--
                                console.log('backspace', i)
                                characters[i].style.color = 'rgb(189, 189, 189)'
                                break
                            }else if(e.key == 'Shift'){
                                break
                            }
                            else{
                                // document.querySelector('.keyboard').style.background = 'rgb(233, 153, 153)'
                                characters[i].style.color = 'rgb(233, 153, 153)'
                                
                                i++
                                false_count += 1
                                break
                            }
    
                        }
    
                        
                            
                    })

                })

                
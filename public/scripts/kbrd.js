const default_color_lyrics = 'rgb(189, 189, 189)'
                const display = document.querySelector('.display-text')
                const keyboard = document.querySelector('.keyboard')

                let fetched_lyrics = document.querySelector('.lyrics-span').innerText
                if(fetched_lyrics == '') fetched_lyrics = 'Search for lyrics from your favourite artists...'
               
                const keyboard_rows = [
                        '^ 1 2 3 4 5 6 7 8 9 0 ß ´ Backspace',
                        'Tab q w e r t z u i o p ü + Enter',
                        'CapsLock a s d f g h j k l ö ä # Enter2',
                        'Shift < y x c v b n m , . - Shift',
                        'Fn Control Alt Meta Space Meta Alt ArrowLeft ArrowUp/ArrowDown ArrowRight'
                    ]

                const congrats_message = (t, f, time, backspace_count) =>{
                    if(confirm(`\t Congrats you did it! \n
                    You had ${t}% of characters correct. \n
                    Your mistake count is: ${f}. \n
                    Your used backspace: ${backspace_count} times. \n
                    Time: ${time} \n
                    Do you want to reload?`)){
                        window.location.href = '/'
                    }
                    // alert(`Congrats you did it! Your mistakes count is: ${f}`)
                }

               addEventListener('load', (e)=>{
                    const scrollTo = document.querySelector('#scrollTo').innerText
                    document.querySelector(scrollTo).scrollIntoView()

                    fetched_lyrics.split('').map((e)=>{
                        const span_lyrics_letter = document.createElement('span')
                        span_lyrics_letter.style.color = default_color_lyrics
                        span_lyrics_letter.style.fontSize = '2vw'
                        span_lyrics_letter.innerText = e
                        display.append(span_lyrics_letter)
                    })
                

    
                    keyboard_rows.map((e)=>{
                        const div_keyboard_row = document.createElement('div')
                        div_keyboard_row.classList.add('kb-row')
                        

                        e.split(' ').map((e)=>{
                            const div_keyboard_key = document.createElement('div')
                            div_keyboard_key.classList.add('kb-key')

                            if(e == 'ArrowUp/ArrowDown'){
                                div_keyboard_key.style.background = 'transparent'
                                let arrows = e.split('/')
                                arrows.map((e)=>{
                                    const arrow_key = document.createElement('div')
                                    if(e == 'ArrowUp') arrow_key.innerText = '↑'
                                    else arrow_key.innerText = '↓'

                                    arrow_key.id = e
                                    arrow_key.classList.add('kb-key-item')

                                    div_keyboard_key.append(arrow_key)
                                })
                                
                            }else{
                                div_keyboard_key.innerText = e
                                div_keyboard_key.id = e
                            }

                            switch (e) {
                                case 'Backspace':
                                    div_keyboard_key.innerText = '⌫'
                                    div_keyboard_key.style.width = `76px`
                                    break
                                case 'Enter':
                                    div_keyboard_key.innerText = '⏎'
                                    div_keyboard_key.style.width = `76px`
                                    break
                                case 'Tab':
                                    div_keyboard_key.innerText = '⇥'
                                    break
                                case 'Shift':
                                    div_keyboard_key.innerText = '⇧'
                                    div_keyboard_key.style.width = `76px`
                                    break
                                case 'CapsLock':
                                    div_keyboard_key.innerText = '⇪'
                                    div_keyboard_key.style.width = `76px`
                                    break
                                case 'Space':
                                    div_keyboard_key.style.width = `190px`
                                    break
                                case 'Control':
                                    div_keyboard_key.innerText = 'Ctr'
                                    break
                                case 'Meta':
                                    div_keyboard_key.innerText = 'Cmd'
                                    break
                                case 'ArrowLeft':
                                    div_keyboard_key.innerText = '←'
                                    div_keyboard_key.style.fontSize = '12px'
                                    break
                                case 'ArrowRight':
                                    div_keyboard_key.innerText = '→'
                                    div_keyboard_key.style.fontSize = '12px'
                                    break
                                default:
                                    break
                            }

                            div_keyboard_row.append(div_keyboard_key)
                        })

                        keyboard.append(div_keyboard_row)
                    })
                    
               })

                let i = 0

                let complete = false

                let minutes = 0
                let seconds = 0
                let time = ''

                let false_count = 0
                let true_count = 0
                let backspace_count = 0

                
                //FUNCTIONALITY WILL BE ADDED IN LATER RELEASE ----------------------
                    // const div = document.querySelector('.timer')
                    // let mousedown = false

                    // div.addEventListener('mousedown', (e)=>{ 
                    //     mousedown = true
                    //     console.log('true')
                    // })

                    // div.addEventListener('mouseup', (e)=>{
                    //     mousedown = false
                    //     console.log('false')
                    // })

                //IMPLEMENTATION IN LATER RELEASE 
                    // div.addEventListener('mousemove', (e)=>{
                        
                    //     if(mousedown == true){
                    //         let x = e.clientX - 50
                    //         let y = e.clientY - 10
        
                    //         div.style.left = `${x}px`
                    //         div.style.top = `${y}px`
                    //         console.log(x,y)
                    //     }
                    //     // console.log(div.offsetLeft)
                    // })
                //--------------------------------------------------------


                document.querySelector('.typing-start').addEventListener('click', (e)=>{
                    document.querySelector('.display-start').style.display = 'none'


                    //timer for typewriter
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

                            if(minutes == 1){
                                congrats_message(true_count, false_count, time, backspace_count)
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
                                true_count += 1
                                characters[i].style.color = 'rgb(156, 227, 161)'
                                i++
    
                                if(i == characters.length){
                                    complete = true
                                    setTimeout(function(){
                                        congrats_message(true_count, false_count, time, backspace_count)
                                        clearInterval(timer)
                                    }, 300);
                                }
    
                                break
                            }else if(e.key == 'Backspace' && i > 0){
                                i--
                                backspace_count += 1
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

                
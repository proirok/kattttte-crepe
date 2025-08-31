function menu_onclick(){
    all_close()
    const message_p = document.getElementById("message")
    message_p.textContent="⇩⇩⇩⇩⇩⇩☟めにゅ～"
    
    const menu_div = document.getElementById("menu_info")
    menu_div.style.display="block"
    scrollTo(0,0)
}
function allergen_onclick(){
    all_close()
    const message_p = document.getElementById("message")
    message_p.textContent="⇩⇩⇩⇩⇩⇩☟アレルギー情報"
    
    const allergen_div = document.getElementById("allergen_info")
    allergen_div.style.display="block"
    allergen_div.scrollIntoView({  
        behavior: 'smooth'  
    });
}
function costPrice_onclick(){
    all_close()
    const message_p = document.getElementById("message")
    message_p.textContent="⇩⇩⇩⇩⇩⇩☟原価だよー"
    
    const costPrice_div = document.getElementById("costPrice_info")
    costPrice_div.style.display="block"
    scrollTo(0,0)
}
function all_close(){
    const divs = document.getElementsByClassName("additionalInfo")
    for(let div of divs){
        div.style.display = "none"
    }
}
function countdown_display(){
    const now = new Date()
    const day1_open = new Date('2025-09-06T10:30+09:00')
    const day2_open = new Date('2025-09-07T10:30+09:00')

    const countdown_el = document.getElementById("countdown")
    if(now < day1_open || now.getDate() == 6){
        countdown_el.textContent = `[あと${Math.floor((day1_open.getTime() - now.getTime()) / (1000 * 60))}分だよ！]`
    }
    else{
        countdown_el.textContent = `[あと${Math.floor((day2_open.getTime() - now.getTime()) / (1000 * 60))}分だよ！]`
    }
}
countdown_display()
setInterval(
    countdown_display,
    60*1000
)
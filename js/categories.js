$(document).ready(init);

const categoryItems = document.querySelectorAll('[data-category="item"]')

function onVideoHover(video) {
    video.pause();
    video.currentTime = 0;
    video.play();
}

function setListeners() {
    let resizeTimeOut;
    categoryItems.forEach(function(item){
        const video = item.querySelector('.category-menu__video')
        item.addEventListener('mouseover', function(event){ 
            clearTimeout(resizeTimeOut)
            resizeTimeOut = setTimeout(function(){
                onVideoHover(video)
            }, 10)
         })
    } )
}

function init() {
    setListeners()
    console.log('categories.js')
}
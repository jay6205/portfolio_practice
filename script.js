// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let timeout;

function circle_distortion(){
    let x_scale=1;
    let y_scale=1;
    let x_prev=0;
    let y_prev=0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        let x_diff=dets.clientX-x_prev;
        let y_diff=dets.clientY-y_prev;

        let scale_x=gsap.utils.clamp(.6,1.2,Math.abs(x_diff))
        let scale_y=gsap.utils.clamp(.6,1.2,Math.abs(y_diff))

        x_prev=dets.clientX;
        y_prev=dets.clientY;

        circle_mouse_follower(scale_x,scale_x);

        timeout = setTimeout(() => {
            circle_mouse_follower(x_scale,y_scale)
        }, 100);
    })
}

circle_distortion();  

function first_page_animation(){
    let timeline=gsap.timeline();
    timeline.from("#nav",{
        y: '-10',
        opacity: 0,
        ease: Expo.easeInOut,
        duration:1.5
    })
    .to(".bounding_elem",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2
    })
    .from("#landing_page_footer",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    })
}

function circle_mouse_follower(x_scale,y_scale){
    window.addEventListener("mousemove",function(dets){
        let cursor_c=document.querySelector("#mini_circle")
        cursor_c.style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${x_scale},${y_scale})`;
    })
}

first_page_animation();

document.querySelectorAll(".elem")
.forEach(function(elem){
    let rotate=0;
    let diffrot=0;
    elem.addEventListener("mousemove",function(dets){
        let img=elem.querySelector("img")
        img.style.display="block"

        let diff=dets.clientY-elem.getBoundingClientRect().top;
        diffrot=dets.clientX-rotate;
        rotate=dets.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3.easeOut,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot)*0.8
        })
    })

    elem.addEventListener("mouseleave",(dets)=>{
        let img=elem.querySelector("img")
        img.style.display="none"
    })
})

function update_time(){
    const time_elem=document.getElementById("time");
    if(!time_elem) return;
    setInterval(()=>{
        const now=new Date();
        const utc=now.getTime()+(now.getTimezoneOffset()*60000);
        const ist=new Date(utc+(5.5*60*60*1000));
        let hours=ist.getHours();
        const minutes=ist.getMinutes();
        const ampm = hours >= 12?"PM":"AM";
        hours= hours % 12 || 12;
        time_elem.textContent=`${hours}:${minutes} ${ampm}`;
    },1000)
}
update_time()
var img_Number=0;
var imgs = [];
var img_element=$("#img");
var stop_btn=$("#stop");
var stop=false;
var Interval;
function load() {
    imgs = ['images/1.png','images/2.png','images/3.png','images/4.png'];
}
function change_Img()
{
 img_Number=(img_Number+1)%imgs.length;
 img_element.attr("src",imgs[img_Number]);
 img_element.fadeTo(0,0).fadeTo(1500,1)
}
function stop_Interval()
{
    if(!stop)
    {
        clearInterval(Interval);
        stop_btn.text("Continue");
        stop=true;
    }
    else{
        stop_btn.text("Stop");
        Interval=setInterval(change_Img,2000);
        stop=false;
    }
}
Interval=setInterval(change_Img,2000);
stop_btn.on('click',stop_Interval);
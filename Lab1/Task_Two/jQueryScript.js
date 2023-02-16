var img=$("img");
var text=$(".card-body");

img.on('click',function(){
    $(this).parent().find(text).slideToggle(1000);
})

/**
 * Created by PC on 2016/4/9.
 */
var images = "", count = 50;
for(var i = 1; i <= count; i++){
    images += '<img src="../images/avatar/'+ i +'.jpg">'
}

$(".grid").append(images);

var d = 0;
var ry, tz, s;

$(".animate").on("click", function(){
    $("img").each(function(){
        d = Math.random()*1000;  //1ms to 1000ms delay
        $(this).delay(d).animate({opacity: 0}, {
            //fading out
            step: function(n){
                s = 1 - n;
                $(this).css("transform", "scale("+s+")");
            },
            duration: 1000,
        })
    }).promise().done(function(){
        //images back
        storm();
    })
})

//bring back the images
function storm(){
    $("img").each(function(){
        d = Math.random() * 1000;
        $(this).delay(d).animate({opacity: 1},{
            step: function(n){
                ry = (1 - n) * 360;
                tz = (1 - n) * 1000;
                $(this).css("transform", "rotateY("+ ry +"deg) translateZ("+ tz +"px)")
            },
            duration: 3000,
            easing: 'easeOutQuint',
        })
    })
}
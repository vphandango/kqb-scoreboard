window.onload = init;

var scObj, timestamp, timestampOld;
var firstupdate = true;

function init() {
    setTimeout(update, 300);

    pollHandler();

    setInterval(() => {
        pollHandler();
        console.log('pollhandler start');
    }, 500);
}

function scLoaded(xhr) {
    scObj = xhr;
    
    timestampOld = timestamp;
    timestamp = scObj['timestamp'];

    if (timestamp != timestampOld && firstupdate == false) {
        console.log('timestamp check');
        update();
    }
}

function pollHandler() {
    $.ajax({
        url: "streamcontrol.JSON",
        type: 'GET',
        async: true,
        cache: false,
        dataType: 'json',
        success: (xhr) => {scLoaded(xhr);}
    });
}

function update() {
    console.log('entered update');
    if(firstupdate) {
        console.log('firstupdate');
        $('#left_score').html(scObj['Ls']);
        $('#right_score').html(scObj['Rs']);
        $('#left_name').html(scObj['Ln']);
        $('#right_name').html(scObj['Rn']);
        map(scObj['map']);
        firstupdate = false;
    } else {
        if (scObj['allTake'] == timestamp) {
            console.log('toggletake');
            if ($('#container').hasClass('hidden')) {
                const vw = (coef) => window.innerWidth * (coef/100);
                const vh = (coef) => window.innerHeight * (coef/100);

                var translation = vw(4);
                $('#left_score').html(scObj['Ls']);
                $('#right_score').html(scObj['Rs']);
                $('#left_name').html(scObj['Ln']);
                $('#right_name').html(scObj['Rn']);
                map(scObj['map']);
                TweenMax.to($('#container'), .3, {className:"visible", onComplete: () => {
                    TweenMax.to($('#left_frgd'), .3, {opacity: 1, ease:Quad.easeIn, delay: .3});
                    TweenMax.to($('#right_frgd'), .3, {opacity: 1, ease:Quad.easeIn, delay: .3});
                    TweenMax.to($('#left_bkgd'), .3, {opacity: 1, ease:Quad.easeIn, delay: .6});
                    TweenMax.to($('#right_bkgd'), .3, {opacity: 1, ease:Quad.easeIn, delay: .6});
                    TweenMax.to($('#left_name'), .3, {opacity: 1, ease:Quad.easeIn, delay: .9});
                    TweenMax.to($('#right_name'), .3, {opacity: 1, ease:Quad.easeIn, delay: .9});
                    TweenMax.to($('#left_score'), .3, {opacity: 1, ease:Quad.easeIn, delay: .9});
                    TweenMax.to($('#right_score'), .3, {opacity: 1, ease:Quad.easeIn, delay: .9});
                }});
            } else {
                TweenMax.to($('#container'), .3, {className:"hidden", onComplete: () => {
                    TweenMax.to($('#left_frgd'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    TweenMax.to($('#right_frgd'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    TweenMax.to($('#left_bkgd'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    TweenMax.to($('#right_bkgd'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    TweenMax.to($('#left_name'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    TweenMax.to($('#right_name'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    TweenMax.to($('#left_score'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    TweenMax.to($('#right_score'), .1, {opacity: 0, ease:Quad.easeIn, delay: .4});
                    $('#left_score').html(scObj['Ls']);
                    $('#right_score').html(scObj['Rs']);
                    $('#left_name').html(scObj['Ln']);
                    $('#right_name').html(scObj['Rn']);
                }});
            }
        } else {
            if ($('#left_score').html() !== scObj['Ls']) {
                TweenMax.to($('#left_score'), .3, {opacity: 0, ease:Quad.easeIn, onComplete: () => {
                    $('#left_score').html(scObj['Ls']);
                    TweenMax.to($('#left_score'), .3, {opacity: 1, ease:Quad.easeIn, delay: .4});
                }});
            }
            if ($('#right_score').html() !== scObj['Rs']) {
                TweenMax.to($('#right_score'), .3, {opacity: 0, ease:Quad.easeIn, onComplete: () => {
                    $('#right_score').html(scObj['Rs']);
                    TweenMax.to($('#right_score'), .3, {opacity: 1, ease:Quad.easeIn, delay: .4});
                }});
            }
            if ($('#left_name').html() !== scObj['Ln']) {
                TweenMax.to($('#left_name'), .3, {opacity: 0, ease:Quad.easeIn, onComplete: () => {
                    $('#left_name').html(scObj['Ln']);
                    TweenMax.to($('#left_name'), .3, {opacity: 1, ease:Quad.easeIn, delay: .4});
                }});
            }
            if ($('#right_name').html() !== scObj['Rn']) {
                TweenMax.to($('#right_name'), .3, {opacity: 0, ease:Quad.easeIn, onComplete: () => {
                    $('#right_name').html(scObj['Rn']);
                    TweenMax.to($('#right_name'), .3, {opacity: 1, ease:Quad.easeIn, delay: .4});
                }});
            }
        }

    }
}

function map(location) {
    if (location == "tally") {
        console.log(location);
        $(".left").css("left","31.6vw");
        $(".right").css("right","31.57vw");
    } else if (location == "pod") {
        console.log("pod:"+location);
        $(".left").css("left","12.75vw");
        $(".right").css("right","12.72vw");
    } else if (location == "juniper") {
        console.log("juniper:"+location);
        $(".left").css("left","13.75vw");
        $(".right").css("right","13.72vw");
    } else {
        console.log("normal:"+location);
        $(".left").css("left","0vw");
        $(".right").css("right","-0.3vw");
    }
}
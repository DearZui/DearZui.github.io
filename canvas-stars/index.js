/**
 * Created by PC on 2016/4/28.
 */
(function (){
    var canvasE1 = document.getElementById("canvas");
    var ctx = canvasE1.getContext('2d');
    var mousePos = [0, 0];

    var nodes = [];  //stars
    var edges = [];  //lines

    function constructNodes() {
        for (var i = 0; i < 100; i++) {
            var node = {
                drivenByMouse: i = 0,
                x: Math.random() * canvasE1.width,
                y: Math.random() * canvasE1.height,
                vx: Math.random() * 1 - 0.5,
                vy: Math.random() * 1 - 0.5,
                radius : Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3
            };

            node.push(node);
        }

        node.forEach(function(e) {
            nodes.forEach(function (e) {
                if (e == e2) {
                    return;
                }

                var edge = {
                    from : e,
                    to : e2
                };

                addEdge(edge);
            });
        });
    }

    //  screen size changed
    window.onresize = function (){
        canvasE1.width = document.body.clientWidth;
        canvasE1.height = canvasE1.clientHeight;

        if (nodes.length == 0) {
            constructNodes();
        }

        render();
    };

    window.onresize();
})
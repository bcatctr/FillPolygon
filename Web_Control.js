/**
 * Created by scott on 2015/12/14.
 */
// bind mouse
function bindMouseEvent(el,mycube){
        el = el || document;
        el.onmousedown = function(e){
            e = e || window.event;
            if(e.which == 1) {
                var x = e.clientX;
                var y = e.clientY;
                var pre_YAngle = mycube.YAxisAngle;
                var pre_ZAngle = mycube.ZAxisAngle;
                //console.log(x, y);
                el.onmousemove = function (e) {
                    var delta_X = e.clientX - x;
                    var delta_Y = e.clientY - y;
                    console.log(delta_X, delta_Y);
                    mycube.YAxisAngle=(pre_YAngle-delta_Y)%360;
                    mycube.ZAxisAngle=(pre_ZAngle-delta_X)%360;
                    mycube.transform(0,(pre_YAngle-delta_Y)%360,(pre_ZAngle-delta_X)%360);
                    mycube.executeProjection();
                    //MyCube.rotateYAngle();
                    //MyCube.rotateZAngle();
                    //mycube.y_transform();
                    //mycube.z_transform();
                    //console.log(MyCube.XS0.line1.startPoint.x,MyCube.XS0.line1.startPoint.y,MyCube.XS0.line1.startPoint.z);
                }
                el.onmouseup = function (e) {
                    el.onmousemove = el.onmouseup = null;
                }
                document.onmouseup = function (e) {
                    el.onmousemove = el.onmouseup = null;
                }
            }
        }
}
//scale bar Êý¾ÝÌõ
scale=function (btn,bar,title){
    this.btn=document.getElementById(btn);
    this.bar=document.getElementById(bar);
    this.title=document.getElementById(title);
    this.step=this.bar.getElementsByTagName("DIV")[0];
    this.init();
};
scale.prototype={
    init:function (){
        var f=this,g=document,b=window,m=Math;
        f.btn.onmousedown=function (e){
            var x=(e||b.event).clientX;
            var l=this.offsetLeft;
            var max=f.bar.offsetWidth-this.offsetWidth;
            g.onmousemove=function (e){
                var thisX=(e||b.event).clientX;
                var to=m.min(max,m.max(-2,l+(thisX-x)));
                f.btn.style.left=to+'px';
                f.ondrag(m.round(m.max(0,to/max)*100),to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup=new Function('this.onmousemove=null');
        };
    },
    ondrag:function (pos,x){
        this.step.style.width=Math.max(0,x)+'px';
        this.title.innerHTML=pos+'%';
    }
}
new scale('btn','bar','title');
new scale('btn2','bar2','title2');
new scale('btn3','bar3','title3');
var el = document.getElementById("myCanvas");
bindMouseEvent(el,MyCube);
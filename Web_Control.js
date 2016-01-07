/**
 * Created by scott on 2015/12/14.
 */
// bind mouse
function bindMouseEvent(el,mycube){
        el = el || document;
        el.onmousedown = function(e){
            e = e || window.event;
            if(e.which == 1) {
                var x = e.clientX;                     //�����ʱ�����ؾ���λ��xֵ
                var y = e.clientY;                     //�����ʱ�����ؾ���λ��yֵ
                //var pre_XAngle = mycube.XAxisAngle;    //����ק�к㶨
                //var pre_YAngle = mycube.YAxisAngle;
                //var pre_ZAngle = mycube.ZAxisAngle;
                mycube.update_pre();
                mycube.XAxisAngle=0;
                mycube.YAxisAngle=0;
                mycube.ZAxisAngle=0;
                //console.log(x, y);
                el.onmousemove = function (e) {        //����ƶ��¼�
                    var delta_X = (e.clientX - x)/2;
                    var delta_Y = (e.clientY - y)/2;
                    console.log(delta_X, delta_Y);
                    //console.log(preXS0_0);
                    //console.log(mycube.XS0_0);
                    mycube.transform(0,(-delta_Y)%360,(-delta_X)%360,1);
                    this.consistent();
                    mycube.executeProjection();
                    //console.log(mycube.XAxisAngle,mycube.YAxisAngle,mycube.ZAxisAngle);
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
        el.consistent = function () {//����������ת��������ԭʼ��׼���������ת����
            //cb=cosY sb=sinY
            var cb = (mycube.XS0_0.z*fixXS0_2.x-mycube.XS0_2.z*fixXS0_0.x)/(fixXS0_0.z*fixXS0_2.x-fixXS0_2.z*fixXS0_0.x);
            var sb = (mycube.XS0_0.z*fixXS0_2.z-mycube.XS0_2.z*fixXS0_0.z)/(fixXS0_0.x*fixXS0_2.z-fixXS0_2.x*fixXS0_0.z);
            //t1=cosY*x-sinY*z     t2=y
            var t1 = cb*fixXS0_0.x-sb*fixXS0_0.z;
            var t2 = fixXS0_0.y;
            //cy=cosZ sy=sinZ
            var sy = (mycube.XS0_0.x*t2-mycube.XS0_0.y*t1)/(t1*t1+t2*t2);
            var cy = (mycube.XS0_0.x*t1+mycube.XS0_0.y*t2)/(t1*t1+t2*t2);
            scaley.onupdate(Math.round(Math.atan2(cb,sb)/Math.PI*180));
            scalez.onupdate(Math.round(Math.atan2(cy,sy)/Math.PI*180));
            scalex.onupdate(Math.round((Math.atan2(cb,sb)/Math.PI*180+Math.atan2(cy,sy)/Math.PI*180)%360));
        }
}
//scale bar ������
scale=function (btn,bar,title){
    this.btn=document.getElementById(btn);
    this.bar=document.getElementById(bar);
    this.title=document.getElementById(title);
    this.step=this.bar.getElementsByTagName("DIV")[0];
    this.value = 0;
    this.type = 0;  //X scale
    if(title == "Yangle")
        this.type = 1;  //Y scale
    else if(title == "Zangle")
        this.type = 2;  //Zscale
    this.init();
};
scale.prototype={
    init:function (){
        var f=this,g=document,b=window,m=Math;
        var max=f.bar.offsetWidth-this.btn.offsetWidth;
        if(f.type == 0){
            f.onupdate(initial_X);
        }else if(f.type == 1){
            f.onupdate(initial_Y);
        }else{
            f.onupdate(initial_Z);
        }
        f.btn.onmousedown=function (e){
            var x=(e||b.event).clientX;
            var l=this.offsetLeft;
            //var max=f.bar.offsetWidth-this.offsetWidth;
            //console.log(max);
            g.onmousemove=function (e){      //scale bar�϶��Լ���������תʵ��
                var thisX=(e||b.event).clientX;
                var to=m.min(max,m.max(-2,l+(thisX-x)));

                var angle = m.round(m.max(0,to/max)*360);
                f.value = angle;
                f.ondrag(angle,to);
                if(f.type==0){
                    MyCube.transform(angle,scaley.value,scalez.value,0);
                }else if(f.type==1){
                    MyCube.transform(scalex.value,angle,scalez.value,0);
                }else{
                    MyCube.transform(scalex.value,scaley.value,angle,0);
                }
                MyCube.executeProjection();
                //b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup=new Function('this.onmousemove=null');
        };
    },
    ondrag:function (pos,x){            //ͼ���϶�Ч��
        this.btn.style.left=x+'px';
        this.step.style.width=Math.max(0,x)+'px';
        this.title.innerHTML=pos+'&deg;';
    },
    onupdate:function(angle){           //scale bar�϶�����angleλ��
        this.value=angle;
        var max=this.bar.offsetWidth-this.btn.offsetWidth;
        var standardAngle = (angle+360)%360;
        var to = Math.round(standardAngle/360*max);
        this.ondrag(standardAngle, to);
        this.btn.style.left=to+'px';
    }
}
var scalex = new scale('btn','bar','Xangle');
var scaley = new scale('btn2','bar2','Yangle');
var scalez = new scale('btn3','bar3','Zangle');
var el = document.getElementById("myCanvas");
bindMouseEvent(el,MyCube);
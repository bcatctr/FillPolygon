/**
 * Created by jsd on 2015/12/9.
 */
//canvas的宽和高
var width=800;
var height=400;
//class point
function point(x,y,z,color){
    this.x=x;
    this.y=y;
    this.z=z;
    this.pj_x=y+width/2;
    this.pj_y=-z+height/2;
    this.color=color;
}


//class line
function line(startPoint,endPoint,lineColor){
        this.startPoint=startPoint;
        this.endPoint=endPoint;
        this.lineColor=lineColor;
    //根据线段的两个端点startPoint和endPoint的坐标得到该线段的方程标准形式: aX+bY+cZ+d=0;
    this.a=endPoint.z-startPoint.z+endPoint.y-startPoint.y;
    this.b=startPoint.x-endPoint.x;
    this.c=startPoint.x-endPoint.x;
    this.d=(endPoint.x*startPoint.z-startPoint.x*endPoint.z)+(endPoint.x*startPoint.y-startPoint.x*endPoint.y);

}
//class surface of cube, So every surface has four lines
function surface(line1,line2,line3,line4,surfaceColor){
    this.line1=line1;
    this.line2=line2;
    this.line3=line3;
    this.line4=line4;
    this.color=surfaceColor;
}
surface.prototype.getXSum=function(){
    var xSum=this.line1.startPoint.x+this.line1.endPoint.x+this.line3.startPoint.x+this.line3.endPoint.x;
    return xSum;
}
//class cube
function cube(XS0,XS1,YS0,YS1,ZS0,ZS1,fixXS0_0,fixXS0_1,fixXS0_2,fixXS0_3,fixXS1_0,fixXS1_1,fixXS1_2,fixXS1_3){
    this.XS0=XS0;                       //立方体的六个面 XS0,XS1表示垂直于X轴的两个平面，YS0,YS1,ZS0,ZS1定义类似
    this.XS1=XS1;
    this.YS0=YS0;
    this.YS1=YS1;
    this.ZS0=ZS0;
    this.ZS1=ZS1;
    this.fixXS0_0 = fixXS0_0;           //八个顶点 旋转基准
    this.fixXS0_1 = fixXS0_1;
    this.fixXS0_2 = fixXS0_2;
    this.fixXS0_3 = fixXS0_3;
    this.fixXS1_0 = fixXS1_0;
    this.fixXS1_1 = fixXS1_1;
    this.fixXS1_2 = fixXS1_2;
    this.fixXS1_3 = fixXS1_3;
    this.XS0_0 = this.XS0.line1.startPoint;
    this.XS0_1 = this.XS0.line1.endPoint;
    this.XS0_2 = this.XS0.line3.startPoint;
    this.XS0_3 = this.XS0.line3.endPoint;
    this.XS1_0 = this.XS1.line1.startPoint;
    this.XS1_1 = this.XS1.line1.endPoint;
    this.XS1_2 = this.XS1.line3.startPoint;
    this.XS1_3 = this.XS1.line3.endPoint;
    this.XAxisAngle=0;        //立方体以X轴为轴旋转的角度，初始化时为0度；YAxisAngle,ZAxisAngle定义类似
    this.YAxisAngle=0;
    this.ZAxisAngle=0;
}
cube.prototype.x_transform = function(){
    var s=Math.sin(this.XAxisAngle/180*Math.PI);
    var c=Math.cos(this.XAxisAngle/180*Math.PI);
    this.XS0_0.y=this.fixXS0_0.y*c-this.fixXS0_0.z*s;
    this.XS0_0.z=this.fixXS0_0.y*s+this.fixXS0_0.z*c;
    this.XS0_1.y=this.fixXS0_1.y*c-this.fixXS1_0.z*s;
    this.XS0_1.z=this.fixXS0_1.y*s+this.fixXS1_0.z*c;
    this.XS0_2.y=this.fixXS0_2.y*c-this.fixXS0_2.z*s;
    this.XS0_2.z=this.fixXS0_2.y*s+this.fixXS0_2.z*c;
    this.XS0_3.y=this.fixXS0_3.y*c-this.fixXS0_3.z*s;
    this.XS0_3.z=this.fixXS0_3.y*s+this.fixXS0_3.z*c;
    this.XS1_0.y=this.fixXS1_0.y*c-this.fixXS1_0.z*s;
    this.XS1_0.z=this.fixXS1_0.y*s+this.fixXS1_0.z*c;
    this.XS1_1.y=this.fixXS1_1.y*c-this.fixXS1_0.z*s;
    this.XS1_1.z=this.fixXS1_1.y*s+this.fixXS1_0.z*c;
    this.XS1_2.y=this.fixXS1_2.y*c-this.fixXS1_2.z*s;
    this.XS1_2.z=this.fixXS1_2.y*s+this.fixXS1_2.z*c;
    this.XS1_3.y=this.fixXS1_3.y*c-this.fixXS1_3.z*s;
    this.XS1_3.z=this.fixXS1_3.y*s+this.fixXS1_3.z*c;
};
cube.prototype.y_transform = function(){
    var s=Math.sin(this.YAxisAngle/180*Math.PI);
    var c=Math.cos(this.YAxisAngle/180*Math.PI);
    this.XS0_0.x=this.fixXS0_0.x*c+this.fixXS0_0.z*s;
    this.XS0_0.z=-this.fixXS0_0.x*s+this.fixXS0_0.z*c;
    this.XS0_1.x=this.fixXS0_1.x*c+this.fixXS0_1.z*s;
    this.XS0_1.z=-this.fixXS0_1.x*s+this.fixXS0_1.z*c;
    this.XS0_2.x=this.fixXS0_2.x*c+this.fixXS0_2.z*s;
    this.XS0_2.z=-this.fixXS0_2.x*s+this.fixXS0_2.z*c;
    this.XS0_3.x=this.fixXS0_3.x*c+this.fixXS0_3.z*s;
    this.XS0_3.z=-this.fixXS0_3.x*s+this.fixXS0_3.z*c;
    this.XS1_0.x=this.fixXS1_0.x*c+this.fixXS1_0.z*s;
    this.XS1_0.z=-this.fixXS1_0.x*s+this.fixXS1_0.z*c;
    this.XS1_1.x=this.fixXS1_1.x*c+this.fixXS1_1.z*s;
    this.XS1_1.z=-this.fixXS1_1.x*s+this.fixXS1_1.z*c;
    this.XS1_2.x=this.fixXS1_2.x*c+this.fixXS1_2.z*s;
    this.XS1_2.z=-this.fixXS1_2.x*s+this.fixXS1_2.z*c;
    this.XS1_3.x=this.fixXS1_3.x*c+this.fixXS1_3.z*s;
    this.XS1_3.z=-this.fixXS1_3.x*s+this.fixXS1_3.z*c;
};
cube.prototype.z_transform = function(){
    var s=Math.sin(this.ZAxisAngle/180*Math.PI);
    var c=Math.cos(this.ZAxisAngle/180*Math.PI);
    this.XS0_0.x=this.fixXS0_0.x*c-this.fixXS0_0.y*s;
    this.XS0_0.y=this.fixXS0_0.x*s+this.fixXS0_0.y*c;
    this.XS0_1.x=this.fixXS0_1.x*c-this.fixXS0_1.y*s;
    this.XS0_1.y=this.fixXS0_1.x*s+this.fixXS0_1.y*c;
    this.XS0_2.x=this.fixXS0_2.x*c-this.fixXS0_2.y*s;
    this.XS0_2.y=this.fixXS0_2.x*s+this.fixXS0_2.y*c;
    this.XS0_3.x=this.fixXS0_3.x*c-this.fixXS0_3.y*s;
    this.XS0_3.y=this.fixXS0_3.x*s+this.fixXS0_3.y*c;
    this.XS1_0.x=this.fixXS1_0.x*c-this.fixXS1_0.y*s;
    this.XS1_0.y=this.fixXS1_0.x*s+this.fixXS1_0.y*c;
    this.XS1_1.x=this.fixXS1_1.x*c-this.fixXS1_1.y*s;
    this.XS1_1.y=this.fixXS1_1.x*s+this.fixXS1_1.y*c;
    this.XS1_2.x=this.fixXS1_2.x*c-this.fixXS1_2.y*s;
    this.XS1_2.y=this.fixXS1_2.x*s+this.fixXS1_2.y*c;
    this.XS1_3.x=this.fixXS1_3.x*c-this.fixXS1_3.y*s;
    this.XS1_3.y=this.fixXS1_3.x*s+this.fixXS1_3.y*c;
};
//initialize 立方体的中心在三维坐标系的原点位置
var pointXS0_0=new point(100,-100,100,Color.YELLOW);
var pointXS0_1=new point(100,100,100,Color.YELLOW);
var pointXS0_2=new point(100,100,-100,Color.RED);
var pointXS0_3=new point(100,-100,-100,Color.RED);
var pointXS1_0=new point(-100,-100,100,Color.CYAN);
var pointXS1_1=new point(-100,100,100,Color.CYAN);
var pointXS1_2=new point(-100,100,-100,Color.GREEN);
var pointXS1_3=new point(-100,-100,-100,Color.GREEN)

var lineXS0_01=new line(pointXS0_0,pointXS0_1,Color.YELLOW);
var lineXS0_12=new line(pointXS0_1,pointXS0_2,Color.BLUE);
var lineXS0_23=new line(pointXS0_2,pointXS0_3,Color.RED);
var lineXS0_30=new line(pointXS0_3,pointXS0_0,Color.RED);

var lineXS1_01=new line(pointXS1_0,pointXS1_1,Color.YELLOW);
var lineXS1_12=new line(pointXS1_1,pointXS1_2,Color.BLUE);
var lineXS1_23=new line(pointXS1_2,pointXS1_3,Color.GREEN);
var lineXS1_30=new line(pointXS1_3,pointXS1_0,Color.GRAY);

var lineYS0_01=new line(pointXS0_1,pointXS1_1,Color.YELLOW);
var lineYS0_23=new line(pointXS1_2,pointXS0_2,Color.BLUE);
var lineYS1_01=new line(pointXS0_0,pointXS1_0,Color.BLUE);
var lineYS1_23=new line(pointXS1_3,pointXS0_3,Color.GREEN);

var XS0=new surface(lineXS0_01,lineXS0_12,lineXS0_23,lineXS0_30,Color.RED);
var XS1=new surface(lineXS1_01,lineXS1_12,lineXS1_23,lineXS1_30,Color.CYAN);
var YS0=new surface(lineYS0_01,lineXS1_12,lineYS0_23,lineXS0_12,Color.BLUE);
var YS1=new surface(lineYS1_01,lineXS1_30,lineYS1_23,lineXS0_30,Color.GRAY);
var ZS0=new surface(lineYS0_01,lineXS1_01,lineYS1_01,lineXS0_01,Color.YELLOW);
var ZS1=new surface(lineYS0_23,lineXS1_23,lineYS1_23,lineXS0_23,Color.GREEN);

var fix_pointXS0_0=new point(100,-100,100,Color.YELLOW);
var fix_pointXS0_1=new point(100,100,100,Color.YELLOW);
var fix_pointXS0_2=new point(100,100,-100,Color.RED);
var fix_pointXS0_3=new point(100,-100,-100,Color.RED);
var fix_pointXS1_0=new point(-100,-100,100,Color.CYAN);
var fix_pointXS1_1=new point(-100,100,100,Color.CYAN);
var fix_pointXS1_2=new point(-100,100,-100,Color.GREEN);
var fix_pointXS1_3=new point(-100,-100,-100,Color.GREEN)


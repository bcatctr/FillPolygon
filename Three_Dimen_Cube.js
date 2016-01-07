/**
 * Created by jsd on 2015/12/9.
 */
//canvas�Ŀ�͸�
var width=800;
var height=600;
//class point
function point(x,y,z,color){
    this.x=x;
    this.y=y;
    this.z=z;
    this.pj_x=y+width/2;
    this.pj_y=-z+height*0.4;
    this.color=color;
}
point.prototype.update = function(){
    this.pj_x=this.y+width/2;
    this.pj_y=-this.z+height*0.4;
}
point.prototype.copy = function (np) {
    this.x=np.x;
    this.y=np.y;
    this.z=np.z;
    this.pj_x=np.pj_x;
    this.pj_y=np.pj_y
    this.color=np.color;
}
point.prototype.pointRotateYAngle=function(angle1){//��һ��������������y����ת�任��
    var angle=(angle1/180)*Math.PI;
    var tempX=this.x*Math.cos(angle)-this.z*Math.sin(angle);
    var tempY=this.y;
    var tempZ=this.x*Math.sin(angle)+this.z*Math.cos(angle);
    this.x=tempX;
    this.y=tempY;
    this.z=tempZ;
    this.pj_x=this.y+400;
    this.pj_y=-this.z+height/2;

}
point.prototype.pointRotateZAngle=function(angle1){//��һ��������������z����ת�任
    var angle=(angle1/180)*Math.PI;
    var tempX=this.x*Math.cos(angle)+this.y*Math.sin(angle);
    var tempY=-this.x*Math.sin(angle)+this.y*Math.cos(angle);
    var tempZ=this.z;
    this.x=tempX;
    this.y=tempY;
    this.z=tempZ;
    this.pj_x=this.y+400;
    this.pj_y=-this.z+height/2;
    console.log("projection x: "+this.pj_x+"and projection y: "+this.pj_y);
}

//class line
function line(startPoint,endPoint,lineColor){
        this.startPoint=startPoint;
        this.endPoint=endPoint;
        this.lineColor=lineColor;
    //�����߶ε������˵�startPoint��endPoint������õ����߶εķ��̱�׼��ʽ: aX+bY+cZ+d=0;
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

//�˸����� scale��ת��׼ ȫ�ֱ���
var fixXS0_0=new point(100,-100,100,Color.YELLOW);
var fixXS0_1=new point(100,100,100,Color.YELLOW);
var fixXS0_2=new point(100,100,-100,Color.RED);
var fixXS0_3=new point(100,-100,-100,Color.RED);
var fixXS1_0=new point(-100,-100,100,Color.CYAN);
var fixXS1_1=new point(-100,100,100,Color.CYAN);
var fixXS1_2=new point(-100,100,-100,Color.GREEN);
var fixXS1_3=new point(-100,-100,-100,Color.GREEN);

//�˸����� �����ʱ�洢 ����϶���׼
var preXS0_0=new point(100,-100,100,Color.YELLOW);
var preXS0_1=new point(100,100,100,Color.YELLOW);
var preXS0_2=new point(100,100,-100,Color.RED);
var preXS0_3=new point(100,-100,-100,Color.RED);
var preXS1_0=new point(-100,-100,100,Color.CYAN);
var preXS1_1=new point(-100,100,100,Color.CYAN);
var preXS1_2=new point(-100,100,-100,Color.GREEN);
var preXS1_3=new point(-100,-100,-100,Color.GREEN);

//class cube
function cube(XS0,XS1,YS0,YS1,ZS0,ZS1){
    this.XS0=XS0;                       //������������� XS0,XS1��ʾ��ֱ��X�������ƽ�棬YS0,YS1,ZS0,ZS1��������
    this.XS1=XS1;
    this.YS0=YS0;
    this.YS1=YS1;
    this.ZS0=ZS0;
    this.ZS1=ZS1;
    //��ʵ������İ˸�����
    this.XS0_0 = this.XS0.line1.startPoint;
    this.XS0_1 = this.XS0.line1.endPoint;
    this.XS0_2 = this.XS0.line3.startPoint;
    this.XS0_3 = this.XS0.line3.endPoint;
    this.XS1_0 = this.XS1.line1.startPoint;
    this.XS1_1 = this.XS1.line1.endPoint;
    this.XS1_2 = this.XS1.line3.startPoint;
    this.XS1_3 = this.XS1.line3.endPoint;
    this.XAxisAngle=0;        //��������X��Ϊ����ת�ĽǶȣ���ʼ��ʱΪ0�ȣ�YAxisAngle,ZAxisAngle��������
    this.YAxisAngle=0;
    this.ZAxisAngle=0;
}
cube.prototype.transform = function(x,y,z,mode){   //�ӻ�׼�����ο�ʼ��ת���ߴӵ�ǰ�����ο�ʼ��ת
    if(mode==0){          //mode==0 ��fixXSϵ�еĵ���Ϊ��ʼ������ת������scale bar��ת
        this.XAxisAngle=x;
        this.YAxisAngle=y;
        this.ZAxisAngle=z;
        //X����ת
        var s=Math.sin(this.XAxisAngle/180*Math.PI);
        var c=Math.cos(this.XAxisAngle/180*Math.PI);
        this.XS0_0.x=fixXS0_0.x;
        this.XS0_0.y=fixXS0_0.y*c+fixXS0_0.z*s;
        this.XS0_0.z=-fixXS0_0.y*s+fixXS0_0.z*c;
        this.XS0_1.x=fixXS0_1.x;
        this.XS0_1.y=fixXS0_1.y*c+fixXS0_1.z*s;
        this.XS0_1.z=-fixXS0_1.y*s+fixXS0_1.z*c;
        this.XS0_2.x=fixXS0_2.x;
        this.XS0_2.y=fixXS0_2.y*c+fixXS0_2.z*s;
        this.XS0_2.z=-fixXS0_2.y*s+fixXS0_2.z*c;
        this.XS0_3.x=fixXS0_3.x;
        this.XS0_3.y=fixXS0_3.y*c+fixXS0_3.z*s;
        this.XS0_3.z=-fixXS0_3.y*s+fixXS0_3.z*c;
        this.XS1_0.x=fixXS1_0.x;
        this.XS1_0.y=fixXS1_0.y*c+fixXS1_0.z*s;
        this.XS1_0.z=-fixXS1_0.y*s+fixXS1_0.z*c;
        this.XS1_1.x=fixXS1_1.x;
        this.XS1_1.y=fixXS1_1.y*c+fixXS1_1.z*s;
        this.XS1_1.z=-fixXS1_1.y*s+fixXS1_1.z*c;
        this.XS1_2.x=fixXS1_2.x;
        this.XS1_2.y=fixXS1_2.y*c+fixXS1_2.z*s;
        this.XS1_2.z=-fixXS1_2.y*s+fixXS1_2.z*c;
        this.XS1_3.x=fixXS1_3.x;
        this.XS1_3.y=fixXS1_3.y*c+fixXS1_3.z*s;
        this.XS1_3.z=-fixXS1_3.y*s+fixXS1_3.z*c;
        //Y��
        s=Math.sin(this.YAxisAngle/180*Math.PI);
        c=Math.cos(this.YAxisAngle/180*Math.PI);
        var temp1 = this.XS0_0.x;
        var temp2 = this.XS0_0.z;
        this.XS0_0.x=temp1*c-temp2*s;
        this.XS0_0.z=temp1*s+temp2*c;
        temp1 = this.XS0_1.x;
        temp2 = this.XS0_1.z;
        this.XS0_1.x=temp1*c-temp2*s;
        this.XS0_1.z=temp1*s+temp2*c;
        temp1 = this.XS0_2.x;
        temp2 = this.XS0_2.z;
        this.XS0_2.x=temp1*c-temp2*s;
        this.XS0_2.z=temp1*s+temp2*c;
        temp1 = this.XS0_3.x;
        temp2 = this.XS0_3.z;
        this.XS0_3.x=temp1*c-temp2*s;
        this.XS0_3.z=temp1*s+temp2*c;
        temp1 = this.XS1_0.x;
        temp2 = this.XS1_0.z;
        this.XS1_0.x=temp1*c-temp2*s;
        this.XS1_0.z=temp1*s+temp2*c;
        temp1 = this.XS1_1.x;
        temp2 = this.XS1_1.z;
        this.XS1_1.x=temp1*c-temp2*s;
        this.XS1_1.z=temp1*s+temp2*c;
        temp1 = this.XS1_2.x;
        temp2 = this.XS1_2.z;
        this.XS1_2.x=temp1*c-temp2*s;
        this.XS1_2.z=temp1*s+temp2*c;
        temp1 = this.XS1_3.x;
        temp2 = this.XS1_3.z;
        this.XS1_3.x=temp1*c-temp2*s;
        this.XS1_3.z=temp1*s+temp2*c;
        //Z��
        s=Math.sin(this.ZAxisAngle/180*Math.PI);
        c=Math.cos(this.ZAxisAngle/180*Math.PI);
        temp1 = this.XS0_0.x;
        temp2 = this.XS0_0.y;
        this.XS0_0.x=temp1*c+temp2*s;
        this.XS0_0.y=-temp1*s+temp2*c;
        temp1 = this.XS0_1.x;
        temp2 = this.XS0_1.y;
        this.XS0_1.x=temp1*c+temp2*s;
        this.XS0_1.y=-temp1*s+temp2*c;
        temp1 = this.XS0_2.x;
        temp2 = this.XS0_2.y;
        this.XS0_2.x=temp1*c+temp2*s;
        this.XS0_2.y=-temp1*s+temp2*c;
        temp1 = this.XS0_3.x;
        temp2 = this.XS0_3.y;
        this.XS0_3.x=temp1*c+temp2*s;
        this.XS0_3.y=-temp1*s+temp2*c;
        temp1 = this.XS1_0.x;
        temp2 = this.XS1_0.y;
        this.XS1_0.x=temp1*c+temp2*s;
        this.XS1_0.y=-temp1*s+temp2*c;
        temp1 = this.XS1_1.x;
        temp2 = this.XS1_1.y;
        this.XS1_1.x=temp1*c+temp2*s;
        this.XS1_1.y=-temp1*s+temp2*c;
        temp1 = this.XS1_2.x;
        temp2 = this.XS1_2.y;
        this.XS1_2.x=temp1*c+temp2*s;
        this.XS1_2.y=-temp1*s+temp2*c;
        temp1 = this.XS1_3.x;
        temp2 = this.XS1_3.y;
        this.XS1_3.x=temp1*c+temp2*s;
        this.XS1_3.y=-temp1*s+temp2*c;
        this.XS0_0.update();
        this.XS0_1.update();
        this.XS0_2.update();
        this.XS0_3.update();
        this.XS1_0.update();
        this.XS1_1.update();
        this.XS1_2.update();
        this.XS1_3.update();
    }else{                                    //��preXSϵ�еĵ���Ϊ��ʼ������ת��������ק��ת
        this.XAxisAngle=x;
        this.YAxisAngle=y;
        this.ZAxisAngle=z;
        //X��
        var s=Math.sin(this.XAxisAngle/180*Math.PI);
        var c=Math.cos(this.XAxisAngle/180*Math.PI);
        this.XS0_0.x=preXS0_0.x;
        this.XS0_0.y=preXS0_0.y*c+preXS0_0.z*s;
        this.XS0_0.z=-preXS0_0.y*s+preXS0_0.z*c;
        this.XS0_1.x=preXS0_1.x;
        this.XS0_1.y=preXS0_1.y*c+preXS0_1.z*s;
        this.XS0_1.z=-preXS0_1.y*s+preXS0_1.z*c;
        this.XS0_2.x=preXS0_2.x;
        this.XS0_2.y=preXS0_2.y*c+preXS0_2.z*s;
        this.XS0_2.z=-preXS0_2.y*s+preXS0_2.z*c;
        this.XS0_3.x=preXS0_3.x;
        this.XS0_3.y=preXS0_3.y*c+preXS0_3.z*s;
        this.XS0_3.z=-preXS0_3.y*s+preXS0_3.z*c;
        this.XS1_0.x=preXS1_0.x;
        this.XS1_0.y=preXS1_0.y*c+preXS1_0.z*s;
        this.XS1_0.z=-preXS1_0.y*s+preXS1_0.z*c;
        this.XS1_1.x=preXS1_1.x;
        this.XS1_1.y=preXS1_1.y*c+preXS1_1.z*s;
        this.XS1_1.z=-preXS1_1.y*s+preXS1_1.z*c;
        this.XS1_2.x=preXS1_2.x;
        this.XS1_2.y=preXS1_2.y*c+preXS1_2.z*s;
        this.XS1_2.z=-preXS1_2.y*s+preXS1_2.z*c;
        this.XS1_3.x=preXS1_3.x;
        this.XS1_3.y=preXS1_3.y*c+preXS1_3.z*s;
        this.XS1_3.z=-preXS1_3.y*s+preXS1_3.z*c;
        //Y��
        s=Math.sin(this.YAxisAngle/180*Math.PI);
        c=Math.cos(this.YAxisAngle/180*Math.PI);
        var temp1 = this.XS0_0.x;
        var temp2 = this.XS0_0.z;
        this.XS0_0.x=temp1*c-temp2*s;
        this.XS0_0.z=temp1*s+temp2*c;
        temp1 = this.XS0_1.x;
        temp2 = this.XS0_1.z;
        this.XS0_1.x=temp1*c-temp2*s;
        this.XS0_1.z=temp1*s+temp2*c;
        temp1 = this.XS0_2.x;
        temp2 = this.XS0_2.z;
        this.XS0_2.x=temp1*c-temp2*s;
        this.XS0_2.z=temp1*s+temp2*c;
        temp1 = this.XS0_3.x;
        temp2 = this.XS0_3.z;
        this.XS0_3.x=temp1*c-temp2*s;
        this.XS0_3.z=temp1*s+temp2*c;
        temp1 = this.XS1_0.x;
        temp2 = this.XS1_0.z;
        this.XS1_0.x=temp1*c-temp2*s;
        this.XS1_0.z=temp1*s+temp2*c;
        temp1 = this.XS1_1.x;
        temp2 = this.XS1_1.z;
        this.XS1_1.x=temp1*c-temp2*s;
        this.XS1_1.z=temp1*s+temp2*c;
        temp1 = this.XS1_2.x;
        temp2 = this.XS1_2.z;
        this.XS1_2.x=temp1*c-temp2*s;
        this.XS1_2.z=temp1*s+temp2*c;
        temp1 = this.XS1_3.x;
        temp2 = this.XS1_3.z;
        this.XS1_3.x=temp1*c-temp2*s;
        this.XS1_3.z=temp1*s+temp2*c;
        //Z��
        s=Math.sin(this.ZAxisAngle/180*Math.PI);
        c=Math.cos(this.ZAxisAngle/180*Math.PI);
        temp1 = this.XS0_0.x;
        temp2 = this.XS0_0.y;
        this.XS0_0.x=temp1*c+temp2*s;
        this.XS0_0.y=-temp1*s+temp2*c;
        temp1 = this.XS0_1.x;
        temp2 = this.XS0_1.y;
        this.XS0_1.x=temp1*c+temp2*s;
        this.XS0_1.y=-temp1*s+temp2*c;
        temp1 = this.XS0_2.x;
        temp2 = this.XS0_2.y;
        this.XS0_2.x=temp1*c+temp2*s;
        this.XS0_2.y=-temp1*s+temp2*c;
        temp1 = this.XS0_3.x;
        temp2 = this.XS0_3.y;
        this.XS0_3.x=temp1*c+temp2*s;
        this.XS0_3.y=-temp1*s+temp2*c;
        temp1 = this.XS1_0.x;
        temp2 = this.XS1_0.y;
        this.XS1_0.x=temp1*c+temp2*s;
        this.XS1_0.y=-temp1*s+temp2*c;
        temp1 = this.XS1_1.x;
        temp2 = this.XS1_1.y;
        this.XS1_1.x=temp1*c+temp2*s;
        this.XS1_1.y=-temp1*s+temp2*c;
        temp1 = this.XS1_2.x;
        temp2 = this.XS1_2.y;
        this.XS1_2.x=temp1*c+temp2*s;
        this.XS1_2.y=-temp1*s+temp2*c;
        temp1 = this.XS1_3.x;
        temp2 = this.XS1_3.y;
        this.XS1_3.x=temp1*c+temp2*s;
        this.XS1_3.y=-temp1*s+temp2*c;
        this.XS0_0.update();
        this.XS0_1.update();
        this.XS0_2.update();
        this.XS0_3.update();
        this.XS1_0.update();
        this.XS1_1.update();
        this.XS1_2.update();
        this.XS1_3.update();
    }


}
//����ǰ������״̬���Ƶ�preXSϵ�еĵ���
cube.prototype.update_pre = function(){
    preXS0_0.copy(this.XS0_0);
    preXS0_1.copy(this.XS0_1);
    preXS0_2.copy(this.XS0_2);
    preXS0_3.copy(this.XS0_3);
    preXS1_0.copy(this.XS1_0);
    preXS1_1.copy(this.XS1_1);
    preXS1_2.copy(this.XS1_2);
    preXS1_3.copy(this.XS1_3);
}

cube.prototype.rotateYAngle=function(angle){ //��������y����ת�Ƕ�angle
    this.XS0.line1.startPoint.pointRotateYAngle(angle);
    console.log("XS0.line1.startPoint's cordination is x: "+this.XS0.line1.startPoint.x+" y: "+this.XS0.line1.startPoint.y+" z: "+this.XS0.line1.startPoint.z);
    this.XS0.line1.endPoint.pointRotateYAngle(angle);
    this.XS0.line3.startPoint.pointRotateYAngle(angle);
    console.log("XS0.line3.startPoint's cordination is x: "+this.XS0.line3.startPoint.x+" y: "+this.XS0.line3.startPoint.y+" z: "+this.XS0.line3.startPoint.z);

    this.XS0.line3.endPoint.pointRotateYAngle(angle);
    this.XS1.line1.startPoint.pointRotateYAngle(angle);
    this.XS1.line1.endPoint.pointRotateYAngle(angle);
    this.XS1.line3.startPoint.pointRotateYAngle(angle);
    this.XS1.line3.endPoint.pointRotateYAngle(angle);
}
cube.prototype.rotateZAngle=function(angle) { //��������z����ת�Ƕ�angle
    this.XS0.line1.startPoint.pointRotateZAngle(angle);
    console.log("XS0.line1.startPoint's cordination is x: "+this.XS0.line1.startPoint.x+" y: "+this.XS0.line1.startPoint.y+" z: "+this.XS0.line1.startPoint.z);
    this.XS0.line1.endPoint.pointRotateZAngle(angle);
    this.XS0.line3.startPoint.pointRotateZAngle(angle);
    console.log("XS0.line3.startPoint's cordination is x: "+this.XS0.line3.startPoint.x+" y: "+this.XS0.line3.startPoint.y+" z: "+this.XS0.line3.startPoint.z);
    this.XS0.line3.endPoint.pointRotateZAngle(angle);
    this.XS1.line1.startPoint.pointRotateZAngle(angle);
    this.XS1.line1.endPoint.pointRotateZAngle(angle);
    this.XS1.line3.startPoint.pointRotateZAngle(angle);
    this.XS1.line3.endPoint.pointRotateZAngle(angle);
}
//initialize ���������������ά����ϵ��ԭ��λ��
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


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//ctx.fillStyle="#FF0000";
//ctx.fillRect(0,0,150,75);
var imgData = ctx.getImageData(0, 0, width, height);
var img = new RGBAImage(imgData.width, imgData.height, imgData.data);

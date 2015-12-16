/**
 * Created by jsd on 2015/12/10.
 */
//��Ļ�ϵĵ㣬�Ƕ�ά����ϵ�еĵ�
function Point_2D(x,y,color){
    this.x=x;
    this.y=y;
    this.color=color;
}
function line_2D(startPoint,endPoint,lineColor) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.lineColor = lineColor;
    this.minY=startPoint.y;
    console.log(this.minY);
    this.maxY=endPoint.y;
    if(startPoint.y<endPoint.y){
        this.minY=startPoint.y;
        this.maxY=endPoint.y;
    }
    else{
        this.minY=endPoint.y;
        this.maxY=startPoint.y;
    }
    //�����߶ε������˵�startPoint��endPoint������õ����߶εķ��̱�׼��ʽ: aX+bY+c=0;
    this.a=endPoint.y-startPoint.y;
    this.b=startPoint.x-endPoint.x;
    this.c=endPoint.x*startPoint.y-startPoint.x*endPoint.y;
}
/*function line_2D(line){
    this.startPoint = line.startPoint;
    this.endPoint = line.endPoint;
    this.lineColor = line.lineColor;
    this.minY=line.minY;
    this.maxY=line.maxY;
    this.a=line.a;
    this,b=line.b;
    this.c=line.c;
}*/
line_2D.prototype.setColor=function(color){
    this.lineColor =color;
}
line_2D.prototype.getXValue=function(y){
    if(this.a==0){            //����ˮƽ�ߵ������
        if(this.startPoint.x<=this.endPoint.x){
            return this.startPoint.x;
        }
        else{
            return this.endPoint.x;
        }
    }
    else if(Math.abs(y-this.startPoint.y)<1){
        return this.startPoint.x;
    }
    else if(Math.abs(y-this.endPoint.y)<1){
        return this.endPoint.x;
    }
    else{
        return (-this.b*y-this.c)/this.a;

    }
}
line_2D.prototype.getXIncre=function(){
    if(this.a==0){
        return 0;

    }
    else if(this.b==0){
        return 0;
    }
    else{
        return -this.b/this.a;
    }
}
function fourSidePolygon_2D(line1,line2,line3,line4,surfaceColor){
    this.line=new Array(4);

    this.line[0]=line1;
    this.line[1]=line2;
    this.line[2]=line3;
    this.line[3]=line4;
    this.surfaceColor=surfaceColor;
    this.viewable=false;
    console.log(typeof (this.line[0]));
    var totalMinY=this.line[0].minY;//�������������С��y����
    var totalMaxY=this.line[0].maxY;
    for(var i=1;i<4;i++){
        if(this.line[i].minY<totalMinY){
            totalMinY=this.line[i].minY;
        }
        if(this.line[i].maxY>totalMaxY) {
            totalMaxY=this.line[i].maxY;
        }
    }
    this.totalMinY=totalMinY;
    this.totalMaxY=totalMaxY;
}
fourSidePolygon_2D.prototype.setViewable=function(v){
    this.viewable=v;
}
cube.prototype.executeProjection = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    //ctx.fillStyle="#FF0000";
    //ctx.fillRect(0,0,150,75);
    var imgData = ctx.getImageData(0, 0, width, height);
    var img = new RGBAImage(imgData.width, imgData.height, imgData.data);
    //var img=new RGBAImage(800,400);
    //���ñ�����ɫΪ��ɫ
    for (var i = 0; i < img.w; i++) {
        for (var j = 0; j < img.h; j++) {
            img.setPixel(i, j, Color.BLACK);
        }
    }

    //������Ļ�϶�ά����ϵ�е�8���㣬pointXS[0][j]��ʾ��Ӧ��ά������XS0���ϵĵ㣬pointXS[1][j]�������ơ�
    var pointXS = new Array(2);
    pointXS[0] = new Array(4);
    pointXS[1] = new Array(4);
    pointXS[0][0] = new Point_2D(this.XS0.line1.startPoint.pj_x, this.XS0.line1.startPoint.pj_y, this.XS0.line1.startPoint.color);
    //console.log("pointXS[0][0]'s x:"+pointXS[0][0].x+" y: "+pointXS[0][0].y);
    pointXS[0][1] = new Point_2D(this.XS0.line1.endPoint.pj_x,this.XS0.line1.endPoint.pj_y, this.XS0.line1.endPoint.color);
    pointXS[0][2] = new Point_2D(this.XS0.line3.startPoint.pj_x, this.XS0.line3.startPoint.pj_y, this.XS0.line3.startPoint.color);
    pointXS[0][3] = new Point_2D(this.XS0.line3.endPoint.pj_x, this.XS0.line3.endPoint.pj_y, this.XS0.line3.endPoint.color);
    pointXS[1][0] = new Point_2D(this.XS1.line1.startPoint.pj_x, this.XS1.line1.startPoint.pj_y, this.XS1.line1.startPoint.color);
    pointXS[1][1] = new Point_2D(this.XS1.line1.endPoint.pj_x, this.XS1.line1.endPoint.pj_y, this.XS1.line1.endPoint.color);
    pointXS[1][2] = new Point_2D(this.XS1.line3.startPoint.pj_x, this.XS1.line3.startPoint.pj_y, this.XS1.line3.startPoint.color);
    pointXS[1][3] = new Point_2D(this.XS1.line3.endPoint.pj_x, this.XS1.line3.endPoint.pj_y, this.XS1.line3.endPoint.color);
    //console.log("pointXS[0][1]'s x:"+pointXS[0][1].x+" y: "+pointXS[0][1].y);
    //ͶӰ����Ļ�ϵıߺ���
    var pjEdge = new Array(12);
    var pjSurface = new Array(6);
    for (var i = 0; i < 4; i++) {
        pjEdge[i] = new line_2D(pointXS[0][i], pointXS[0][(i + 1) % 4], Color.RED);
    }
    pjEdge[0].setColor(Color.YELLOW);   //�����ߵ���ɫ
    pjEdge[1].setColor(Color.BLUE);


    for (var i = 0; i < 4; i++) {
        pjEdge[i + 4] = new line_2D(pointXS[1][i], pointXS[1][(i + 1) % 4], Color.BLUE);
    }
    pjEdge[4].setColor(Color.YELLOW);
    pjEdge[6].setColor(Color.GREEN);
    pjEdge[7].setColor(Color.GRAY);
    for (var i = 0; i < 4; i++) {
        pjEdge[i + 8] = new line_2D(pointXS[0][i], pointXS[1][i], Color.BLUE);
    }
    pjEdge[8].setColor(Color.YELLOW);
    pjEdge[11].setColor(Color.GREEN);

    pjSurface[0] = new fourSidePolygon_2D(pjEdge[0], pjEdge[1], pjEdge[2], pjEdge[3], Color.RED);//��XS0

    pjSurface[1] = new fourSidePolygon_2D(pjEdge[4], pjEdge[5], pjEdge[6], pjEdge[7], Color.CYAN);//��XS1
    pjSurface[2] = new fourSidePolygon_2D(pjEdge[9], pjEdge[5], pjEdge[10], pjEdge[1], Color.BLUE);//��YS0
    pjSurface[3] = new fourSidePolygon_2D(pjEdge[8], pjEdge[7], pjEdge[11], pjEdge[3], Color.GRAY);//��YS1
    pjSurface[4] = new fourSidePolygon_2D(pjEdge[4], pjEdge[9], pjEdge[0], pjEdge[8], Color.YELLOW);//��ZS0
    pjSurface[5] = new fourSidePolygon_2D(pjEdge[6], pjEdge[10], pjEdge[2], pjEdge[11], Color.GREEN)//��ZS1

    if (this.XS0.getXSum() >= this.XS1.getXSum()) {
        pjSurface[0].setViewable(true);
        pjSurface[1].setViewable(false);
    }
    else {
        pjSurface[0].setViewable(false);
        pjSurface[1].setViewable(true);
    }

    if (this.YS0.getXSum() >= this.YS1.getXSum()) {
        pjSurface[2].setViewable(true);
        pjSurface[3].setViewable(false);
    }
    else {
        pjSurface[2].setViewable(false);
        pjSurface[3].setViewable(true);
    }
    if (this.ZS0.getXSum() >= this.ZS1.getXSum()) {
        pjSurface[4].setViewable(true);
        pjSurface[5].setViewable(false);
    }
    else {
        pjSurface[4].setViewable(false);
        pjSurface[5].setViewable(true);
    }


    for (var s = 0; s < 6; s++) {                    //��ÿ���ı����棬�����жϸ��ı������Ƿ�ɼ����ɼ��Ļ���������ı������ڵ�ǰɨ���ߵ��±߱�ͻ��Ա߱�
        if (pjSurface[s].viewable == true) {
            //console.log("surface "+s+" is "+pjSurface[s].viewable+" its color is "+pjSurface[s].surfaceColor);

            var minY = parseInt(pjSurface[s].totalMinY); //��������
            var maxY = Math.ceil(pjSurface[s].totalMaxY);
            var scanningLineY;            //ɨ���ߵ�y����
            //�±߱�:NET[i]��ʾ��minY�𣬵�i��ɨ���ߵ��±߱���ʼ��ÿ��ɨ���ߵ��±߱�
            var NET = new Array(maxY - minY + 1);
            //���Ա߱�:AET��ʾ��ǰɨ���ߵĻ��Ա߱�
            var AET = new Array();
            for (scanningLineY = minY; scanningLineY <= maxY; scanningLineY++) {
                var scanningLineNum = scanningLineY - minY;      //ɨ���߱��

                NET[scanningLineNum] = new Array();
            }
            for (var i = 0; i < 4; i++) {
                scanningLineY=parseInt(pjSurface[s].line[i].minY);//ÿ�����ȡ����ȡ��
                scanningLineNum = scanningLineY - minY;
                if(pjSurface[s].line[i].a!=0){
                    var tempNETNode = new NETNode(Math.round(pjSurface[s].line[i].getXValue(scanningLineY)), pjSurface[s].line[i].getXIncre(), parseInt(pjSurface[s].line[i].maxY), pjSurface[s].surfaceColor);
                    NET[scanningLineNum].push(tempNETNode);
                    //console.log("surface "+s+"have a NETNode with scanning line "+scanningLineY+" and its Xvalue is"+tempNETNode.x+" its XIncre is "+tempNETNode.xIncre);
                    //console.log("this line 's b: "+pjSurface[s].line[i].b+" c: "+pjSurface[s].line[i].c+" a: "+pjSurface[s].line[i].a);

                }
            }



            /*
            for (scanningLineY = minY; scanningLineY <= maxY; scanningLineY++) {
                console.log("jsd I love you!");
                var scanningLineNum = scanningLineY - minY;      //ɨ���߱��

                NET[scanningLineNum] = new Array();
                for (var i = 0; i < 4; i++) {
                    if (Math.round(pjSurface[s].line[i].minY) == scanningLineY) {
                        if(pjSurface[s].line[i].a!=0){
                            var tempNETNode = new NETNode(Math.round(pjSurface[s].line[i].getXValue(scanningLineY)), pjSurface[s].line[i].getXIncre(), parseInt(pjSurface[s].line[i].maxY), pjSurface[s].surfaceColor);
                            NET[scanningLineNum].push(tempNETNode);
                            console.log("surface "+s+"have a NETNode with scanning line "+scanningLineY+" and its Xvalue is"+tempNETNode.x+" its XIncre is "+tempNETNode.xIncre);
                            console.log("this line 's b: "+pjSurface[s].line[i].b+" c: "+pjSurface[s].line[i].c+" a: "+pjSurface[s].line[i].a);

                        }

                    }
                }
            }*/

            //console.log("minY is "+minY+" and maxY is "+maxY);

            for (scanningLineY = minY; scanningLineY <= maxY; scanningLineY++) {
                var scanningLineNum = scanningLineY - minY;      //ɨ���߱��
                for (var i = 0; i < NET[scanningLineNum].length; i++) {   //���±߱�NET[scanningLineNum]�еı߽���ò����������AET��ʹ֮��x�������˳������
                    //console.log("jsd I love you!");
                    var tempAETNode = new AETNode(NET[scanningLineNum][i].x, NET[scanningLineNum][i].xIncre, NET[scanningLineNum][i].yMax, NET[scanningLineNum][i].surfaceColor);
                    if (AET.length == 0) {
                        AET.push(tempAETNode);
                    }
                    else {
                        var j;
                        for (j = AET.length - 1; j > -1; j--) {      //��������
                            if (tempAETNode.x > AET[j].x) {
                                AET.splice(j + 1, 0, tempAETNode);
                                break;
                            }
                        }
                        if (j < 0) {

                            AET.unshift(tempAETNode);
                        }
                    }
                }
                for (var i = 0; i < AET.length; i++) {
                    //console.log("AET["+i+"] is x: "+AET[i].x+" XIncre: "+AET[i].xIncre+" yMax: "+AET[i].yMax+" scanningLine Y: "+scanningLineY);
                }


                var b = false;//������ǵ�ǰ���Ƿ��ڶ�����ڵĲ�������
                //b=!b;
                for (var i = 0; i < AET.length-1; i++) {
                    var startX =Math.round(AET[i].x);
                    var endX =Math.round(AET[i + 1].x);
                    b = !b;
                    if (b == true) {
                        for (var x = startX; x < endX; x++) {
                            //console.log(startX,endX, scanningLineY, pjSurface[s].surfaceColor.r,pjSurface[s].surfaceColor.g,pjSurface[s].surfaceColor.b);
                            img.setPixel(x, scanningLineY, pjSurface[s].surfaceColor);

                        }

                    }
                }
                for (var i = 0; i < AET.length; i++) {
                    //console.log("jsd I love you!!!");
                    //console.log("AET["+i+"] is x: "+AET[i].x+" XIncre: "+AET[i].xIncre+" yMax: "+AET[i].yMax+" scanningLine Y: "+scanningLineY);
                    if (AET[i].yMax <= scanningLineY+1) {
                        AET.splice(i, 1);
                    }
                    else if (AET[i].yMax > scanningLineY+1) {
                        AET[i].x = AET[i].x + AET[i].xIncre;
                        var temp=AET[i];
                        for(var j=i+1;j<AET.length;j++){         //ð������
                            if(AET[j].x<AET[i].x){
                                AET[j-1]=AET[j];

                            }
                            else{
                                break;
                            }
                        }
                        if(j<AET.length){
                            AET[j-1]=temp;
                            var newJ=j-1;
                            //console.log("AET["+newJ+"] is x: "+AET[j-1].x+" XIncre: "+AET[j-1].xIncre+" yMax: "+AET[j-1].yMax);
                        }
                        else{
                            AET[AET.length-1]=temp;
                        }
                    }
                }


            }
        }
    }
    //reset the canvas image
    imgData=img.toImageData(ctx);
    ctx.putImageData(imgData,0,0);



}




//�±߽ڵ�
function NETNode(x,xIncre,yMax,color){
    this.x=x;                 //�ñ����ɨ�����ཻ�Ľ��������x
    this.xIncre=xIncre;      //x������
    this.yMax=yMax;           //�ñߵ����yֵ
    this.surfaceColor=color;     //���������ɫ
}
//���Ա߽ڵ�
function AETNode(x,xIncre,yMax,color){
    this.x=x;                 //�ñ����ɨ�����ཻ�Ľ��������x
    this.xIncre=xIncre;      //x������
    this.yMax=yMax;           //�ñߵ����yֵ
    this.surfaceColor=color;     //���������ɫ
}
var MyCube=new cube(XS0,XS1,YS0,YS1,ZS0, ZS1);
//MyCube.rotateYAngle(3);
//MyCube.rotateZAngle(30);
var initial_X = 0;
var initial_Y = 80;
var initial_Z = 30;
MyCube.transform(initial_X,initial_Y,initial_Z,0);
//MyCube.update_pre();
//console.log(MyCube.XS0_0.x,MyCube.XS0_0.y,MyCube.XS0_0.z,MyCube.XS0_0.pj_x,MyCube.XS0_0.pj_y);
//console.log(MyCube.XS0_1.x,MyCube.XS0_1.y,MyCube.XS0_1.z,MyCube.XS0_1.pj_x,MyCube.XS0_1.pj_y);
//console.log(MyCube.XS0_2.x,MyCube.XS0_2.y,MyCube.XS0_2.z,MyCube.XS0_2.pj_x,MyCube.XS0_2.pj_y);
//console.log(MyCube.XS0_3.x,MyCube.XS0_3.y,MyCube.XS0_3.z,MyCube.XS0_3.pj_x,MyCube.XS0_3.pj_y);
//console.log(MyCube.XS1_0.x,MyCube.XS1_0.y,MyCube.XS1_0.z,MyCube.XS1_0.pj_x,MyCube.XS1_0.pj_y);
//console.log(MyCube.XS1_1.x,MyCube.XS1_1.y,MyCube.XS1_1.z,MyCube.XS1_1.pj_x,MyCube.XS1_1.pj_y);
//console.log(MyCube.XS1_2.x,MyCube.XS1_2.y,MyCube.XS1_2.z,MyCube.XS1_2.pj_x,MyCube.XS1_2.pj_y);
//console.log(MyCube.XS1_3.x,MyCube.XS1_3.y,MyCube.XS1_3.z,MyCube.XS1_3.pj_x,MyCube.XS1_3.pj_y);
//console.log(1);
//console.log(preXS0_0.x,preXS0_0.y,preXS0_0.z,preXS0_0.pj_x,preXS0_0.pj_y);
//console.log(preXS0_1.x,preXS0_1.y,preXS0_1.z,preXS0_1.pj_x,preXS0_1.pj_y);
//console.log(preXS0_2.x,preXS0_2.y,preXS0_2.z,preXS0_2.pj_x,preXS0_2.pj_y);
//console.log(preXS0_3.x,preXS0_3.y,preXS0_3.z,preXS0_3.pj_x,preXS0_3.pj_y);
//console.log(preXS1_0.x,preXS1_0.y,preXS1_0.z,preXS1_0.pj_x,preXS1_0.pj_y);
//console.log(preXS1_1.x,preXS1_1.y,preXS1_1.z,preXS1_1.pj_x,preXS1_1.pj_y);
//console.log(preXS1_2.x,preXS1_2.y,preXS1_2.z,preXS1_2.pj_x,preXS1_2.pj_y);
//console.log(preXS1_3.x,preXS1_3.y,preXS1_3.z,preXS1_3.pj_x,preXS1_3.pj_y);
//MyCube.transform(0,0,1,1);

MyCube.executeProjection();
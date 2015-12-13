/**
 * Created by jsd on 2015/12/10.
 */
//��Ļ�ϵĵ㣬�Ƕ�ά����ϵ�еĵ�
function Point_2D(x,y,color){
    this.x=x;
    this.y=y;
    this.color=color;
}
function Line_2D(startPoint,endPoint,lineColor) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.lineColor = lineColor;
    this.minY=startPoint.y<endPoint.y?startPoint.y:endPoint.y;
    this.maxY=startPoint.y<endPoint.y?endPoint.y:startPoint.y;

    //�����߶ε������˵�startPoint��endPoint������õ����߶εķ��̱�׼��ʽ: aX+bY+c=0;
    this.a=endPoint.y-startPoint.y;
    this.b=startPoint.x-endPoint.x;
    this.c=startPoint.x*endPoint.y-endPoint.x*startPoint.y;
}
Line_2D.prototype.setColor=function(color){
    this.lineColor =color;
}
Line_2D.prototype.getXValue=function(y){
    if(this.a==0){            //����ˮƽ�ߵ������
        if(this.startPoint.x<=this.endPoint.x){
            return this.startPoint.x;
        }
        else{
            return this.endPoint.x;
        }
    }
    else{
        return (-b*y-c)/a;
    }
}
Line_2D.prototype.getXIncre=function(){
    if(this.a==0){
        return 0;

    }
    else{
        return -b/a;
    }
}
function FourSidePolygon_2D(line1,line2,line3,line4,surfaceColor){

    this.line=new Array(line1,line2,line3,line4);
    //console.log(this.line[0].minY);
    this.surfaceColor=surfaceColor;
    this.viewable=false;
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
FourSidePolygon_2D.prototype.setViewable=function(v){
    this.viewable=v;
}
cube.prototype.executeProjection = function(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    //ctx.fillStyle="#FF0000";
    //ctx.fillRect(0,0,150,75);
    var imgData = ctx.getImageData(0,0,800,400);
    var img=new RGBAImage(imgData.width,imgData.height,imgData.data);
    //var img=new RGBAImage(800,400);
    //���ñ�����ɫΪ��ɫ
    for(var i=0;i<img.w;i++){
        for(var j=0;j<img.h;j++){
            img.setPixel(i,j,Color.BLACK);
        }
    }

    //������Ļ�϶�ά����ϵ�е�8���㣬pointXS[0][j]��ʾ��Ӧ��ά������XS0���ϵĵ㣬pointXS[1][j]�������ơ�
    var pointXS=new Array(2);
    pointXS[0]=new Array(4);
    pointXS[1]=new Array(4);
    pointXS[0][0]=new Point_2D(this.XS0.line1.startPoint.pj_x,-this.XS0.line1.startPoint.pj_y,this.XS0.line1.startPoint.color);
    pointXS[0][1]=new Point_2D(this.XS0.line1.endPoint.pj_x,-this.XS0.line1.endPoint.pj_y,this.XS0.line1.endPoint.color);
    pointXS[0][2]=new Point_2D(this.XS0.line3.startPoint.pj_x,-this.XS0.line3.startPoint.pj_y,this.XS0.line3.startPoint.color);
    pointXS[0][3]=new Point_2D(this.XS0.line3.endPoint.pj_x,-this.XS0.line3.endPoint.pj_y,this.XS0.line3.endPoint.color);
    pointXS[1][0]=new Point_2D(this.XS1.line1.startPoint.pj_x,-this.XS1.line1.startPoint.pj_y,this.XS1.line1.startPoint.color);
    pointXS[1][1]=new Point_2D(this.XS1.line1.endPoint.pj_x,-this.XS1.line1.endPoint.pj_y,this.XS1.line1.endPoint.color);
    pointXS[1][2]=new Point_2D(this.XS1.line3.startPoint.pj_x,-this.XS1.line3.startPoint.pj_y,this.XS1.line3.startPoint.color);
    pointXS[1][3]=new Point_2D(this.XS1.line3.endPoint.pj_x,-this.XS1.line3.endPoint.pj_y,this.XS1.line3.endPoint.color);
    //ͶӰ����Ļ�ϵıߺ���

    var pjEdge=new Array(12);
    var pjSurface=new Array(6);
    for(var i=0;i<4;i++){
        pjEdge[i]=new Line_2D(pointXS[0][i],pointXS[0][(i+1)%4],Color.RED);
    }
    pjEdge[0].setColor(Color.YELLOW);   //�����ߵ���ɫ
    pjEdge[1].setColor(Color.BLUE);


    for(var i=0;i<4;i++){
        pjEdge[i+4]=new Line_2D(pointXS[1][i],pointXS[1][(i+1)%4],Color.BLUE);
    }
    pjEdge[4].setColor(Color.YELLOW);
    pjEdge[6].setColor(Color.GREEN);
    pjEdge[7].setColor(Color.GRAY);
    for(var i=0;i<4;i++){
        pjEdge[i+8]=new Line_2D(pointXS[0][i],pointXS[1][i],Color.BLUE);
    }
    pjEdge[8].setColor(Color.YELLOW);
    pjEdge[11].setColor(Color.GREEN);

    pjSurface[0]=new FourSidePolygon_2D(pjEdge[0],pjEdge[1],pjEdge[2],pjEdge[3],Color.RED);//��XS0
    pjSurface[1]=new FourSidePolygon_2D(pjEdge[4],pjEdge[5],pjEdge[6],pjEdge[7],Color.CYAN);//��XS1
    pjSurface[2]=new FourSidePolygon_2D(pjEdge[9],pjEdge[5],pjEdge[10],pjEdge[1],Color.BLUE);//��YS0
    pjSurface[3]=new FourSidePolygon_2D(pjEdge[8],pjEdge[7],pjEdge[11],pjEdge[3],Color.GRAY);//��YS1
    pjSurface[4]=new FourSidePolygon_2D(pjEdge[4],pjEdge[9],pjEdge[0],pjEdge[8],Color.YELLOW);//��ZS0
    pjSurface[5]=new FourSidePolygon_2D(pjEdge[6],pjEdge[10],pjEdge[2],pjEdge[11],Color.GREEN)//��ZS1

    console.log(pjSurface[0].line[0]);
    if(this.XS0.getXSum()>=this.XS1.getXSum()){
        pjSurface[0].setViewable(true);
        pjSurface[1].setViewable(false);
    }
    else{
        pjSurface[0].setViewable(false);
        pjSurface[1].setViewable(true);
    }

    if(this.YS0.getXSum()>=this.YS1.getXSum()){
        pjSurface[2].setViewable(true);
        pjSurface[3].setViewable(false);
    }
    else{
        pjSurface[2].setViewable(false);
        pjSurface[3].setViewable(true);
    }
    if(this.ZS0.getXSum()>=this.ZS1.getXSum()){
        pjSurface[4].setViewable(true);
        pjSurface[5].setViewable(false);
    }
    else{
        pjSurface[4].setViewable(false);
        pjSurface[5].setViewable(true);
    }

    /*
    var minX=800;
    var maxX=0;
    //����ͼ�ε���Сy�����ΪminY�����y�����ΪmaxY
    var minY=400;
    var maxY=0;
    // minYEdge��¼ӵ������ͼ�ε���Сy����ıߵı�ţ�maxYEdge��¼ӵ������ͼ�ε����y����ıߵı��
    var minYEdge=0;
    var maxYEdge=0;
    //����õ�minY��minYEdge��maxY��maxYEdge
    for(var i= 0;i<12;i++ ){
        if(pjEdge[i].minY<minY){
            minY=pjEdge[i].minY;
            minYEdge=i;
        }
        if(pjEdge[i].maxY>maxY){
            maxY=pjEdge[i].maxY;
            maxYEdge=i;
        }
    }*/
    for(var s=0;s<6;s++) {                    //��ÿ���ı����棬�����жϸ��ı������Ƿ�ɼ����ɼ��Ļ���������ı������ڵ�ǰɨ���ߵ��±߱�ͻ��Ա߱�
        if (pjSurface[s].viewable == true) {
            var minY = pjSurface[s].totalMinY;
            var maxY = pjSurface[s].totalMaxY;
            var scanningLineY;            //ɨ���ߵ�y����
            //�±߱�:NET[i]��ʾ��minY�𣬵�i��ɨ���ߵ��±߱���ʼ��ÿ��ɨ���ߵ��±߱�
            var NET = new Array(maxY - minY + 1);
            //���Ա߱�:AET��ʾ��ǰɨ���ߵĻ��Ա߱�
            var AET = new Array();
            for (scanningLineY = minY; scanningLineY <= maxY; scanningLineY++) {
                var scanningLineNum = scanningLineY - minY;      //ɨ���߱��

                NET[scanningLineNum] = new Array();
                for (var i = 0; i < 4; i++) {
                    if (pjSurface[s].line[i].minY == scanningLineY) {
                        var tempNETNode = new NETNode(pjSurface[s].line[i].getXValue(scanningLineY), pjSurface[s].line[i].getXIncre(), pjSurface[s].line[i].maxY, pjSurface[s].surfaceColor);
                        NET[scanningLineNum].push(tempNETNode);
                    }
                }
            }
            for (scanningLineY = minY; scanningLineY <= maxY; scanningLineY++) {
                var scanningLineNum = scanningLineY - minY;      //ɨ���߱��
                for (var i = 0; i < NET[scanningLineNum].length; i++) {   //���±߱�NET[scanningLineNum]�еı߽���ò����������AET��ʹ֮��x�������˳������
                    var tempAETNode = new AETNode(NET[scanningLineNum][i].x, NET[scanningLineNum][i].xIncre, NET[scanningLineNum][i].yMax, NET[scanningLineNum][i].surfaceColor);
                    if (AET.length == 0) {
                        AET.push(tempAETNode);
                    }
                    else {
                        var j;
                        for (j = AET.length - 1; j <= 0; i--) {      //��������
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
                var b = false;//������ǵ�ǰ���Ƿ��ڶ�����ڵĲ�������
                //b=!b;
                for (var i = 0; i < AET.length; i++) {
                    var startX = AET[i].x;
                    var endX = AET[i + 1].x;
                    b = !b;
                    if (b == true) {
                        for (var x = startX; x < endX; x++) {
                            img.setPixel(x, scanningLineY, pjSurface[s].surfaceColor);
                        }
                    }
                }
                for (var i = 0; i < AET.length; i++) {
                    if(AET[i].yMax==scanningLineY) {
                        AET.splice(i,1);
                    }
                    else if(AET[i].yMax>scanningLineY) {
                        AET[i].x=AET[i].x+AET[i].xIncre;
                    }
                }


            }
        }
    }
    //reset the canvas image
    imgData=img.toImageData(ctx);
    ctx.putImageData(imgData,0,0);
    return img;


    /*
    var scaningLineY;
    //�±߱�:NET[i]��ʾ��i��ɨ���ߵ��±߱���ʼ��ÿ��ɨ���ߵ��±߱�
    var NET=new Array(maxY-minY+1);
    for(scaningLineY=minY;scaningLineY<=maxY;scaningLineY++){
        NET[scaningLineY-minY]=new Array();
        for(var i= 0;i<12;i++){
            if(pjEdge[i].minY==scaningLineY){
                var tempNETNode=new NETNode(pjEdge[i].getXValue(scaningLineY),pjEdge[i].getXIncre(),pjEdge[i].maxY,i);
                NET[scaningLineY-minY].push(tempNETNode);
            }
        }
    }
    //���Ա߱�:AET[i]��ʾ��i��ɨ���ߵĻ��Ա߱�
    var AET=new Array(maxY-minY+1);
    for(scaningLineY=minY;scaningLineY<=maxY;scaningLineY++) {
        AET[scaningLineY - minY] = new Array();
        var scaningLineNum=scaningLineY - minY;

        for(var i=0;i<NET[scaningLineNum].length;i++){
            var tempAETNode=new AETNode(NET[scaningLineNum][i].x,NET[scaningLineNum][i].xIncre,NET[scaningLineNum][i].yMax,NET[scaningLineNum][i].edgeNum);
            if(AET[scaningLineNum].length==0){
                AET[scaningLineNum].push(tempAETNode);
            }
            else{
                var j;
                for(j=AET[scaningLineNum].length-1;j<=0;i--){      //��������
                    if(tempAETNode.x>AET[scaningLineNum][j].x){
                        AET[scaningLineNum].splice(j+1,0,tempAETNode);
                        break;
                    }
                }
                if(j<0){
                    AET[scaningLineNum].unshift(tempAETNode);
                }
            }
        }
        var b=false;//������ǵ�ǰ���Ƿ��ڶ�����ڵĲ�������
        //b=!b;
        for(var i=0;i<AET[scaningLineNum].length;i++){
            var startX=AET[scaningLineNum][i].x;
            var endX=AET[scaningLineNum][i+1].x;
            b=!b;
            if(b==true){
                for(var i=startX;i<endX;i++){
                    img.setPixel(i,scaningLineY,
                }
            }

        }*/

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

var MyCube=new cube(XS0,XS1,YS0,YS1,ZS0,ZS1,fix_pointXS0_0,fix_pointXS0_1,fix_pointXS0_2,fix_pointXS0_3,fix_pointXS1_0,fix_pointXS1_1,fix_pointXS1_2,fix_pointXS1_3);
MyCube.executeProjection();
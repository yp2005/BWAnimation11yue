// 泡泡游戏泡泡类
class Balloon extends ui.BalloonUI {
    public name:string; //
    public initX:number; //原来的x轴坐标
    public initY:number; //原来的y轴坐标

    constructor(type:string = "word",name:string = "",num:number = 1) {
        super(); 
        if(type === "word"){
            this.pic.visible = false;
            // let ranArr = HotAirBalloon.hotAirBalloonMain.getRandomArr(9);
            this.textBg.skin = "HotAirBalloon/"+num+".png";
            this.text.text = name;
            this.text.visible = true;
            this.textBg.visible = true;
            this.name = name;
        }else{
            this.text.visible = false;
            this.textBg.visible = false;
            this.pic.visible = true;
            this.pic.skin = "HotAirBalloon/"+name;
            this.name = name.split('.')[0];
        }
        
        this.on(Laya.Event.CLICK, this, this.click);
    }

    // 被点击
    public click(){
        console.log(HotAirBalloon.hotAirBalloonMain.wordContext+"---"+this.name);
        if(HotAirBalloon.hotAirBalloonMain.wordContext === this.name){
            Laya.SoundManager.playSound("res/audio/HotAirBalloon/"+this.name+".mp3", 1);
            // Laya.Tween.to(this, {x: -300}, 5000);
            this.removeBalloon();
            HotAirBalloon.hotAirBalloonMain.soundContext++;
            if(HotAirBalloon.hotAirBalloonMain.soundContext === HotAirBalloon.gameConfig.options.length){
                console.log("well done");
                HotAirBalloon.hotAirBalloonMain.gameover();
            }
        }else{
            this.shake();
        }
    }

    public removeBalloon(){
        let _x = -300;
        if(this.x>450){
            _x = 1100;
        }
        Laya.Tween.to(this, {x: _x}, 5000);
    }

    public setPos(x:number,y:number){
        this.pos(x,y);
        this.initX = x
        this.initY = y
        // 让延迟0-1秒随机时间开始晃动
        Laya.timer.once(Math.random() * 1000, this, this.shake1);
    }

    // 飘动
    public shake1() {
        Laya.Tween.to(this, {y: this.initY - 10}, Math.random() * 2000+1000, null, Laya.Handler.create(this, this.shake2));
    }

    private shake2() {
        Laya.Tween.to(this, {y: this.initY}, Math.random() * 2000+1000, null, Laya.Handler.create(this, this.shake1));
    }

    // 图片晃动
    private shake() {
        Laya.SoundManager.playSound("res/audio/ferris-wheel-wrong.mp3", 1);
        let _x = this.x;
        Laya.Tween.to(this, {x:_x-15}, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function(){
            Laya.Tween.to(this, {x:_x+15}, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function(){
                Laya.Tween.to(this, {x:_x-15}, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function(){
                    Laya.Tween.to(this, {x:_x+15}, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function(){
                        Laya.Tween.to(this, {x:_x-15}, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function(){
                            Laya.Tween.to(this, {x:_x}, 50, Laya.Ease.elasticInOut)
                        }))
                    } ))
                }))
            }))
        }));
    }
}

// 泡泡游戏
import Stage = Laya.Stage;
import WebGL   = Laya.WebGL;
import Sprite = Laya.Sprite;
class HotAirBalloonMain extends ui.HotAirBalloonUI {
    private configView: HABConfigView; // 配置页
    public maxX: number = 1000; //
    public maxY: number = 570; //
    private soundArr: Array<any>; //
    public soundContext: number = 0; //
    public wordContext: string = ""; //
    // public is

    constructor() {
        super(); 
        this.configView = new HABConfigView(this.configBox);
        this.tip.visible = false;
        this.setting.on(Laya.Event.CLICK, this, this.showConfigView);
        if(HotAirBalloon.gameConfig.gameModel) {
            this.setting.visible = false;    
        }
        this.restart();

        this.replayAble.on(Laya.Event.CLICK,this,this.restart);
        this.play.on(Laya.Event.CLICK,this,this.playSound);
    }

    // 游戏重新开始
    public restart() {
        this.mainpanel.destroyChildren();
        this.init();
    }

    public gameover(){
        this.replayAble.visible = true;
        this.wordContext = "";
    }

    //初始化
    public init(){
        this.bg.skin = "HotAirBalloon/"+HotAirBalloon.gameConfig.bg;

        // 用来计算随机偏移量
        let perx = this.maxX/20;
        let pery = this.maxX/10;
        let posRan = this.getRandomArr(10);
        let numRan = this.getRandomArr(9);

        for(let i = 0;i<HotAirBalloon.gameConfig.options.length;i++){
            let aa = HotAirBalloon.gameConfig.options[i];
            let item = new Balloon(HotAirBalloon.gameConfig.optionType,HotAirBalloon.gameConfig.options[i],numRan[i%9]);
            // let x = Math.random()*this.maxX;
            // let y = Math.random()*this.maxY;
            // 位置分为两排，12345，678910
            // x的值就是除5的余数（总是0-4之间），乘以总长的5分一；
            let x = ((posRan[i]-1)%5) * this.maxX/5;
            // y的值就是除5的商（总是0或者1），乘以总高的2分一；
            let y = Math.floor((posRan[i]-1)/5) * this.maxY/2;
            x = x+Math.random()*perx;
            y = y+Math.random()*pery;

            item.setPos(x,y);
            this.mainpanel.addChild(item);
        }

        this.soundArr = this.getRandomArr(HotAirBalloon.gameConfig.options.length);
        this.soundContext = 0;
        this.replayAble.visible = false;
    }

    public playSound(){
        let wordindex = this.soundArr[this.soundContext] - 1;
        this.wordContext = HotAirBalloon.gameConfig.options[wordindex];
        console.log(this.wordContext);
        Laya.SoundManager.playSound("res/audio/HotAirBalloon/"+this.wordContext+".mp3", 1);
        // this.soundContext++;
    }

     // 显示提示
    public showTip(text: string) {
        this.tip.text = text;
        this.tip.visible = true;
        this.tip.removeSelf();
        this.addChild(this.tip);
        Laya.timer.once(1500, this, this.hideTip);
    }

    // 隐藏提示
    private hideTip() {
        this.tip.visible = false;
    }

    // 显示游戏配置页面 
    private showConfigView() {
        this.configView.show();
    }

    // 设置设置按钮是否显示
    public showSetting(state: boolean) {
        if(!HotAirBalloon.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    }


    // 返回随机数组
    public getRandomArr(length:number = 0){
        let arr = [];
        for(var i = 0;i<length;i++){
            arr.push(i+1);
        }
        return arr.sort((a,b)=>{
            return Math.random()>.5 ? -1 : 1
        });
    }
}

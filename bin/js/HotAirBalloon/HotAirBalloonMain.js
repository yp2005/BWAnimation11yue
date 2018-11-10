var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 泡泡游戏
var Stage = Laya.Stage;
var WebGL = Laya.WebGL;
var Sprite = Laya.Sprite;
var HotAirBalloonMain = /** @class */ (function (_super) {
    __extends(HotAirBalloonMain, _super);
    // public is
    function HotAirBalloonMain() {
        var _this = _super.call(this) || this;
        _this.maxX = 1000; //
        _this.maxY = 570; //
        _this.soundContext = 0; //
        _this.wordContext = ""; //
        _this.configView = new HABConfigView(_this.configBox);
        _this.tip.visible = false;
        _this.setting.on(Laya.Event.CLICK, _this, _this.showConfigView);
        if (HotAirBalloon.gameConfig.gameModel) {
            _this.setting.visible = false;
        }
        _this.restart();
        _this.replayAble.on(Laya.Event.CLICK, _this, _this.restart);
        _this.play.on(Laya.Event.CLICK, _this, _this.playSound);
        return _this;
    }
    // 游戏重新开始
    HotAirBalloonMain.prototype.restart = function () {
        this.mainpanel.destroyChildren();
        this.init();
    };
    HotAirBalloonMain.prototype.gameover = function () {
        this.replayAble.visible = true;
        this.wordContext = "";
    };
    //初始化
    HotAirBalloonMain.prototype.init = function () {
        var ranArr1 = this.getRandomArr(5);
        var ranArr2 = this.getRandomArr(5);
        this.bg.skin = "HotAirBalloon/" + HotAirBalloon.gameConfig.bg;
        var xRanArr = this.getRandomArr(10);
        var yRanArr = this.getRandomArr(5);
        // 用来计算随机偏移量
        var perx = this.maxX / 20;
        var pery = this.maxX / 10;
        var posRan = this.getRandomArr(10);
        for (var i = 0; i < HotAirBalloon.gameConfig.options.length; i++) {
            var aa = HotAirBalloon.gameConfig.options[i];
            var item = new Balloon(HotAirBalloon.gameConfig.optionType, HotAirBalloon.gameConfig.options[i]);
            // let x = Math.random()*this.maxX;
            // let y = Math.random()*this.maxY;
            // 位置分为两排，12345，678910
            // x的值就是除5的余数（总是0-4之间），乘以总长的5分一；
            var x = ((posRan[i] - 1) % 5) * this.maxX / 5;
            // y的值就是除5的商（总是0或者1），乘以总高的2分一；
            var y = Math.floor((posRan[i] - 1) / 5) * this.maxY / 2;
            x = x + Math.random() * perx;
            y = y + Math.random() * pery;
            item.setPos(x, y);
            this.mainpanel.addChild(item);
        }
        this.soundArr = this.getRandomArr(HotAirBalloon.gameConfig.options.length);
        this.soundContext = 0;
        this.replayAble.visible = false;
    };
    HotAirBalloonMain.prototype.getRandomPos = function (num) {
        var perx = this.maxX / 5;
        var posRan = this.getRandomArr(10);
        if (num > 5) {
            // 分两排
        }
        else {
            // 一排
        }
    };
    HotAirBalloonMain.prototype.playSound = function () {
        var wordindex = this.soundArr[this.soundContext] - 1;
        this.wordContext = HotAirBalloon.gameConfig.options[wordindex];
        console.log(this.wordContext);
        Laya.SoundManager.playSound("res/audio/HotAirBalloon/" + this.wordContext + ".mp3", 1);
        // this.soundContext++;
    };
    // 显示提示
    HotAirBalloonMain.prototype.showTip = function (text) {
        this.tip.text = text;
        this.tip.visible = true;
        this.tip.removeSelf();
        this.addChild(this.tip);
        Laya.timer.once(1500, this, this.hideTip);
    };
    // 隐藏提示
    HotAirBalloonMain.prototype.hideTip = function () {
        this.tip.visible = false;
    };
    // 显示游戏配置页面 
    HotAirBalloonMain.prototype.showConfigView = function () {
        this.configView.show();
    };
    // 设置设置按钮是否显示
    HotAirBalloonMain.prototype.showSetting = function (state) {
        if (!HotAirBalloon.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    };
    // 返回随机数组
    HotAirBalloonMain.prototype.getRandomArr = function (length) {
        if (length === void 0) { length = 0; }
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr.push(i + 1);
        }
        return arr.sort(function (a, b) {
            return Math.random() > .5 ? -1 : 1;
        });
    };
    return HotAirBalloonMain;
}(ui.HotAirBalloonUI));
//# sourceMappingURL=HotAirBalloonMain.js.map
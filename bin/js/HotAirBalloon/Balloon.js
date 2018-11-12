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
// 泡泡游戏泡泡类
var Balloon = /** @class */ (function (_super) {
    __extends(Balloon, _super);
    function Balloon(type, name, num) {
        if (type === void 0) { type = "word"; }
        if (name === void 0) { name = ""; }
        if (num === void 0) { num = 1; }
        var _this = _super.call(this) || this;
        _this.isLeaving = false;
        if (type === "word") {
            _this.pic.visible = false;
            // let ranArr = HotAirBalloon.hotAirBalloonMain.getRandomArr(9);
            _this.textBg.skin = "HotAirBalloon/" + num + ".png";
            _this.text.text = name;
            _this.text.visible = true;
            _this.textBg.visible = true;
            _this.name = name;
        }
        else {
            _this.text.visible = false;
            _this.textBg.visible = false;
            _this.pic.visible = true;
            _this.pic.skin = "HotAirBalloon/" + name;
            _this.name = name.split('.')[0];
        }
        _this.on(Laya.Event.CLICK, _this, _this.click);
        return _this;
    }
    // 被点击
    Balloon.prototype.click = function () {
        console.log(HotAirBalloon.hotAirBalloonMain.wordContext + "---" + this.name);
        if (this.isLeaving) {
            return;
        }
        if (HotAirBalloon.hotAirBalloonMain.wordContext === this.name) {
            Laya.SoundManager.playSound("res/audio/HotAirBalloon/" + this.name + ".mp3", 1);
            // Laya.Tween.to(this, {x: -300}, 5000);
            this.removeBalloon();
            HotAirBalloon.hotAirBalloonMain.soundContext++;
            HotAirBalloon.hotAirBalloonMain.wordContext = "";
            if (HotAirBalloon.hotAirBalloonMain.soundContext === HotAirBalloon.gameConfig.options.length) {
                console.log("well done");
                HotAirBalloon.hotAirBalloonMain.gameover();
            }
        }
        else {
            this.shake();
        }
    };
    Balloon.prototype.removeBalloon = function () {
        if (this.y < 50) {
            Laya.Tween.to(this, { y: -500 }, 5000);
        }
        else {
            var _x = -300;
            if (this.x > 450) {
                _x = 1100;
            }
            Laya.Tween.to(this, { x: _x }, 5000);
        }
        this.isLeaving = true;
    };
    Balloon.prototype.setPos = function (x, y) {
        this.pos(x, y);
        this.initX = x;
        this.initY = y;
        // 让延迟0-1秒随机时间开始晃动
        Laya.timer.once(Math.random() * 1000, this, this.shake1);
    };
    // 飘动
    Balloon.prototype.shake1 = function () {
        if (this.isLeaving)
            return;
        Laya.Tween.to(this, { y: this.initY - 10 }, Math.random() * 2000 + 1000, null, Laya.Handler.create(this, this.shake2));
    };
    Balloon.prototype.shake2 = function () {
        if (this.isLeaving)
            return;
        Laya.Tween.to(this, { y: this.initY }, Math.random() * 2000 + 1000, null, Laya.Handler.create(this, this.shake1));
    };
    // 图片晃动
    Balloon.prototype.shake = function () {
        Laya.SoundManager.playSound("res/audio/HotAirBalloon/hab-wrong.mp3", 1);
        var _x = this.x;
        Laya.Tween.to(this, { x: _x - 15 }, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(this, { x: _x + 15 }, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function () {
                Laya.Tween.to(this, { x: _x - 15 }, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this, { x: _x + 15 }, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function () {
                        Laya.Tween.to(this, { x: _x - 15 }, 50, Laya.Ease.elasticInOut, Laya.Handler.create(this, function () {
                            Laya.Tween.to(this, { x: _x }, 50, Laya.Ease.elasticInOut);
                        }));
                    }));
                }));
            }));
        }));
    };
    return Balloon;
}(ui.BalloonUI));
//# sourceMappingURL=Balloon.js.map
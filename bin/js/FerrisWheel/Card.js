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
// 选项卡
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(type, content, number) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.content = content;
        if (type == "word") {
            _this.card.visible = true;
            _this.text.visible = true;
            _this.cardPic.visible = false;
            _this.card.skin = "FerrisWheel/card/" + number + ".png";
            _this.text.text = content;
        }
        else {
            _this.card.visible = false;
            _this.text.visible = false;
            _this.cardPic.visible = true;
            _this.cardPic.skin = "FerrisWheel/card-pic/" + content;
        }
        _this.on(Laya.Event.CLICK, _this, _this.ontouch);
        return _this;
    }
    Card.prototype.ontouch = function () {
        if (FerrisWheel.ferrisWheelMain.turnPause) {
            return;
        }
        var answer = FerrisWheel.ferrisWheelMain.questions[FerrisWheel.ferrisWheelMain.curQuestionIndex].answer;
        var right = false;
        for (var _i = 0, answer_1 = answer; _i < answer_1.length; _i++) {
            var a = answer_1[_i];
            if (this.content == a) {
                this.scale(1.3, 1.3);
                FerrisWheel.ferrisWheelMain.answeredNumber++;
                if (FerrisWheel.ferrisWheelMain.answeredNumber == answer.length) {
                    FerrisWheel.ferrisWheelMain.answerRight();
                }
                right = true;
                break;
            }
        }
        if (!right) {
            this.initX = this.x;
            this.off(Laya.Event.CLICK, this, this.ontouch);
            Laya.SoundManager.playSound("res/audio/ferris-wheel-wrong.mp3", 1);
            // 抖动
            Laya.Tween.to(this, { x: this.initX - 15 }, 50, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(this, { x: this.initX }, 50, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this, { x: this.initX - 15 }, 50, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(this, { x: this.initX }, 50, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(this, { x: this.initX - 15 }, 50, null, Laya.Handler.create(this, function () {
                                Laya.Tween.to(this, { x: this.initX }, 50, null, Laya.Handler.create(this, function () {
                                    this.on(Laya.Event.CLICK, this, this.ontouch);
                                }));
                            }));
                        }));
                    }));
                }));
            }));
        }
    };
    return Card;
}(ui.CardUI));
//# sourceMappingURL=Card.js.map
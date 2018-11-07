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
// 游戏主界面
var FerrisWheelMain = /** @class */ (function (_super) {
    __extends(FerrisWheelMain, _super);
    function FerrisWheelMain() {
        var _this = _super.call(this) || this;
        _this.options = new Array(); // 选项卡
        _this.curQuestionIndex = 0; // 当前问题序号
        _this.answeredNumber = 0; // 当前问题已答对选项数量
        _this.turnPause = false; // 摩天轮是否暂停转动
        _this.questionPic = null;
        _this.configView = new FWConfigView(_this.configBox);
        _this.tip.visible = false;
        _this.setting.on(Laya.Event.CLICK, _this, _this.showConfigView);
        if (FerrisWheel.gameConfig.gameModel) {
            _this.setting.visible = false;
        }
        _this.init();
        // 摩天轮转动
        Laya.timer.frameLoop(5, _this, _this.animate);
        return _this;
    }
    // 初始化
    FerrisWheelMain.prototype.init = function () {
        // replay按钮初始化
        this.replayAble.visible = false;
        // 选项卡初始化
        this.questions = FerrisWheel.gameConfig.questions;
        var optionType = FerrisWheel.gameConfig.optionType;
        var options = FerrisWheel.gameConfig.options;
        this.curFrame = this["frame" + options.length];
        for (var i = 0; i < options.length; i++) {
            var card = new Card(optionType, options[i], i + 1);
            this.curFrame.addChild(card);
            var pole = this.curFrame.getChildByName("pole" + (i + 1));
            card.pivotX = 69;
            card.pivotY = 54;
            card.x = pole.x;
            card.y = pole.y;
            this.options.push(card);
        }
        this.curFrame.visible = true;
        // 问题牌初始化
        if (FerrisWheel.gameConfig.questionType == "text") {
            this.question.visible = true;
            this.question.fontSize = FerrisWheel.gameConfig.questionFontSize;
            this.question.text = this.questions[0].question;
        }
        else {
            this.question.visible = false;
            this.questionPic = new Laya.Image();
            this.questionPic.skin = "FerrisWheel/" + this.questions[0].question;
            this.brand.addChild(this.questionPic);
            this.questionPic.centerX = 0;
            this.questionPic.centerY = 0;
        }
        this.nextAble.visible = false;
    };
    FerrisWheelMain.prototype.nextQuestion = function () {
        this.nextAble.visible = false;
        this.curQuestionIndex++;
        if (FerrisWheel.gameConfig.questionType == "text") {
            this.question.text = this.questions[this.curQuestionIndex].question;
        }
        else {
            this.questionPic.skin = "FerrisWheel/" + this.questions[this.curQuestionIndex].question;
        }
        this.next.off(Laya.Event.CLICK, this, this.nextQuestion);
        this.turnPause = false;
        this.answeredNumber = 0;
        this.resetCard();
    };
    FerrisWheelMain.prototype.resetCard = function () {
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            option.scale(1, 1);
        }
    };
    FerrisWheelMain.prototype.answerRight = function () {
        Laya.SoundManager.playSound("res/audio/ferris-wheel-right.mp3", 1);
        this.turnPause = true;
        if (this.curQuestionIndex + 1 < this.questions.length) {
            this.next.on(Laya.Event.CLICK, this, this.nextQuestion);
            this.nextAble.visible = true;
        }
        else {
            this.replayAble.visible = true;
            this.replay.on(Laya.Event.CLICK, this, this.restart);
        }
    };
    // 显示提示
    FerrisWheelMain.prototype.showTip = function (text) {
        this.tip.text = text;
        this.tip.visible = true;
        this.tip.removeSelf();
        this.addChild(this.tip);
        Laya.timer.once(1500, this, this.hideTip);
    };
    FerrisWheelMain.prototype.hideTip = function () {
        this.tip.visible = false;
    };
    // 显示游戏配置页面 
    FerrisWheelMain.prototype.showConfigView = function () {
        this.configView.show();
    };
    // 设置设置按钮是否显示
    FerrisWheelMain.prototype.showSetting = function (state) {
        if (!FerrisWheel.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    };
    // 重新开始游戏
    FerrisWheelMain.prototype.restart = function () {
        if (this.questionPic != null) {
            this.brand.removeChild(this.questionPic);
            this.questionPic.destroy();
            this.questionPic = null;
        }
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            this.curFrame.removeChild(option);
            option.destroy(true);
        }
        this.options = new Array();
        // 初始化选项卡
        var options = new Array();
        var optionType = FerrisWheel.gameConfig.optionType;
        this.curFrame.visible = false;
        this.curFrame = this["frame" + FerrisWheel.gameConfig.options.length];
        var indexes = new Array();
        for (var i = 0; i < FerrisWheel.gameConfig.options.length; i++) {
            indexes.push(i);
        }
        for (var j = 0; j < FerrisWheel.gameConfig.options.length; j++) {
            var i = Math.floor(Math.random() * indexes.length); // 随机一个选项
            var index = indexes[i];
            indexes.splice(i, 1);
            options.push(FerrisWheel.gameConfig.options[index]);
        }
        for (var i = 0; i < options.length; i++) {
            var card = new Card(optionType, options[i], i + 1);
            this.curFrame.addChild(card);
            var pole = this.curFrame.getChildByName("pole" + (i + 1));
            card.pivotX = 69;
            card.pivotY = 54;
            card.x = pole.x;
            card.y = pole.y;
            this.options.push(card);
            card.rotation = 0;
        }
        this.curFrame.rotation = 0;
        this.curFrame.visible = true;
        // 问题牌初始化
        this.questions = new Array();
        indexes = new Array();
        for (var i = 0; i < FerrisWheel.gameConfig.questions.length; i++) {
            indexes.push(i);
        }
        for (var j = 0; j < FerrisWheel.gameConfig.questions.length; j++) {
            var i = Math.floor(Math.random() * indexes.length); // 随机一个问题
            var index = indexes[i];
            indexes.splice(i, 1);
            this.questions.push(FerrisWheel.gameConfig.questions[index]);
        }
        if (FerrisWheel.gameConfig.questionType == "text") {
            this.question.visible = true;
            this.question.fontSize = FerrisWheel.gameConfig.questionFontSize;
            this.question.text = this.questions[0].question;
        }
        else {
            this.question.visible = false;
            this.questionPic = new Laya.Image();
            this.questionPic.skin = "FerrisWheel/" + this.questions[0].question;
            this.brand.addChild(this.questionPic);
            this.questionPic.centerX = 0;
            this.questionPic.centerY = 0;
        }
        this.nextAble.visible = false;
        // 其他参数设置
        this.curQuestionIndex = 0;
        this.answeredNumber = 0;
        this.turnPause = false;
        this.replayAble.visible = false;
        this.replay.off(Laya.Event.CLICK, this, this.restart);
    };
    FerrisWheelMain.prototype.animate = function (e) {
        if (!this.turnPause) {
            this.curFrame.rotation += 1;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var option = _a[_i];
                option.rotation -= 1;
            }
        }
    };
    return FerrisWheelMain;
}(ui.FerrisWheelUI));
//# sourceMappingURL=FerrisWheelMain.js.map
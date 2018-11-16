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
        _this.questionPic = null; // 问题图片，问题类型为图片时使用
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
        var options = FerrisWheel.gameConfig.options;
        this.initFrame(options.length); // 初始化摩天轮架子
        for (var i = 0; i < options.length; i++) {
            var card = new Card(options[i], i + 1);
            this.fwframe.addChild(card);
            var pole = this.fwframe.getChildByName("pole" + (i + 1));
            card.pivotX = 69;
            card.pivotY = 54;
            card.x = pole.x;
            card.y = pole.y;
            this.options.push(card);
        }
        // 问题牌初始化
        if (FerrisWheel.gameConfig.questionType == "text") {
            this.question.visible = true;
            this.question.fontSize = FerrisWheel.gameConfig.questionFontSize;
            this.question.text = this.questions[0].question;
        }
        else {
            this.question.visible = false;
            this.questionPic = new Laya.Image();
            this.questionPic.skin = "FerrisWheel/question-pic/" + this.questions[0].question;
            this.brand.addChild(this.questionPic);
            this.questionPic.centerX = 0;
            this.questionPic.centerY = 0;
        }
        this.nextAble.visible = false;
    };
    // 初始化摩天轮架子
    FerrisWheelMain.prototype.initFrame = function (optionSize) {
        var initX = 3;
        var initY = 287;
        var R = 264;
        var angle = 360 / optionSize; // 根据选项数量均分摩天轮
        for (var i = 0; i < optionSize; i++) {
            var pole = new Laya.Image();
            pole.name = "pole" + (i + 1);
            pole.skin = "FerrisWheel/pole.png";
            this.fwframe.addChild(pole);
            pole.pivot(0, 7);
            pole.rotation = i * angle;
            var radian = void 0; // 弧度
            // 将每个杆子放在摩天轮适当的位置
            if (pole.rotation <= 90) {
                radian = Math.PI / 180 * pole.rotation;
                pole.x = initX + R - R * Math.cos(radian);
                pole.y = initY - R * Math.sin(radian);
            }
            else if (pole.rotation > 90 && pole.rotation <= 180) {
                radian = Math.PI / 180 * (180 - pole.rotation); // 使用小于90度的角度的弧度，保证计算逻辑一致性
                pole.x = initX + R + R * Math.cos(radian);
                pole.y = initY - R * Math.sin(radian);
            }
            else if (pole.rotation > 180 && pole.rotation <= 270) {
                radian = Math.PI / 180 * (pole.rotation - 180); // 使用小于90度的角度的弧度，保证计算逻辑一致性
                pole.x = initX + R + R * Math.cos(radian);
                pole.y = initY + R * Math.sin(radian);
            }
            else if (pole.rotation > 270) {
                radian = Math.PI / 180 * (360 - pole.rotation); // 使用小于90度的角度的弧度，保证计算逻辑一致性
                pole.x = initX + R - R * Math.cos(radian);
                pole.y = initY + R * Math.sin(radian);
            }
        }
    };
    // 进入下一个问题
    FerrisWheelMain.prototype.nextQuestion = function () {
        this.nextAble.visible = false;
        this.curQuestionIndex++;
        if (FerrisWheel.gameConfig.questionType == "text") {
            this.question.text = this.questions[this.curQuestionIndex].question;
        }
        else {
            this.questionPic.skin = "FerrisWheel/question-pic/" + this.questions[this.curQuestionIndex].question;
        }
        this.next.off(Laya.Event.CLICK, this, this.nextQuestion);
        this.turnPause = false;
        this.answeredNumber = 0;
        this.resetCard();
    };
    // 选项卡恢复原大小
    FerrisWheelMain.prototype.resetCard = function () {
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            option.scale(1, 1);
        }
    };
    // 回答问题正确的处理
    FerrisWheelMain.prototype.answerRight = function () {
        // 播放正确提示音
        Laya.SoundManager.playSound("res/audio/ferris-wheel-right.mp3", 1);
        // 摩天轮暂停转动
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
    // 隐藏提示
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
        // 将上一轮游戏的各个元素全部删除
        if (this.questionPic != null) {
            this.brand.removeChild(this.questionPic);
            this.questionPic.destroy();
            this.questionPic = null;
        }
        for (var i = 0; i < this.options.length; i++) {
            this.fwframe.removeChild(this.options[i]);
            this.options[i].destroy(true);
            var pole = this.fwframe.getChildByName("pole" + (i + 1));
            this.fwframe.removeChild(pole);
            pole.destroy(true);
        }
        this.options = new Array();
        // 初始化选项卡
        var options = new Array();
        this.initFrame(FerrisWheel.gameConfig.options.length);
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
            var card = new Card(options[i], i + 1);
            this.fwframe.addChild(card);
            var pole = this.fwframe.getChildByName("pole" + (i + 1));
            card.pivotX = 69;
            card.pivotY = 54;
            card.x = pole.x;
            card.y = pole.y;
            this.options.push(card);
            card.rotation = 0;
        }
        this.fwframe.rotation = 0;
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
            this.questionPic.skin = "FerrisWheel/question-pic/" + this.questions[0].question;
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
    // 摩天轮转动
    FerrisWheelMain.prototype.animate = function (e) {
        if (!this.turnPause) {
            this.fwframe.rotation += 1;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var option = _a[_i];
                option.rotation -= 1;
            }
        }
    };
    return FerrisWheelMain;
}(ui.FerrisWheelUI));
//# sourceMappingURL=FerrisWheelMain.js.map
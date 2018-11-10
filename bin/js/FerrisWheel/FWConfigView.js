// 配置界面
var FWConfigView = /** @class */ (function () {
    function FWConfigView(configBox) {
        this.configBox = configBox;
        this.hide();
        // 初始化配置页面元素
        this.questionFontSize = configBox.getChildByName("questionFontSize");
        this.questions = configBox.getChildByName("questions");
        this.options = configBox.getChildByName("options");
        this.textRadio = configBox.getChildByName("textRadio");
        this.wordRadio = configBox.getChildByName("wordRadio");
        this.picRadio = configBox.getChildByName("picRadio");
        this.picRadio1 = configBox.getChildByName("picRadio1");
        this.textRadioImg = configBox.getChildByName("textRadioImg");
        this.wordRadioImg = configBox.getChildByName("wordRadioImg");
        this.picRadioImg = configBox.getChildByName("picRadioImg");
        this.picRadioImg1 = configBox.getChildByName("picRadioImg1");
        this.submitBtn = configBox.getChildByName("submitBtn");
        this.closeBtn = configBox.getChildByName("closeBtn");
        // 添加事件监听
        this.textRadio.on(Laya.Event.CLICK, this, this.switchText);
        this.textRadioImg.on(Laya.Event.CLICK, this, this.switchText);
        this.picRadio.on(Laya.Event.CLICK, this, this.switchPic);
        this.picRadioImg.on(Laya.Event.CLICK, this, this.switchPic);
        this.wordRadio.on(Laya.Event.CLICK, this, this.switchWord);
        this.wordRadioImg.on(Laya.Event.CLICK, this, this.switchWord);
        this.picRadio1.on(Laya.Event.CLICK, this, this.switchPic1);
        this.picRadioImg1.on(Laya.Event.CLICK, this, this.switchPic1);
        this.submitBtn.on(Laya.Event.CLICK, this, this.submit);
        this.closeBtn.on(Laya.Event.CLICK, this, this.hide);
    }
    // 问题类型选择文字
    FWConfigView.prototype.switchText = function (e) {
        e.stopPropagation();
        if (this.questionType == "picture") {
            this.questionType = "text";
            this.textRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg.skin = "common/img_radio_notCheck.png";
        }
    };
    // 问题类型选择图片
    FWConfigView.prototype.switchPic = function (e) {
        e.stopPropagation();
        if (this.questionType == "text") {
            this.questionType = "picture";
            this.textRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg.skin = "common/img_radio_checked.png";
        }
    };
    // 选项类型选择单词
    FWConfigView.prototype.switchWord = function (e) {
        e.stopPropagation();
        if (this.optionType == "picture") {
            this.optionType = "word";
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg1.skin = "common/img_radio_notCheck.png";
        }
    };
    // 选项类型选择图片
    FWConfigView.prototype.switchPic1 = function (e) {
        if (this.optionType == "word") {
            this.optionType = "picture";
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg1.skin = "common/img_radio_checked.png";
        }
    };
    // 初始化
    FWConfigView.prototype.init = function () {
        this.questionType = FerrisWheel.gameConfig.questionType;
        if (this.questionType == "text") {
            this.textRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg.skin = "common/img_radio_notCheck.png";
        }
        else {
            this.picRadioImg.skin = "common/img_radio_checked.png";
            this.textRadioImg.skin = "common/img_radio_notCheck.png";
        }
        this.optionType = FerrisWheel.gameConfig.optionType;
        if (this.optionType == "word") {
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg1.skin = "common/img_radio_notCheck.png";
        }
        else {
            this.picRadioImg1.skin = "common/img_radio_checked.png";
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
        }
        this.questionFontSize.text = FerrisWheel.gameConfig.questionFontSize;
        // 初始化问题内容
        var questionText = "";
        for (var _i = 0, _a = FerrisWheel.gameConfig.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            var qt = question.question.replace(/\n/g, "<br>");
            if (questionText == "") {
                questionText = qt + "==";
            }
            else {
                questionText += "@@" + qt + "==";
            }
            var answers = "";
            for (var _b = 0, _c = question.answer; _b < _c.length; _b++) {
                var a = _c[_b];
                if (answers == "") {
                    answers = a;
                }
                else {
                    answers += "," + a;
                }
            }
            questionText += answers;
        }
        this.questions.text = questionText;
        // 初始化选项内容
        var optionText = "";
        for (var _d = 0, _e = FerrisWheel.gameConfig.options; _d < _e.length; _d++) {
            var option = _e[_d];
            if (optionText == "") {
                optionText = option;
            }
            else {
                optionText += "," + option;
            }
        }
        this.options.text = optionText;
    };
    // 显示配置
    FWConfigView.prototype.show = function () {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf();
        FerrisWheel.ferrisWheelMain.addChild(this.configBox);
    };
    // 隐藏配置
    FWConfigView.prototype.hide = function () {
        this.configBox.visible = false;
    };
    // 提交配置
    FWConfigView.prototype.submit = function () {
        if (!this.questionFontSize.text) {
            FerrisWheel.ferrisWheelMain.showTip("请输入问题字号！");
            return;
        }
        if (!this.questions.text) {
            FerrisWheel.ferrisWheelMain.showTip("请输入问题！");
            return;
        }
        if (!this.options.text) {
            FerrisWheel.ferrisWheelMain.showTip("请输入选项！");
            return;
        }
        var options = this.options.text.split(",");
        if (options.length < 4 || options.length > 10) {
            FerrisWheel.ferrisWheelMain.showTip("选项数量在4-10之间！");
            return;
        }
        var questionTexts = this.questions.text.split("@@");
        var questions = [];
        for (var _i = 0, questionTexts_1 = questionTexts; _i < questionTexts_1.length; _i++) {
            var questionText = questionTexts_1[_i];
            var questionTextSp = questionText.split("==");
            if (questionTextSp.length != 2 || questionTextSp[0] == "" || questionTextSp[1] == "") {
                FerrisWheel.ferrisWheelMain.showTip("问题配置格式错误，请参考示例！");
                return;
            }
            var answers = questionTextSp[1].split(",");
            questions.push({
                question: questionTextSp[0].replace(/<br>/g, "\n"),
                answer: answers
            });
        }
        FerrisWheel.gameConfig = {
            gameModel: false,
            questionType: this.questionType,
            questionFontSize: parseInt(this.questionFontSize.text),
            questions: questions,
            optionType: this.optionType,
            options: options
        };
        FerrisWheel.ferrisWheelMain.showTip("提交成功！");
        this.hide();
        FerrisWheel.ferrisWheelMain.restart();
    };
    return FWConfigView;
}());
//# sourceMappingURL=FWConfigView.js.map
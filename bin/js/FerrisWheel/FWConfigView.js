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
            this.questionType = "word";
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg1.skin = "common/img_radio_notCheck.png";
        }
    };
    // 选项类型选择图片
    FWConfigView.prototype.switchPic1 = function (e) {
        if (this.questionType == "picture") {
            this.questionType = "word";
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg1.skin = "common/img_radio_checked.png";
        }
    };
    // 初始化
    FWConfigView.prototype.init = function () {
        // this.layout = HitBalloon.gameConfig.layout;
        // if(this.layout == 2) {      
        //     this.twoLineRadioImg.skin = "common/img_radio_checked.png";
        //     this.threeLineRadioImg.skin = "common/img_radio_notCheck.png";
        // }
        // else if(this.layout == 3) {
        //     this.threeLineRadioImg.skin = "common/img_radio_checked.png";
        //     this.twoLineRadioImg.skin = "common/img_radio_notCheck.png";
        // }
        // this.backgroundImg.text = HitBalloon.gameConfig.backgroundImg;
        // let text = "";
        // for(let word of HitBalloon.gameConfig.words) {
        //     if(text == "") {
        //         text = word.word + ":";
        //     }
        //     else {
        //         text += ";" + word.word + ":";
        //     }
        //     let pictures = "";
        //     for(let picture of word.pictures) {
        //         if(pictures == "") {
        //             pictures = picture;
        //         }
        //         else {
        //             pictures += "," + picture;
        //         }
        //     }
        //     text += pictures;
        // }
        // this.textInput.text = text;
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
        // if(!this.backgroundImg.text) {
        //     HitBalloon.hitBalloonMain.showTip("请输入背景图！");
        //     return;
        // }
        // let texts = this.textInput.text.split(";");
        // if(this.layout == 2 && (texts.length < 1 || texts.length > 6)) {
        //     HitBalloon.hitBalloonMain.showTip("单词个数在1-6之间！");
        //     return;
        // }
        // else if(this.layout == 3 && (texts.length < 1 || texts.length > 8)) {
        //     HitBalloon.hitBalloonMain.showTip("单词个数在1-8之间！");
        //     return;
        // }
        // let words = [];
        // let picNum = 0;
        // for(let text of texts) {
        //     let textSp = text.split(":");
        //     if(textSp.length != 2 || textSp[0] == "" || textSp[1] == "") {
        //          HitBalloon.hitBalloonMain.showTip("配置格式错误，请参考示例！");
        //         return;
        //     }
        //     let pictures = textSp[1].split(",");
        //     words.push({
        //         word: textSp[0],
        //         pictures: pictures
        //     });
        //     picNum += pictures.length;
        // }
        // if(this.layout == 2 && (picNum < 1 || picNum > 6)) {
        //     HitBalloon.hitBalloonMain.showTip("图片个数在1-6之间！");
        //     return;
        // }
        // else if(this.layout == 3 && (picNum < 1 || picNum > 10)) {
        //     HitBalloon.hitBalloonMain.showTip("图片个数在1-10之间！");
        //     return;
        // }
        // HitBalloon.gameConfig = {
        //     gameModel: false,
        //     backgroundImg: this.backgroundImg.text,
        //     layout: this.layout,
        //     words: words
        // };
        // HitBalloon.hitBalloonMain.showTip("提交成功！");
        // HitBalloon.hitBalloonMain.bg.skin = "HitBalloon/" + this.backgroundImg.text;
        // this.hide();
    };
    return FWConfigView;
}());
//# sourceMappingURL=FWConfigView.js.map
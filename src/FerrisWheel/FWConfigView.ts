// 配置界面
class FWConfigView {
    private configBox: Laya.Box; // 配置页面容器
    private questionType: string; // 问题类型
    private optionType: string; // 选项类型
    private questionFontSize: Laya.TextInput; // 问题字号输入框
    private questions: Laya.TextInput; // 问题输入框
    private options: Laya.TextInput; // 选项输入框 
    private textRadio: Laya.Label; // 问题类型文字选择项
    private wordRadio: Laya.Label; // 选项类型单词选择项
    private picRadio: Laya.Label; // 问题类型图片选择项
    private picRadio1: Laya.Label; // 选项类型图片选择项
    private textRadioImg: Laya.Image; // 问题类型文字选择项的显示选择状态的图片
    private wordRadioImg: Laya.Image; // 选项类型单词选择项的显示选择状态的图片
    private picRadioImg: Laya.Image; // 问题类型图片选择项的显示选择状态的图片
    private picRadioImg1: Laya.Image; // 选项类型图片选择项的显示选择状态的图片
    private submitBtn: Laya.Image; // 提交按钮
    private closeBtn: Laya.Text; // 关闭按钮

    constructor(configBox: Laya.Box) {
        this.configBox = configBox;
        this.hide();
        // 初始化配置页面元素
        this.questionFontSize = configBox.getChildByName("questionFontSize") as Laya.TextInput;
        this.questions = configBox.getChildByName("questions") as Laya.TextInput;
        this.options = configBox.getChildByName("options") as Laya.TextInput;
        this.textRadio = configBox.getChildByName("textRadio") as Laya.Label;
        this.wordRadio = configBox.getChildByName("wordRadio") as Laya.Label;
        this.picRadio = configBox.getChildByName("picRadio") as Laya.Label;
        this.picRadio1 = configBox.getChildByName("picRadio1") as Laya.Label;
        this.textRadioImg = configBox.getChildByName("textRadioImg") as Laya.Image;
        this.wordRadioImg = configBox.getChildByName("wordRadioImg") as Laya.Image;
        this.picRadioImg = configBox.getChildByName("picRadioImg") as Laya.Image;
        this.picRadioImg1 = configBox.getChildByName("picRadioImg1") as Laya.Image;
        this.submitBtn = configBox.getChildByName("submitBtn") as Laya.Image;
        this.closeBtn = configBox.getChildByName("closeBtn") as Laya.Text;
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
    private switchText(e: laya.events.Event) {
        e.stopPropagation();
        if(this.questionType == "picture") {
            this.questionType = "text";         
            this.textRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg.skin = "common/img_radio_notCheck.png";
        }
    }

    // 问题类型选择图片
    private switchPic(e: laya.events.Event) {
        e.stopPropagation();
        if(this.questionType == "text") {
            this.questionType = "picture";         
            this.textRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg.skin = "common/img_radio_checked.png";
        }
    }

    // 选项类型选择单词
    private switchWord(e: laya.events.Event) {
        e.stopPropagation();
        if(this.optionType == "picture") {
            this.questionType = "word";         
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg1.skin = "common/img_radio_notCheck.png";
        }
    }

    // 选项类型选择图片
    private switchPic1(e: laya.events.Event) {
        if(this.questionType == "picture") {
            this.questionType = "word";         
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg1.skin = "common/img_radio_checked.png";
        }
    }

    // 初始化
    private init() {
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
    }

    // 显示配置
    public show() {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf()
        FerrisWheel.ferrisWheelMain.addChild(this.configBox);
    }

    // 隐藏配置
    public hide() {
        this.configBox.visible = false;
    }

    // 提交配置
    private submit() {
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
    }
}
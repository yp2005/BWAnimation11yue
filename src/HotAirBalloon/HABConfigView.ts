// 配置界面
class HABConfigView {
    private configBox: Laya.Box; // 配置页面容器
    private optionType: string; // 选项类型
    private options: Laya.TextInput; // 选项输入框 
    private bg: Laya.TextInput; // 背景图输入框 
    private wordRadio: Laya.Label; // 选项类型单词选择项
    private picRadio1: Laya.Label; // 选项类型图片选择项
    private wordRadioImg: Laya.Image; // 选项类型单词选择项的显示选择状态的图片
    private picRadioImg1: Laya.Image; // 选项类型图片选择项的显示选择状态的图片
    private submitBtn: Laya.Image; // 提交按钮
    private closeBtn: Laya.Text; // 关闭按钮
    private wordLabel: Laya.Label; // 
    private picLabel: Laya.Label; // 
    private wordRemark: Laya.Text; // 
    private picRemark: Laya.Text; // 

    constructor(configBox: Laya.Box) {
        this.configBox = configBox;
        this.hide();
        // 初始化配置页面元素
        this.options = configBox.getChildByName("options") as Laya.TextInput;
        this.bg = configBox.getChildByName("bg") as Laya.TextInput;
        this.wordRadio = configBox.getChildByName("wordRadio") as Laya.Label;
        this.picRadio1 = configBox.getChildByName("picRadio1") as Laya.Label;
        this.wordRadioImg = configBox.getChildByName("wordRadioImg") as Laya.Image;
        this.picRadioImg1 = configBox.getChildByName("picRadioImg1") as Laya.Image;
        this.submitBtn = configBox.getChildByName("submitBtn") as Laya.Image;
        this.closeBtn = configBox.getChildByName("closeBtn") as Laya.Text;
        this.wordLabel = configBox.getChildByName("wordlabel") as Laya.Label;
        this.picLabel = configBox.getChildByName("piclabel") as Laya.Label;
        this.wordRemark = configBox.getChildByName("wordermark") as Laya.Text;
        this.picRemark = configBox.getChildByName("picermark") as Laya.Text;
        // 添加事件监听

        this.wordRadio.on(Laya.Event.CLICK, this, this.switchWord);
        this.wordRadioImg.on(Laya.Event.CLICK, this, this.switchWord);
        this.picRadio1.on(Laya.Event.CLICK, this, this.switchPic1);
        this.picRadioImg1.on(Laya.Event.CLICK, this, this.switchPic1);
        
        this.submitBtn.on(Laya.Event.CLICK, this, this.submit);
        this.closeBtn.on(Laya.Event.CLICK, this, this.hide);
    }

    // 选项类型选择单词
    private switchWord(e: laya.events.Event) {
        e.stopPropagation();
        if(this.optionType == "picture") {
            this.optionType = "word";         
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg1.skin = "common/img_radio_notCheck.png";
            this.wordLabel.visible = true;
            this.picLabel.visible = false;
            this.wordRemark.visible = true;
            this.picRemark.visible = false;
        }
    }

    // 选项类型选择图片
    private switchPic1(e: laya.events.Event) {
        if(this.optionType == "word") {
            this.optionType = "picture";         
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg1.skin = "common/img_radio_checked.png";
            this.wordLabel.visible = false;
            this.picLabel.visible = true;
            this.wordRemark.visible = false;
            this.picRemark.visible = true;
        }
    }

    // 初始化
    private init() {
        this.optionType = HotAirBalloon.gameConfig.optionType;
        if(this.optionType == "word") {      
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg1.skin = "common/img_radio_notCheck.png";
            this.wordLabel.visible = true;
            this.picLabel.visible = false;
            this.wordRemark.visible = true;
            this.picRemark.visible = false;
        }
        else {
            this.picRadioImg1.skin = "common/img_radio_checked.png";
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.wordLabel.visible = false;
            this.picLabel.visible = true;
            this.wordRemark.visible = false;
            this.picRemark.visible = true;
        }

        // 初始化选项内容
        let optionText = "";
        for(let option of HotAirBalloon.gameConfig.options) {
            if(optionText == "") {
                optionText = option;
            }
            else {
                optionText += "," + option;
            }
        }
        this.options.text = optionText;
        this.bg.text = HotAirBalloon.gameConfig.bg;
    }

    // 显示配置
    public show() {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf()
        HotAirBalloon.hotAirBalloonMain.addChild(this.configBox);
    }

    // 隐藏配置
    public hide() {
        this.configBox.visible = false;
    }

    // 提交配置
    private submit() {
        if(!this.bg.text) {
            HotAirBalloon.hotAirBalloonMain.showTip("请输入背景图！");
            return;
        }
        if(!this.options.text) {
            HotAirBalloon.hotAirBalloonMain.showTip("请输入选项！");
            return;
        }
        let options: string[] = this.options.text.split(",");
        if(options.length < 1 || options.length > 10) {
            HotAirBalloon.hotAirBalloonMain.showTip("数量在1-10之间！");
            return;
        }

        let isEmpty = false;
        for(let option of options) {
            if(option == "") {
                isEmpty = true;
                break;
            }
        }
        if(isEmpty) {
            HotAirBalloon.hotAirBalloonMain.showTip("单词或者图片名不能存在空字符串！");
            return;
        }

        HotAirBalloon.gameConfig = {
            gameModel: false,
            optionType: this.optionType,
            options: options,
            bg: this.bg.text
        };
        HotAirBalloon.hotAirBalloonMain.showTip("提交成功！");
        this.hide();
        HotAirBalloon.hotAirBalloonMain.restart();
    }
}
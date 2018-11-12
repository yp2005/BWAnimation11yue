// 配置界面
class FWConfigView {
    private configBox: Laya.Box; // 配置页面容器
    private questionType: string; // 问题类型
    private questionFontSize: Laya.TextInput; // 问题字号输入框
    private questions: Laya.TextInput; // 问题输入框
    private options: Laya.TextInput; // 选项输入框 
    private textRadio: Laya.Label; // 问题类型文字选择项
    private picRadio: Laya.Label; // 问题类型图片选择项
    private textRadioImg: Laya.Image; // 问题类型文字选择项的显示选择状态的图片
    private picRadioImg: Laya.Image; // 问题类型图片选择项的显示选择状态的图片
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
        this.picRadio = configBox.getChildByName("picRadio") as Laya.Label;
        this.textRadioImg = configBox.getChildByName("textRadioImg") as Laya.Image;
        this.picRadioImg = configBox.getChildByName("picRadioImg") as Laya.Image;
        this.submitBtn = configBox.getChildByName("submitBtn") as Laya.Image;
        this.closeBtn = configBox.getChildByName("closeBtn") as Laya.Text;
        // 添加事件监听
        this.textRadio.on(Laya.Event.CLICK, this, this.switchText);
        this.textRadioImg.on(Laya.Event.CLICK, this, this.switchText);
        this.picRadio.on(Laya.Event.CLICK, this, this.switchPic);
        this.picRadioImg.on(Laya.Event.CLICK, this, this.switchPic);
        
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

    // 初始化
    private init() {
        this.questionType = FerrisWheel.gameConfig.questionType;
        if(this.questionType == "text") {      
            this.textRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg.skin = "common/img_radio_notCheck.png";
        }
        else {
            this.picRadioImg.skin = "common/img_radio_checked.png";
            this.textRadioImg.skin = "common/img_radio_notCheck.png";
        }
        this.questionFontSize.text = FerrisWheel.gameConfig.questionFontSize;
        // 初始化问题内容
        let questionText = "";
        for(let question of FerrisWheel.gameConfig.questions) {
            let qt = question.question.replace(/\n/g, "<br>");
            if(questionText == "") {
                questionText = qt + "==";
            }
            else {
                questionText += "@@" + qt + "==";
            }
            let answers = "";
            for(let a of question.answer) {
                if(answers == "") {
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
        let optionText = "";
        for(let option of FerrisWheel.gameConfig.options) {
            if(optionText == "") {
                optionText = option;
            }
            else {
                optionText += "," + option;
            }
        }
        this.options.text = optionText;
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
        if(!this.questionFontSize.text) {
            FerrisWheel.ferrisWheelMain.showTip("请输入问题字号！");
            return;
        }
        if(!this.questions.text) {
            FerrisWheel.ferrisWheelMain.showTip("请输入问题！");
            return;
        }
        if(!this.options.text) {
            FerrisWheel.ferrisWheelMain.showTip("请输入选项！");
            return;
        }
        let options: string[] = this.options.text.split(",");
        if(options.length < 4 || options.length > 10) {
            FerrisWheel.ferrisWheelMain.showTip("选项数量在4-10之间！");
            return;
        }
        let questionTexts: string[] = this.questions.text.split("@@");
        let questions = [];
        for(let questionText of questionTexts) {
            let questionTextSp = questionText.split("==");
            if(questionTextSp.length != 2 || questionTextSp[0] == "" || questionTextSp[1] == "") {
                 FerrisWheel.ferrisWheelMain.showTip("问题配置格式错误，请参考示例！");
                return;
            }
            let answers = questionTextSp[1].split(",");
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
            options: options
        };
        FerrisWheel.ferrisWheelMain.showTip("提交成功！");
        this.hide();
        FerrisWheel.ferrisWheelMain.restart();
    }
}
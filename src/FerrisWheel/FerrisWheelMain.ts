// 游戏主界面
class FerrisWheelMain extends ui.FerrisWheelUI {
    private configView: FWConfigView; // 配置页
    private options: Card[] = new Array<Card>(); // 选项卡
    public questions: any[]; // 问题
    public curQuestionIndex: number = 0; // 当前问题序号
    public answeredNumber: number = 0; // 当前问题已答对选项数量
    private curFrame: Laya.Box; // 当前使用的摩天轮架子
    public turnPause: boolean = false; // 摩天轮是否暂停转动
    private questionPic: Laya.Image = null;
    constructor() {
        super(); 
        this.configView = new FWConfigView(this.configBox);
        this.tip.visible = false;
        this.setting.on(Laya.Event.CLICK, this, this.showConfigView)
        if(FerrisWheel.gameConfig.gameModel) {
            this.setting.visible = false;    
        }
        this.init();
        // 摩天轮转动
        Laya.timer.frameLoop(5, this, this.animate);
    }

    // 初始化
    private init() {
        // replay按钮初始化
        this.replayAble.visible = false;
        // 选项卡初始化
        this.questions = FerrisWheel.gameConfig.questions;
        let optionType: string = FerrisWheel.gameConfig.optionType;
        let options: string[] = FerrisWheel.gameConfig.options; 
        this.curFrame = this["frame" + options.length];
        for(let i: number = 0; i < options.length; i++) {
            let card = new Card(optionType, options[i], i + 1);
            this.curFrame.addChild(card);
            let pole: Laya.Image = this.curFrame.getChildByName("pole" + (i+ 1)) as Laya.Image;
            card.pivotX = 69;
            card.pivotY = 54;
            card.x = pole.x;
            card.y = pole.y;
            this.options.push(card);
        }
        this.curFrame.visible = true;
        // 问题牌初始化
        if(FerrisWheel.gameConfig.questionType == "text") {
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
    }

    private nextQuestion() {
        this.nextAble.visible = false;
        this.curQuestionIndex++;
        if(FerrisWheel.gameConfig.questionType == "text") {
            this.question.text = this.questions[this.curQuestionIndex].question;
        }
        else {
            this.questionPic.skin = "FerrisWheel/" + this.questions[this.curQuestionIndex].question;
        }
        this.next.off(Laya.Event.CLICK, this, this.nextQuestion);
        this.turnPause = false;
        this.answeredNumber = 0;
        this.resetCard();
    }

    private resetCard() {
        for(let option of this.options) {
            option.scale(1, 1);
        } 
    }

    public answerRight() {
        Laya.SoundManager.playSound("res/audio/ferris-wheel-right.mp3", 1);
        this.turnPause = true;
        if(this.curQuestionIndex + 1 < this.questions.length) {
            this.next.on(Laya.Event.CLICK, this, this.nextQuestion);
            this.nextAble.visible = true;
        }
        else {
            this.replayAble.visible = true;
            this.replay.on(Laya.Event.CLICK, this, this.restart);
        }  
    }

     // 显示提示
    public showTip(text: string) {
        this.tip.text = text;
        this.tip.visible = true;
        this.tip.removeSelf();
        this.addChild(this.tip);
        Laya.timer.once(1500, this, this.hideTip);
    }

    private hideTip() {
        this.tip.visible = false;
    }

    // 显示游戏配置页面 
    private showConfigView() {
        this.configView.show();
    }

    // 设置设置按钮是否显示
    public showSetting(state: boolean) {
        if(!FerrisWheel.gameConfig.gameModel) {
            this.setting.visible = state;
        }
    }

    // 重新开始游戏
    public restart() {
        if(this.questionPic != null) {
            this.brand.removeChild(this.questionPic);
            this.questionPic.destroy();
            this.questionPic = null;
        }
        for(let option of this.options) {
            this.curFrame.removeChild(option);
            option.destroy(true);
        }
        this.options = new Array<Card>();

        // 初始化选项卡
        let options: string[] = new Array<string>(); 
        let optionType: string = FerrisWheel.gameConfig.optionType;
        this.curFrame.visible = false;
        this.curFrame = this["frame" + FerrisWheel.gameConfig.options.length];
        let indexes: number[] = new Array<number>();
        for(let i = 0; i < FerrisWheel.gameConfig.options.length; i++) {
            indexes.push(i);
        }
        for(let j = 0; j < FerrisWheel.gameConfig.options.length; j++) { // 打乱选项顺序
            let i: number = Math.floor(Math.random() * indexes.length); // 随机一个选项
            let index = indexes[i];
            indexes.splice(i, 1);
            options.push(FerrisWheel.gameConfig.options[index]);
        }
        for(let i: number = 0; i < options.length; i++) {
            let card = new Card(optionType, options[i], i + 1);
            this.curFrame.addChild(card);
            let pole: Laya.Image = this.curFrame.getChildByName("pole" + (i+ 1)) as Laya.Image;
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
        this.questions = new Array<any>();
        indexes = new Array<number>();
        for(let i = 0; i < FerrisWheel.gameConfig.questions.length; i++) {
            indexes.push(i);
        }

        for(let j = 0; j < FerrisWheel.gameConfig.questions.length; j++) { // 打乱问题顺序
            let i: number = Math.floor(Math.random() * indexes.length); // 随机一个问题
            let index = indexes[i];
            indexes.splice(i, 1);
            this.questions.push(FerrisWheel.gameConfig.questions[index]);
        }
        if(FerrisWheel.gameConfig.questionType == "text") {
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
    }

    private animate(e: Event): void {
        if(!this.turnPause) {
            this.curFrame.rotation += 1;
            for(let option of this.options) {
                option.rotation -= 1;
            } 
        }      
    }
}
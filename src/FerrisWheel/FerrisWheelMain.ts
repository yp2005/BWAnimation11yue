// 游戏主界面
class FerrisWheelMain extends ui.FerrisWheelUI {
    private configView: FWConfigView; // 配置页
    private options: Card[] = new Array<Card>(); // 选项卡
    public questions: any[]; // 问题
    public curQuestionIndex: number = 0; // 当前问题序号
    public answeredNumber: number = 0; // 当前问题已答对选项数量
    public turnPause: boolean = false; // 摩天轮是否暂停转动
    private questionPic: Laya.Image = null; // 问题图片，问题类型为图片时使用

    constructor() {
        super(); 
        this.configView = new FWConfigView(this.configBox);
        this.tip.visible = false;
        this.setting.on(Laya.Event.CLICK, this, this.showConfigView);
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
        let options: string[] = FerrisWheel.gameConfig.options; 
        this.initFrame(options.length); // 初始化摩天轮架子
        for(let i: number = 0; i < options.length; i++) {
            let card = new Card(options[i], i + 1);
            this.fwframe.addChild(card);
            let pole: Laya.Image = this.fwframe.getChildByName("pole" + (i+ 1)) as Laya.Image;
            card.pivotX = 69;
            card.pivotY = 54;
            card.x = pole.x;
            card.y = pole.y;
            this.options.push(card);
        }
        // 问题牌初始化
        if(FerrisWheel.gameConfig.questionType == "text") {
            this.question.visible = true;
            this.question.fontSize = FerrisWheel.gameConfig.questionFontSize;
            this.question.text = this.questions[0].question;
            this.question.height = this.question.text.split("\n").length * (this.question.fontSize + 5) + 5;
            this.question.y = 25 + (150 - this.question.height) / 2;
        }
        else {
            this.question.visible = false;
            this.questionPic = new Laya.Image();
            this.questionPic.skin = "FerrisWheel/question-pic/" + this.questions[0].question;
            this.brand.addChild(this.questionPic);
            this.questionPic.x = 25;
            this.questionPic.y = 25 + (150 - this.questionPic.height) / 2;
        }
        this.next.on(Laya.Event.MOUSE_UP, this, function() {
            Laya.timer.once(100, this, function() {
                if(this.curQuestionIndex + 1 < this.questions.length) {
                    this.nextAble.visible = true;
                }
                
            });
        });
        if(this.curQuestionIndex + 1 < this.questions.length) { // 问题没答完，下一个问题按钮亮起
            this.nextAble.visible = true;
            this.next.on(Laya.Event.MOUSE_DOWN, this, this.nextQuestion);
        }
        else { // 全部问题完成，replay按钮亮起
            this.replayAble.visible = true;
            this.replay.on(Laya.Event.CLICK, this, this.restart);
        }  
    }

    // 初始化摩天轮架子
    private initFrame(optionSize: number) {
        let initX = 3;
        let initY = 287;
        let R: number = 264;
        let angle: number = 360 / optionSize; // 根据选项数量均分摩天轮
        for(let i: number = 0; i < optionSize; i++) {
            let pole: Laya.Image = new Laya.Image();
            pole.name = "pole" + (i+ 1);
            pole.skin = "FerrisWheel/pole.png";
            this.fwframe.addChild(pole);
            pole.pivot(0, 7);
            pole.rotation = i * angle;
            let radian: number; // 弧度
            
            // 将每个杆子放在摩天轮适当的位置
            if(pole.rotation <= 90) {
                radian = Math.PI / 180 * pole.rotation;
                pole.x = initX + R - R * Math.cos(radian);
                pole.y = initY - R * Math.sin(radian);
            }
            else if(pole.rotation > 90 && pole.rotation <= 180) {
                radian = Math.PI / 180 * (180 - pole.rotation); // 使用小于90度的角度的弧度，保证计算逻辑一致性
                pole.x = initX + R + R * Math.cos(radian);
                pole.y = initY - R * Math.sin(radian);
            }
            else if(pole.rotation > 180 && pole.rotation <= 270) {
                radian = Math.PI / 180 * (pole.rotation - 180); // 使用小于90度的角度的弧度，保证计算逻辑一致性
                pole.x = initX + R + R * Math.cos(radian);
                pole.y = initY + R * Math.sin(radian);
            }
            else if(pole.rotation > 270) {
                radian = Math.PI / 180 * (360 - pole.rotation); // 使用小于90度的角度的弧度，保证计算逻辑一致性
                pole.x = initX + R - R * Math.cos(radian);
                pole.y = initY + R * Math.sin(radian);
            } 
        }
    }

    // 进入下一个问题
    private nextQuestion() {
        this.nextAble.visible = false;
        this.next.off(Laya.Event.MOUSE_DOWN, this, this.nextQuestion);
        this.curQuestionIndex++;
        if(FerrisWheel.gameConfig.questionType == "text") {
            this.question.text = this.questions[this.curQuestionIndex].question;
            this.question.height = this.question.text.split("\n").length * (this.question.fontSize + 5) + 5;
            this.question.y = 25 + (150 - this.question.height) / 2;
        }
        else {
            this.brand.removeChild(this.questionPic);
            this.questionPic.destroy();
            this.questionPic = null;
            this.questionPic = new Laya.Image();
            this.questionPic.skin = "FerrisWheel/question-pic/" + this.questions[this.curQuestionIndex].question;
            this.brand.addChild(this.questionPic);
            this.questionPic.x = 25;
            this.questionPic.y = 25 + (150 - this.questionPic.height) / 2;
        }
        this.turnPause = false;
        this.answeredNumber = 0;
        this.resetCard();
        if(this.curQuestionIndex + 1 >= this.questions.length) { // 问题答完, replay按钮两期
            this.replayAble.visible = true;
            this.replay.on(Laya.Event.CLICK, this, this.restart);
        }
        else {
            this.next.on(Laya.Event.MOUSE_DOWN, this, this.nextQuestion);
        }
    }

    // 选项卡恢复原大小
    private resetCard() {
        for(let option of this.options) {
            option.scale(1, 1);
        } 
    }

    // 回答问题正确的处理
    public answerRight() {
        // 播放正确提示音
        Laya.SoundManager.playSound("res/audio/ferris-wheel-right.mp3", 1);
        // 摩天轮暂停转动
        this.turnPause = true;
    }

     // 显示提示
    public showTip(text: string) {
        this.tip.text = text;
        this.tip.visible = true;
        this.tip.removeSelf();
        this.addChild(this.tip);
        Laya.timer.once(1500, this, this.hideTip);
    }

    // 隐藏提示
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
        // 将上一轮游戏的各个元素全部删除
        if(this.questionPic != null) {
            this.brand.removeChild(this.questionPic);
            this.questionPic.destroy();
            this.questionPic = null;
        }
        for(let i: number = 0; i < this.options.length; i++) {
            this.fwframe.removeChild(this.options[i]);
            this.options[i].destroy(true);
            let pole: Laya.Image = this.fwframe.getChildByName("pole" + (i+ 1)) as Laya.Image;
            this.fwframe.removeChild(pole);
            pole.destroy(true);
        }
        this.options = new Array<Card>();

        // 初始化选项卡
        let options: string[] = new Array<string>(); 
        this.initFrame(FerrisWheel.gameConfig.options.length);
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
            let card = new Card(options[i], i + 1);
            this.fwframe.addChild(card);
            let pole: Laya.Image = this.fwframe.getChildByName("pole" + (i+ 1)) as Laya.Image;
            card.pivotX = 69;
            card.pivotY = 54;
            card.x = pole.x;
            card.y = pole.y;
            this.options.push(card);
            card.rotation = 0;
        }
        this.fwframe.rotation = 0;

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
            this.question.height = this.question.text.split("\n").length * (this.question.fontSize + 5) + 5;
            this.question.y = 25 + (150 - this.question.height) / 2;
        }
        else {
            this.question.visible = false;
            this.questionPic = new Laya.Image();
            this.questionPic.skin = "FerrisWheel/question-pic/" + this.questions[0].question;
            this.brand.addChild(this.questionPic);
            this.questionPic.x = 25;
            this.questionPic.y = 25 + (150 - this.questionPic.height) / 2;
        }

        // 其他参数设置
        this.curQuestionIndex = 0;
        this.answeredNumber = 0;
        this.turnPause = false;
        this.replayAble.visible = false;
        this.replay.off(Laya.Event.CLICK, this, this.restart);
        if(this.curQuestionIndex + 1 < this.questions.length) { // 问题没答完，下一个问题按钮亮起
            this.nextAble.visible = true;
            this.next.on(Laya.Event.MOUSE_DOWN, this, this.nextQuestion);
        }
        else { // 全部问题完成，replay按钮亮起
            this.nextAble.visible = false;
            this.next.off(Laya.Event.MOUSE_DOWN, this, this.nextQuestion);
            this.replayAble.visible = true;
            this.replay.on(Laya.Event.CLICK, this, this.restart);
        } 
    }

    // 摩天轮转动
    private animate(e: Event): void {
        if(!this.turnPause) {
            this.fwframe.rotation += 1;
            for(let option of this.options) {
                option.rotation -= 1;
            } 
        }      
    }
}
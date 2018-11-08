// 选项卡
class Card extends ui.CardUI {
    private type: string; // 选项卡类型 word、picture
    private content: string; // 单词或者图片名
    private initX: number; // 选项卡初始X值
    constructor(type: string, content: string, number: number) {
        super();
        this.type = type;
        this.content = content;
        if(type == "word") { // 单词
            this.card.visible = true;
            this.text.visible = true;
            this.cardPic.visible = false;
            this.card.skin = "FerrisWheel/card/" + number + ".png";
            this.text.text = content;
        }
        else { // 图片
            this.card.visible = false;
            this.text.visible = false;
            this.cardPic.visible = true;
            this.cardPic.skin = "FerrisWheel/card-pic/" + content;
        }
        this.on(Laya.Event.CLICK, this, this.ontouch);
    }

    // 点击选项卡
    private ontouch() {
        if(FerrisWheel.ferrisWheelMain.turnPause) {
            return;
        }
        let answer: string[] = FerrisWheel.ferrisWheelMain.questions[FerrisWheel.ferrisWheelMain.curQuestionIndex].answer;
        let right: boolean = false;
        for(let a of answer) {
            if(this.content == a) {
                this.scale(1.3, 1.3);
                FerrisWheel.ferrisWheelMain.answeredNumber++;
                if(FerrisWheel.ferrisWheelMain.answeredNumber == answer.length) {
                    FerrisWheel.ferrisWheelMain.answerRight();
                }
                right = true;
                break;
            }
        }
        if(!right) { // 回答不正确播放错误音效，抖动
            this.initX = this.x;
            this.off(Laya.Event.CLICK, this, this.ontouch);
            Laya.SoundManager.playSound("res/audio/ferris-wheel-wrong.mp3", 1);
            // 抖动
            Laya.Tween.to(this, {x: this.initX - 15}, 50, null, Laya.Handler.create(this, function() {
                Laya.Tween.to(this, {x: this.initX}, 50, null, Laya.Handler.create(this, function() {
                    Laya.Tween.to(this, {x: this.initX - 15}, 50, null, Laya.Handler.create(this, function() {
                        Laya.Tween.to(this, {x: this.initX}, 50, null, Laya.Handler.create(this, function() {
                            Laya.Tween.to(this, {x: this.initX - 15},50, null, Laya.Handler.create(this, function() {
                                Laya.Tween.to(this, {x: this.initX}, 50, null, Laya.Handler.create(this, function() {
                                    this.on(Laya.Event.CLICK, this, this.ontouch);
                                }));
                            }));
                        }));
                    }));
                }));
            }));
        }
    }
}
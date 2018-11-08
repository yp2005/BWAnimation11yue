// 摩天轮
import Stage = Laya.Stage;
import WebGL   = Laya.WebGL;
import Sprite = Laya.Sprite;
class FerrisWheel {
    public static ferrisWheelMain: FerrisWheelMain; // 主界面
    public static gameConfig: any; // 游戏配置
    
    constructor(config: any)
    {
        // 如果没有传入配置，使用默认配置
        if(!config) {
            config = {
                gameModel: false, // 是否游戏模式，游戏模式不显示配置按钮
                questionType: "text", // 问题类型 text 文字，picture 图片
                questionFontSize: 30, // 问题字体大小
                questions: [{
                    question: "Sky is beautiful，\nit's color is ____.",
                    answer: ["blue"]
                }, {
                    question: "Autumn is coming，\nleaf get ____.",
                    answer: ["yellow"]
                }],
                optionType: "word", // 选项类型 word 单词，picture 图片
                options: ["blue", "orange", "green", "yellow"] // 选项
            };
        }
        FerrisWheel.gameConfig = config;

        // 初始化舞台设置
		Laya.init(1024, 768);
		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;
		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#ffffff";
        
        // 加载游戏资源
        let resArray: any[] = [
            {url: "res/atlas/common.atlas", type: Laya.Loader.ATLAS},
            {url: "res/atlas/FerrisWheel.atlas", type: Laya.Loader.ATLAS},
            {url: "res/atlas/FerrisWheel/card-pic.atlas", type: Laya.Loader.ATLAS},
            {url: "res/atlas/FerrisWheel/card.atlas", type: Laya.Loader.ATLAS},
            {url: "res/atlas/FerrisWheel/question-pic.atlas", type: Laya.Loader.ATLAS},
            {url: "FerrisWheel/bg.png", type: Laya.Loader.IMAGE},
            {url: "template/Text/TextBox.png", type: Laya.Loader.IMAGE},
            {url: "template/ButtonTab/btn_LargeTabButton_Middle.png", type: Laya.Loader.IMAGE}
        ];
        
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));     
    }

    // 游戏资源加载完成进行游戏初始化设置
    private onload() {
        FerrisWheel.ferrisWheelMain = new FerrisWheelMain();
        Laya.stage.addChild(FerrisWheel.ferrisWheelMain);
    }
}

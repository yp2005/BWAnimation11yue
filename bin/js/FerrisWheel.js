// 摩天轮
var Stage = Laya.Stage;
var WebGL = Laya.WebGL;
var Sprite = Laya.Sprite;
var FerrisWheel = /** @class */ (function () {
    function FerrisWheel(config) {
        // 如果没有传入配置，使用默认配置
        if (!config) {
            config = {
                gameModel: false,
                questionType: "text",
                questionFontSize: 30,
                questions: [{
                        question: "Sky is beautiful，\nit's color is ____.",
                        answer: ["blue"]
                    }, {
                        question: "Autumn is coming，\nleaf get ____.",
                        answer: ["yellow"]
                    }],
                optionType: "word",
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
        var resArray = [
            { url: "res/atlas/common.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/FerrisWheel.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/FerrisWheel/card-pic.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/FerrisWheel/card.atlas", type: Laya.Loader.ATLAS },
            { url: "FerrisWheel/bg.png", type: Laya.Loader.IMAGE },
            { url: "template/Text/TextBox.png", type: Laya.Loader.IMAGE },
            { url: "template/ButtonTab/btn_LargeTabButton_Middle.png", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));
    }
    // 游戏资源加载完成进行游戏初始化设置
    FerrisWheel.prototype.onload = function () {
        FerrisWheel.ferrisWheelMain = new FerrisWheelMain();
        Laya.stage.addChild(FerrisWheel.ferrisWheelMain);
    };
    return FerrisWheel;
}());
//# sourceMappingURL=FerrisWheel.js.map
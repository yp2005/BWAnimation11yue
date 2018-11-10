// 砸蛋游戏
var Stage = Laya.Stage;
var WebGL = Laya.WebGL;
var Sprite = Laya.Sprite;
var HotAirBalloon = /** @class */ (function () {
    function HotAirBalloon(config) {
        // 如果没有传入配置，使用默认配置
        if (!config) {
            config = {
                gameModel: false,
                optionType: "word",
                options: ["blue", "orange", "green", "yellow"],
                bg: "bg.png"
            };
        }
        HotAirBalloon.gameConfig = config;
        // 初始化舞台设置
        Laya.init(1024, 768, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#000000";
        // 加载游戏资源
        var resArray = [
            { url: "res/atlas/common.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/HotAirBalloon.atlas", type: Laya.Loader.ATLAS },
            { url: "HotAirBalloon/bg.png", type: Laya.Loader.IMAGE },
            { url: "template/Text/TextBox.png", type: Laya.Loader.IMAGE },
            { url: "template/ButtonTab/btn_LargeTabButton_Middle.png", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));
    }
    // 游戏资源加载完成进行游戏初始化设置
    HotAirBalloon.prototype.onload = function () {
        var text = new Laya.Text();
        text.text = "fffff";
        text.font = "ff";
        // ff字体加载完再加载主页面
        Laya.timer.once(100, this, function () {
            HotAirBalloon.hotAirBalloonMain = new HotAirBalloonMain();
            Laya.stage.addChild(HotAirBalloon.hotAirBalloonMain);
        });
    };
    return HotAirBalloon;
}());
//# sourceMappingURL=HotAirBalloon.js.map
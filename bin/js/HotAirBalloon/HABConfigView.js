// 配置界面
var HABConfigView = /** @class */ (function () {
    function HABConfigView(configBox) {
        this.configBox = configBox;
        this.hide();
        // 初始化配置页面元素
        this.options = configBox.getChildByName("options");
        this.bg = configBox.getChildByName("bg");
        this.wordRadio = configBox.getChildByName("wordRadio");
        this.picRadio1 = configBox.getChildByName("picRadio1");
        this.wordRadioImg = configBox.getChildByName("wordRadioImg");
        this.picRadioImg1 = configBox.getChildByName("picRadioImg1");
        this.submitBtn = configBox.getChildByName("submitBtn");
        this.closeBtn = configBox.getChildByName("closeBtn");
        this.wordLabel = configBox.getChildByName("wordlabel");
        this.picLabel = configBox.getChildByName("piclabel");
        this.wordRemark = configBox.getChildByName("wordremark");
        this.picRemark = configBox.getChildByName("picremark");
        // 添加事件监听
        this.wordRadio.on(Laya.Event.CLICK, this, this.switchWord);
        this.wordRadioImg.on(Laya.Event.CLICK, this, this.switchWord);
        this.picRadio1.on(Laya.Event.CLICK, this, this.switchPic1);
        this.picRadioImg1.on(Laya.Event.CLICK, this, this.switchPic1);
        this.submitBtn.on(Laya.Event.CLICK, this, this.submit);
        this.closeBtn.on(Laya.Event.CLICK, this, this.hide);
    }
    // 选项类型选择单词
    HABConfigView.prototype.switchWord = function (e) {
        e.stopPropagation();
        if (this.optionType == "picture") {
            this.optionType = "word";
            this.wordRadioImg.skin = "common/img_radio_checked.png";
            this.picRadioImg1.skin = "common/img_radio_notCheck.png";
            this.wordLabel.visible = true;
            this.picLabel.visible = false;
            this.wordRemark.visible = true;
            this.picRemark.visible = false;
        }
    };
    // 选项类型选择图片
    HABConfigView.prototype.switchPic1 = function (e) {
        if (this.optionType == "word") {
            this.optionType = "picture";
            this.wordRadioImg.skin = "common/img_radio_notCheck.png";
            this.picRadioImg1.skin = "common/img_radio_checked.png";
            this.wordLabel.visible = false;
            this.picLabel.visible = true;
            this.wordRemark.visible = false;
            this.picRemark.visible = true;
        }
    };
    // 初始化
    HABConfigView.prototype.init = function () {
        this.optionType = HotAirBalloon.gameConfig.optionType;
        if (this.optionType == "word") {
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
        var optionText = "";
        for (var _i = 0, _a = HotAirBalloon.gameConfig.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (optionText == "") {
                optionText = option;
            }
            else {
                optionText += "," + option;
            }
        }
        this.options.text = optionText;
        this.bg.text = HotAirBalloon.gameConfig.bg;
    };
    // 显示配置
    HABConfigView.prototype.show = function () {
        this.init();
        this.configBox.visible = true;
        this.configBox.removeSelf();
        HotAirBalloon.hotAirBalloonMain.addChild(this.configBox);
    };
    // 隐藏配置
    HABConfigView.prototype.hide = function () {
        this.configBox.visible = false;
    };
    // 提交配置
    HABConfigView.prototype.submit = function () {
        if (!this.bg.text) {
            HotAirBalloon.hotAirBalloonMain.showTip("请输入背景图！");
            return;
        }
        if (!this.options.text) {
            HotAirBalloon.hotAirBalloonMain.showTip("请输入选项！");
            return;
        }
        var options = this.options.text.split(",");
        if (options.length < 1 || options.length > 10) {
            HotAirBalloon.hotAirBalloonMain.showTip("数量在1-10之间！");
            return;
        }
        var isEmpty = false;
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            if (option == "") {
                isEmpty = true;
                break;
            }
        }
        if (isEmpty) {
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
    };
    return HABConfigView;
}());
//# sourceMappingURL=HABConfigView.js.map
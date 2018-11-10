// 程序入口，本工程仅用于切换各个动画进行测试
// 游戏名称，修改这个变量值来切换不同游戏，ferrisWheel：摩天轮
var gameName = "hotairballoon";
if (gameName == "ferrisWheel") {
    // 摩天轮
    var config = {
        gameModel: false,
        questionType: "text",
        questionFontSize: 30,
        questions: [{
                question: "Sky is beautiful，\nit's color is ____.",
                answer: ["blue"]
            }, {
                question: "Autumn is coming，\nleaf get ____.",
                answer: ["yellow"]
            }, {
                question: "Orange is delicious，\ncolor is ____.",
                answer: ["orange"]
            }],
        // questions: [{ // 问题类型为图片 选项类型为图片的例子
        //     question: "1.png",
        //     answer: ["slow.png", "careful.png"]
        // }, {
        //     question: "2.png",
        //     answer: ["easy.png"]
        // }, {
        //     question: "3.png",
        //     answer: ["boring.png"]
        // }],
        optionType: "word",
        options: ["blue", "orange", "green", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"] // 选项
        // options: ["boring.png", "careful.png", "easy.png", "slow.png"] // 选项
    };
    new FerrisWheel(config);
}
else if (gameName == "hotairballoon") {
    // 热气球
    var config = {
        gameModel: false,
        optionType: "word",
        // options: ["blue", "orange", "green", "yellow"],
        options: ["blue", "orange", "green", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
        // options: ["boring.png", "careful.png", "easy.png", "slow.png"], // 选项
        bg: "bg.png"
    };
    new HotAirBalloon(config);
}
//# sourceMappingURL=Index.js.map
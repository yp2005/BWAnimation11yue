// 程序入口，本工程仅用于切换各个动画进行测试
// 游戏名称，修改这个变量值来切换不同游戏，ferrisWheel：摩天轮 hotairballoon：热气球
var gameName = "ferrisWheel";
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
                question: "I do not like riding，\nit is ____.",
                answer: ["boring.png"]
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
        options: ["blue", "orange", "green", "yellow", "boring.png"] // 选项
        // options: ["boring.png", "careful.png", "easy.png", "slow.png"] // 选项
    };
    new FerrisWheel(config);
}
else if (gameName == "hotairballoon") {
    // 热气球
    var config = {
        gameModel: false,
        optionType: "word",
        // options: ["bag", "car", "cat", "rain"],
        options: ["bag", "car", "cat", "rain", "farmer", "market", "snake", "taking", "today"],
        // options: ["bag.png", "car.png", "cat.png"], // 选项
        bg: "bg.png"
    };
    new HotAirBalloon(config);
}
//# sourceMappingURL=Index.js.map
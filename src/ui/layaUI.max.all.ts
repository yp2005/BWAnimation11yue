
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BalloonUI extends View {
		public textBg:Laya.Image;
		public pic:Laya.Image;
		public text:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":153,"pivotY":0,"pivotX":0,"height":222},"child":[{"type":"Image","props":{"var":"textBg","skin":"HotAirBalloon/1.png"}},{"type":"Image","props":{"y":54,"x":69,"var":"pic","skin":"HotAirBalloon/1.png","pivotY":54,"pivotX":69}},{"type":"Text","props":{"y":54,"x":2,"width":150,"var":"text","valign":"middle","text":"text","height":47,"fontSize":40,"font":"FF","color":"#333333","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.BalloonUI.uiView);

        }

    }
}

module ui {
    export class CardUI extends View {
		public card:Laya.Image;
		public cardPic:Laya.Image;
		public text:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":138,"height":108},"child":[{"type":"Image","props":{"y":54,"x":69,"var":"card","skin":"FerrisWheel/card/1.png","pivotY":54,"pivotX":69}},{"type":"Image","props":{"y":54,"x":69,"var":"cardPic","skin":"FerrisWheel/card-pic/boring.png","pivotY":54,"pivotX":69}},{"type":"Text","props":{"y":48,"x":2,"width":138,"var":"text","valign":"middle","text":"text","height":57,"fontSize":35,"font":"FF","color":"#333333","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.CardUI.uiView);

        }

    }
}

module ui {
    export class FerrisWheelUI extends View {
		public fwframe:Laya.Box;
		public brand:Laya.Image;
		public next:Laya.Box;
		public nextAble:Laya.Image;
		public question:laya.display.Text;
		public replay:Laya.Box;
		public replayAble:Laya.Image;
		public setting:Laya.Image;
		public configBox:Laya.Box;
		public tip:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":1024,"height":768},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"FerrisWheel/bg.png"}},{"type":"Box","props":{"y":349,"x":649,"width":535,"visible":true,"var":"fwframe","rotation":0,"pivotY":287,"pivotX":267,"height":564}},{"type":"Image","props":{"y":531,"x":0,"var":"brand","skin":"FerrisWheel/牌子.png"}},{"type":"Box","props":{"y":645,"x":249,"var":"next"},"child":[{"type":"Image","props":{"skin":"FerrisWheel/箭头-1.png"}},{"type":"Image","props":{"var":"nextAble","skin":"FerrisWheel/箭头-2.png"}}]},{"type":"Text","props":{"y":583,"x":36,"width":267,"var":"question","leading":5,"height":75,"fontSize":30,"font":"FF","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":690,"x":850,"var":"replay"},"child":[{"type":"Image","props":{"skin":"common/replay-disabled.png"}},{"type":"Image","props":{"var":"replayAble","skin":"common/replay-abled.png"}}]},{"type":"Image","props":{"y":26,"x":31,"width":30,"var":"setting","skin":"common/setting.png","height":30}},{"type":"Box","props":{"y":119,"x":575,"width":985,"var":"configBox","pivotY":100,"pivotX":554,"height":498},"child":[{"type":"Image","props":{"y":9,"x":463,"width":522,"skin":"common/configBG.png","sizeGrid":"20,10,20,10","height":477,"alpha":1}},{"type":"Button","props":{"y":401,"x":645,"width":86,"skin":"template/ButtonTab/btn_LargeTabButton_Middle.png","name":"submitBtn","labelSize":20,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"提交","height":32}},{"type":"Text","props":{"y":7,"x":947,"width":40,"text":"+","rotation":45,"pivotY":-1,"pivotX":-10,"name":"closeBtn","height":40,"fontSize":40,"color":"#5d5454","bold":false,"align":"center"}},{"type":"Text","props":{"y":343,"x":634,"text":"示例：\bblue,green,red,yellow","fontSize":17,"font":"FF","color":"#666666"}},{"type":"Label","props":{"y":127,"x":516,"text":"问题字号：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":115,"x":623,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":120,"x":638,"width":286,"text":"30","name":"questionFontSize","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Label","props":{"y":182,"x":556,"text":"问题：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":169,"x":624,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":174,"x":639,"width":286,"name":"questions","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Label","props":{"y":313,"x":557,"text":"选项：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":301,"x":625,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":306,"x":640,"width":286,"name":"options","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Text","props":{"y":214,"x":634,"wordWrap":true,"width":289,"text":"示例：I'm <br>____.==yupeng,zhian@@I'm a ____.==boy,girl","height":38,"fontSize":17,"font":"FF","color":"#666666"}},{"type":"Label","props":{"y":73,"x":511,"text":"问题类型 ：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Label","props":{"y":73,"x":669,"text":"文字","name":"textRadio","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Label","props":{"y":72,"x":773,"text":"图片","name":"picRadio","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":69,"x":645,"width":20,"skin":"common/img_radio_checked.png","name":"textRadioImg","height":20}},{"type":"Image","props":{"y":69,"x":748,"width":20,"skin":"common/img_radio_notCheck.png","name":"picRadioImg","height":20}},{"type":"Label","props":{"y":268,"x":511,"text":"选项类型 ：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Label","props":{"y":268,"x":670,"width":40,"text":"单词","name":"wordRadio","height":20,"fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Label","props":{"y":267,"x":774,"text":"图片","name":"picRadio1","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":264,"x":646,"width":20,"skin":"common/img_radio_checked.png","name":"wordRadioImg","height":20}},{"type":"Image","props":{"y":264,"x":749,"width":20,"skin":"common/img_radio_notCheck.png","name":"picRadioImg1","height":20}}]},{"type":"Text","props":{"y":123,"x":152,"width":300,"var":"tip","text":"操作不正确！","pivotY":2,"pivotX":8,"height":30,"fontSize":30,"font":"FF","color":"#ee1613","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.FerrisWheelUI.uiView);

        }

    }
}

module ui {
    export class HotAirBalloonUI extends View {
		public bg:Laya.Image;
		public replay:Laya.Box;
		public replayAble:Laya.Image;
		public setting:Laya.Image;
		public configBox:Laya.Box;
		public tip:laya.display.Text;
		public mainpanel:Laya.Box;
		public play:Laya.Image;
		public playing:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1024,"height":768},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"HotAirBalloon/bg.png"}},{"type":"Box","props":{"y":690,"x":850,"var":"replay"},"child":[{"type":"Image","props":{"skin":"common/replay-disabled.png"}},{"type":"Image","props":{"var":"replayAble","skin":"common/replay-abled.png"}}]},{"type":"Image","props":{"y":26,"x":31,"width":30,"var":"setting","skin":"common/setting.png","height":30}},{"type":"Box","props":{"y":119,"x":575,"width":985,"var":"configBox","pivotY":100,"pivotX":554,"height":385},"child":[{"type":"Image","props":{"y":9,"x":463,"width":522,"skin":"common/configBG.png","sizeGrid":"20,10,20,10","height":307,"alpha":1}},{"type":"Button","props":{"y":231,"x":645,"width":86,"skin":"template/ButtonTab/btn_LargeTabButton_Middle.png","name":"submitBtn","labelSize":20,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"提交","height":32}},{"type":"Text","props":{"y":7,"x":947,"width":40,"text":"+","rotation":45,"pivotY":-1,"pivotX":-10,"name":"closeBtn","height":40,"fontSize":40,"color":"#5d5454","bold":false,"align":"center"}},{"type":"Label","props":{"y":113,"x":557,"text":"单词：","name":"wordlabel","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":101,"x":625,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":106,"x":640,"width":286,"name":"options","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Text","props":{"y":143,"x":634,"text":"示例：blue,green,red,yellow","name":"wordremark","fontSize":17,"font":"FF","color":"#666666"}},{"type":"Label","props":{"y":68,"x":511,"text":"选项类型 ：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Label","props":{"y":68,"x":670,"width":40,"text":"单词","name":"wordRadio","height":20,"fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Label","props":{"y":67,"x":774,"text":"图片","name":"picRadio1","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":64,"x":646,"width":20,"skin":"common/img_radio_checked.png","name":"wordRadioImg","height":20}},{"type":"Image","props":{"y":64,"x":749,"width":20,"skin":"common/img_radio_notCheck.png","name":"picRadioImg1","height":20}},{"type":"Label","props":{"y":184,"x":538,"text":"背景图：","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Image","props":{"y":172,"x":624,"width":315,"skin":"template/Text/TextBox.png","height":39}},{"type":"TextInput","props":{"y":177,"x":639,"width":286,"name":"bg","height":31,"fontSize":16,"font":"FF","color":"#3b3232"}},{"type":"Label","props":{"y":113,"x":557,"text":"图片：","name":"piclabel","fontSize":20,"font":"FF","color":"#2a2121"}},{"type":"Text","props":{"y":143,"x":634,"text":"示例：bag.png,car.png,cat.png","name":"picremark","fontSize":17,"font":"FF","color":"#666666"}}]},{"type":"Text","props":{"y":123,"x":83,"wordWrap":true,"width":399,"var":"tip","text":"操作不正确！","pivotY":2,"pivotX":8,"height":162,"fontSize":30,"font":"FF","color":"#ee1613","align":"center"}},{"type":"Box","props":{"y":111,"x":1,"width":1017,"var":"mainpanel","height":572}},{"type":"Image","props":{"y":669,"x":66,"var":"play","skin":"HotAirBalloon/sound.png"}},{"type":"Image","props":{"y":669,"x":66,"var":"playing","skin":"HotAirBalloon/sound-disabled.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.HotAirBalloonUI.uiView);

        }

    }
}

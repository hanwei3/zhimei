<template>
    <div>
        <div :id="playerId" class="prism-player"></div>
    </div>
</template>

<script lang="js">
export default {
    props:{
        isReload: {
            // 是否预加载
            type: Boolean,
            default: false
        },
        source: {
            // 视频来源
            type: Object,
            default: null
        },
        cover: {
            // 视频封面图
            type: String,
            default: ''
        },
        autoplay: {
            // 是否自动播放
            type: Boolean,
            default: false
        },
        isLive: {
            // true：直播  false：点播
            type: Boolean,
            default: false
        },
        width: {
            // 容器宽度
            type: String,
            default: '100%'
        },
        height: {
            // 容器高度
            type: String,
            default: '500px'
        },
        controlBarVisibility: {
            // 视频控制台出现的方式 支持 'hover', 'click', 'always'
            type: String,
            default: 'always'
        },
        progressMarkers: {
            // 进度条标记
            type: Boolean,
            default: []
        },
        skinLayout: {
            // 截图所需 [没有特殊要求的情况下，不建议修改]
            type: Boolean,
            default: [
                { "name": "bigPlayButton", "align": "blabs", "x": 30, "y": 80 },
                { "name": "H5Loading", "align": "cc" },
                { "name": "errorDisplay", "align": "tlabs", "x": 0, "y": 0 },
                { "name": "infoDisplay" },
                { "name": "tooltip", "align": "blabs", "x": 0, "y": 56 },
                { "name": "thumbnail" },
                {
                    "name": "controlBar", "align": "blabs", "x": 0, "y": 0,
                    "children": [
                        { "name": "progress", "align": "blabs", "x": 0, "y": 44 },
                        { "name": "playButton", "align": "tl", "x": 15, "y": 12 },
                        { "name": "timeDisplay", "align": "tl", "x": 10, "y": 7 },
                        { "name": "fullScreenButton", "align": "tr", "x": 10, "y": 12 },
                        { "name": "subtitle", "align": "tr", "x": 15, "y": 12 },
                        { "name": "setting", "align": "tr", "x": 15, "y": 12 },
                        { "name": "volume", "align": "tr", "x": 5, "y": 10 },
                        { "name": "snapshot", "align": "tr", "x": 10, "y": 12 }
                    ]
                }
            ]
        },
        extraInfo: {
            // 截图所需 [没有特殊要求的情况下，不建议修改]
            type: Boolean,
            default: {
                "crossOrigin": "anonymous"
            }
        },
        x5_video_position: {
            type: String,
            default: "top"
        },
        x5_type: {
            type: String,
            default: "h5"
        },
        x5_fullscreen: {
            type: Boolean,
            default: false
        },
        x5_orientation: {
            type: Number,
            default: 2
        },
        autoPlayDelay: {
            type: Number,
            default:2
        },
        autoPlayDelayDisplayText: {
            type: String,
            default: '视频正在努力加载中...'
        }
    },
    data() {
        return {
            playerId: "aliplayer_" + Math.random().toString(36).substr(2), // playerId
            player: null, // aliplayerDom
            danmukuList: [], // 弹幕列表
        };
    },
    mounted() {
        const _this = this;
        this.player = new Aliplayer({
            id: _this.playerId,
            source: JSON.stringify(_this.source),
            width: _this.width,
            height:  _this.height,
            autoplay: _this.autoplay,
            isReload: _this.isReload,
            isLive: _this.isLive,
            controlBarVisibility: 'always',    /* The mode of the status bar, which is set to Click. */
            extraInfo: _this.extraInfo,
            skinLayout: _this.skinLayout,
            progressMarkers: _this.progressMarkers,
            cover: _this.cover,
            x5_video_position: _this.x5_video_position,
            x5_type: _this.x5_type,
            x5_fullscreen: _this.x5_fullscreen,
            x5_orientation: _this.x5_orientation,
            autoPlayDelay: _this.autoPlayDelay,
            autoPlayDelayDisplayText: _this.autoPlayDelayDisplayText,
            // 使用的组件库 [这里按照官网的导入方式导入就可以]
            // 一般情况网站所需要的功能组件都是统一的  直接在这里定义就可以
            components: [
                {
                    name: 'AliplayerDanmuComponent',
                    type: AliPlayerComponent.AliplayerDanmuComponent,
                    args: [_this.danmukuList]
                },{
                    name: 'QualityComponent',
                    type: AliPlayerComponent.QualityComponent
                },{
                    name: 'RateComponent',
                    type: AliPlayerComponent.RateComponent
                },{
                    name: 'ProgressComponent',
                    type: AliPlayerComponent.ProgressComponent
                },{
                    name: 'CaptionComponent',
                    type: AliPlayerComponent.CaptionComponent
                },{
                    name: 'TrackComponent',
                    type: AliPlayerComponent.TrackComponent
                }
            ]
        }, function (player) {
            console.log("The player is created");
            /* h5截图按钮, 截图成功回调 */
            player.on('snapshoted', function (data) {
                let pictureData = data.paramData.base64;
                const downloadElement = document.createElement('a');
                downloadElement.setAttribute('href', pictureData);
                const fileName = 'Aliplayer' + Date.now() + '.png';
                downloadElement.setAttribute('download', fileName);
                downloadElement.click();
                pictureData = null;
            });
            // 调整清晰度
            player.on('sourceloaded', function(params) {
                const paramData = params.paramData;
                const desc = paramData.desc;
                const definition = paramData.definition;
                player.getComponent('QualityComponent').setCurrentQuality(desc, definition);
            });
        });
    },
    methods: {

    },
};
</script>

<style lang="scss">
.prism-player .prism-volume-control {
  left: auto !important;
  right: 125px;
}
.prism-player .prism-fullscreen-btn {
  margin-top: 15px !important;
  width: 24px;
  height: 24px;
}
.prism-player .prism-thumbnail {
  border: none;
}
.prism-player .prism-play-btn {
  width: 28px;
  height: 28px;
}
.player-olympic-player-next {
  width: 24px;
  height: 28px;
}
.prism-volume {
  margin-top: 14px !important;
  margin-right: 12px !important;
}
.prism-player .prism-volume .volume-icon {
  width: 27px;
  height: 26px;
  background-repeat: no-repeat;
}
.prism-player .prism-volume .volume-icon .short-horizontal {
  width: 2px;
  height: 7px;
}
.prism-player .prism-volume .volume-icon .long-horizontal {
  width: 2px;
  height: 13px;
}
.prism-player .prism-volume .volume-icon.mute .short-horizontal {
  height: 13px;
  top: 7px;
}
.prism-player .prism-volume .volume-icon.mute .long-horizontal {
  top: 7px;
  height: 13px;
}
.prism-player .prism-cc-btn {
  height: 24px;
  width: 20px;
  margin-top: 14px !important;
  margin-right: 22px !important;
}
.prism-player .prism-setting-btn {
  width: 20px;
  height: 22px;
  margin-top: 15px !important;
  margin-right: 23px !important;
}
.prism-time-display {
  margin-top: 4px !important;
  margin-left: 20px !important;
}
.prism-setting-btn,
.prism-cc-btn {
  display: none;
}
.ali-danmuku-control .ali-danmu-input-wrap {
  width: 120px;
}
.ali-danmu-input .danmu-input-enter {
  top: -1px;
  height: 30px;
}
.quality-components,
.rate-components {
  margin-top: 7px;
}
.current-rate {
  width: 30px;
}
.prism-player .prism-time-display {
  line-height: 46px;
}
.prism-player .prism-volume-control {
  right: 44px;
}
</style>

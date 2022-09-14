/* 音乐播放器的实现方法 */
var interval = '';                                                // 定义定时操作
let action = document.querySelector('#action');                   // 播放｜暂停 按钮
let oWidth = document.querySelector('#audiowidth').offsetWidth;   // 进度条总长度   
let activeline = document.querySelector('#activeline');           // 进度条已播放长度
let progress = document.querySelector('#progress');               // 已播放时长
// 点击 播放｜暂停 按钮时触发下列事件
action.addEventListener('click', function(){
    let audio = document.querySelector("audio");    // 获取 audio 标签
    let status = audio.getAttribute('data-play');   // 获取播放状态
    let duration = this.getAttribute('data-times'); // 获取音频总时长
    if(status == 'false'){                          // 当播放状态为暂停时
        audio.play();                               // 播放音频
        audio.setAttribute('data-play', 'true');    // 修改播放状态为播放
    }else{                                          // 当播放状态为播放时
        audio.pause();                              // 暂停音频
        audio.setAttribute('data-play', 'false');   // 修改播放状态为暂停
    }
    // 当音频处于播放状态时触发下列事件
    audio.addEventListener('playing', function(){
        clearTimeout(interval);                       // 取消定时操作
        action.classList.add('audio-pause');          // 为 播放｜暂停 按钮添加 'audio-pause' 类名
        let step = Math.floor(oWidth/((duration-1))); // 计算每一步的长度并将其定义为1格
        result();                                     // 执行定时操作
        function result(){
            interval =  setTimeout(function () {                                // 设置定时操作
                progress.innerHTML = (parseInt(progress.innerHTML) + 1) +'s';   // 已播放时长+1s
                activeline.style.width = activeline.offsetWidth + step + 'px';  // 进度条已播放长度+1格
                if(activeline.offsetWidth == (duration-1)*step){                // 播放完成时
                    activeline.style.width = 0;                                 // 重置进度条已播放长度
                    progress.innerHTML = '0s';                                  // 重置已播放时长
                }else{                                                          // 否则
                    result();                                                   // 继续执行该方法
                }
            }, 1000);                                                           // 每隔1s执行一次
        }
    });
    // 当音频处于暂停状态时触发下列事件
    audio.addEventListener('pause', function(){ 
        action.classList.remove('audio-pause'); // 为 播放｜暂停 按钮移除 'audio-pause' 类名
        clearTimeout(interval);                 // 取消定时操作
    });
});

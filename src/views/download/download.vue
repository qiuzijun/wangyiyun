<template>
  <div @mousewheel="scroll" class="page-component-up">
    <Nav />
    <div class="color">
      <div class="content">
        <div class="triangle"></div>
      </div>
    </div>
    <div class="download">
      <div class="iphoneCode">
        <img
          src="https://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png"
          alt=""
          width="100px"
          height="100px"
        />
        <p>扫描二维码下载</p>
      </div>

      <div class="downloadContent">
        <div class="iphoneCode2" v-show="iphoneCode">
          <img
            src="https://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png"
            alt=""
            width="120px"
            height="120px"
          />
          <p>扫描二维码下载</p>
          <div class="triangle"></div>
        </div>
        <div class="other">
          <!-- <i class="el-icon-bottom"></i>
          <span>其他操作系统客户端</span> -->
        </div>
        <div class="computer">
          <p>在电脑上听</p>
          <img
            src="https://p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=800x0"
            alt=""
            width="100%"
            height="328px"
          />
          <div class="type">
            <span>
              <img
                src="../../assets/img/icon_mac.png"
                alt=""
                width="154px"
                height="45px"
              />
            </span>
            <span>
              <img
                src="../../assets/img/windows.png"
                alt=""
                width="154px"
                height="45px"
              />
            </span>
          </div>
          <div class="downloadButton" @click="downComputer">
            <p>下载电脑端</p>
          </div>
        </div>
        <div class="iphone">
          <p>在手机上听</p>
          <img
            src="https://p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=450x0"
            alt=""
            width="100%"
            height="328px"
          />
          <div class="type">
            <span>
              <img
                src="../../assets/img/icon_iphone.png"
                alt=""
                width="120px"
                height="44px"
              />
            </span>
            <span>
              <img
                src="../../assets/img/icon_App.png"
                alt=""
                width="120px"
                height="44px"
              />
            </span>
          </div>
          <div class="downloadButton" @click="iphoneCode = !iphoneCode">
            <i class="icon-node"></i>
            <p>下载手机端</p>
          </div>
        </div>
      </div>
    </div>
    <div class="information">
      <ul>
        <li>
          <div class="center">
            <div class="text">
              <h1>千万曲库 首首CD音质</h1>
              <p>囊括百万无损SQ音乐，你在用手机听歌时，</p>
              <p>也能感受到纤毫毕现的CD音质，更能免费离线收听</p>
            </div>
            <div class="img">
              <img
                src="https://p1.music.126.net/KP4aN9umGMNnCS8iCgiV9w==/109951164206415504.jpg"
                alt=""
              />
            </div>
          </div>
        </li>
        <li>
          <div class="center">
            <div class="img">
              <img
                src="https://p1.music.126.net/rpwYXqZt_UpO_de46JyYwQ==/109951164488922626.jpg"
                alt=""
              />
            </div>
            <div class="text">
              <h1>千位明星 亲自推荐音乐</h1>
              <p>
                韩红，戴佩妮等<span style="color: #cc0000">千位明星已入驻</span
                >，亲自创建私房歌单，录制独
              </p>
              <p>家DJ节目，推荐他们心中的好音乐</p>
            </div>
          </div>
        </li>
        <li>
          <div class="center">
            <div class="text">
              <h1>社交关系 发现全新音乐</h1>
              <p>
                你可以<span style="color: #cc0000">关注明星</span
                >、DJ和好友，通过浏览他们的动态、收藏和
              </p>
              <p>分享，发现更多全新好音乐</p>
            </div>
            <div class="img">
              <img
                src="https://p1.music.126.net/9CQFSDAZN7TcOWz7UNEqmQ==/109951164488924083.jpg"
                alt=""
              />
            </div>
          </div>
        </li>
        <li>
          <div class="center">
            <div class="img">
              <img
                src="	https://p1.music.126.net/IZIgZjpBv9WkyMZ53i043w==/109951164206417003.jpg"
                alt=""
              />
            </div>
            <div class="text">
              <h1>手机电脑 歌单实时同步</h1>
              <p>只要一个帐号，你就可以同步在手机、电脑上创建、收藏</p>
              <p>
                的歌单，<span style="color: #cc0000">随时随地畅享好音乐</span>
              </p>
            </div>
          </div>
        </li>
        <li>
          <div class="center">
            <div class="text">
              <h1>听歌识曲 助你疯狂猜歌</h1>
              <p>歌曲很动听却不知道歌名，歌名在嘴边却想不起来……</p>
              <p>
                用<span style="color: #cc0000">听歌识曲</span
                >功能，几秒钟就知道歌名
              </p>
            </div>
            <div class="img">
              <img
                src="	https://p1.music.126.net/MGGp3L7AerIVlskMkAk1HA==/109951164488904737.jpg"
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 回到顶部 -->
    <Backtop :scroll="backTop"></Backtop>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iphoneCode: false,
      backTop: false,
    };
  },
  methods: {
    // 滚动条事件
    handleScroll() {
      let top = document.documentElement.scrollTop;
      if (top >= 100) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    },
    // 鼠标滚轮事件，控制置顶显示隐藏
    scroll() {
      let top = document.documentElement.scrollTop;
      if (top >= 100) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    },
    // 下载电脑端
    downComputer() {
      window.location.href =
        "https://music.163.com/stat/?web=pc&from=download&t=1640019008473&redirect=https%3A%2F%2Fmusic.163.com%2Fapi%2Fpc%2Fpackage%2Fdownload%2Flatest";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    Nav: () => import("../../components/navigationBar/navigationBar.vue"),
    Backtop: () => import("../../components/Backtop.vue"),
  },
};
</script>
<style lang="less" scoped>
.page-component-up {
  transition: all 0.3s;
  .color {
    width: 100%;
    height: 5px;
    background-color: #c20c0c;
    .content {
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .triangle {
        position: absolute;
        top: -15px;
        left: 58.4%;
        border-top: 8px solid transparent;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #c20c0c;
      }
    }
  }
  .download {
    width: 100%;
    height: 766px;
    background-image: url("https://p1.music.126.net/LwY0PYMc2NVWwbIzvGFKcA==/109951164205104153.png");
    background-size: cover;

    .iphoneCode {
      width: 136px;
      height: 151px;
      background-color: white;
      color: #333;
      font-size: 12px;
      text-align: center;
      padding: 16px 18px 9px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      position: fixed;
      z-index: 10;
      top: 395px;
      right: 25px;
      p {
        margin-top: 5px;
      }
    }

    .downloadContent {
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .iphoneCode2 {
        width: 160px;
        height: 171px;
        background-color: white;
        color: #333;
        font-size: 12px;
        text-align: center;
        padding: 16px 20px 9px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        position: absolute;
        top: 400px;
        right: 70px;
        p {
          margin-top: 5px;
        }
        .triangle {
          width: 8px;
          height: 8px;
          position: absolute;
          top: 171px;
          left: 72px;
          border-top: 8px solid white;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }
      }
      .other {
        position: absolute;
        top: 10px;
        right: 50px;
        color: white;
        &:hover {
          color: #ccc;
          cursor: pointer;
        }
      }
      .computer {
        width: 556px;
        height: 540px;
        p {
          text-align: center;
          font-size: 22px;
          opacity: 0.8;
          color: #ffffff;
          font-family: PingFangSC-Regular;
          margin-bottom: 33px;
        }
        .type {
          width: 100%;
          height: 44px;
          display: flex;
          margin-top: 12px;
          justify-content: center;
          align-self: center;
          span {
            width: 154px;
            height: 50px;
            display: inline-block;
          }
          span:first-child {
            margin-right: 100px;
          }
        }
        .downloadButton {
          width: 300px;
          height: 65px;
          background-color: white;
          border-radius: 65px;
          font-size: 22px;
          margin: 20px auto 0;
          p {
            color: #d10000;
            line-height: 65px;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            cursor: pointer;
          }
        }
      }
      .iphone {
        width: 300px;
        height: 540px;
        p {
          text-align: center;
          font-size: 22px;
          opacity: 0.8;
          color: #ffffff;
          font-family: PingFangSC-Regular;
          margin-bottom: 33px;
        }
        .type {
          width: 100%;
          height: 44px;
          display: flex;
          margin-top: 12px;
          justify-content: center;
          align-self: center;
          span {
            width: 120px;
            height: 44px;
            display: inline-block;
          }
          span:first-child {
            margin-right: 25px;
          }
        }
        .downloadButton {
          width: 300px;
          height: 65px;
          background-color: white;
          border-radius: 65px;
          font-size: 22px;
          margin: 20px auto 0;
          display: flex;
          justify-content: center;
          align-self: center;
          p {
            color: #d10000;
            line-height: 65px;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            cursor: pointer;
          }
          .icon-node {
            width: 23px;
            height: 23px;
            display: inline-block;
            background-image: url("../../assets/img/icon_ncode.png");
            background-size: 23px;
            margin-top: 23px;
            background-color: transparent;
          }
        }
      }
    }
  }
  .information {
    ul > li {
      width: 100%;
      height: 438px;
      display: flex;
      justify-content: center;
      align-items: center;
      .center {
        width: 900px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text {
          width: 412px;
          h1 {
            font-size: 40px;
            font-weight: normal;
          }
          p {
            font-size: 16px;
            color: #666;
          }
        }
      }
    }
    ul > li:nth-child(even) {
      background-color: #f8f8f8;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>

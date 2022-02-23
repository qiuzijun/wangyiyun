<template>
  <div class="nav">
    <div class="navContent">
      <!-- logo -->
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <!--发现音乐等 -->
      <div class="Navigation">
        <ul>
          <li
            class="item"
            :key="item.id"
            v-for="item in musicList"
            @click="musicLi(item.id)"
          >
            <span>
              <router-link :to="item.path">
                <p>{{ item.name }}</p>
              </router-link>
            </span>
          </li>
        </ul>

        <i class="icon-hot"></i>
      </div>
      <!-- 搜索框 -->
      <div class="searchBox" ref="searchBox">
        <i class="el-icon-search"></i>
        <input
          type="text"
          placeholder="音乐/视频/电台/用户"
          @input="change(search, 300)"
          v-model="searchValue"
          @focus="
            searchValue.length > 0 ? (searchShow = true) : (searchShow = false)
          "
        />
        <div class="search" v-show="searchShow">
          <div class="title">
            <p>搜索"{{ searchValue }}"相关用户&gt;</p>
          </div>
          <div class="searchList">
            <!-- 单曲 -->
            <div
              class="single"
              v-if="searchList.songs.length > 0 ? true : false"
            >
              <div class="single_l">
                <i class="el-icon-headset"></i>
                <p>单曲</p>
              </div>
              <div class="single_r">
                <ul>
                  <li
                    v-for="item in searchList.songs"
                    :key="item.id"
                    @click="playSong(item.id)"
                  >
                    <p>
                      <span>{{ item.name }}</span
                      >-<span v-for="data in item.ar" :key="data.id"
                        >{{ data.name }}&nbsp;</span
                      >
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 歌手 -->
            <div
              class="singer"
              v-if="searchList.artists.length > 0 ? true : false"
            >
              <div class="singer_l">
                <i class="el-icon-user"></i>
                <p>歌手</p>
              </div>
              <div class="singer_r">
                <ul>
                  <li
                    v-for="item in searchList.artists"
                    :key="item.id"
                    @click="routeSinger(item.id, item.name, item.picUrl)"
                  >
                    <p>{{ item.name }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 专辑 -->
            <div
              class="disc"
              v-if="searchList.albums.length > 0 ? true : false"
            >
              <div class="disc_l">
                <i class="el-icon-bangzhu"></i>
                <p>专辑</p>
              </div>
              <div class="disc_r">
                <ul>
                  <li
                    v-for="item in searchList.albums"
                    :key="item.id"
                    @click="routeAlbum(item.id)"
                  >
                    <p>
                      <span>{{ item.name }}</span
                      >-<span>{{ item.artist.name }}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 歌单 -->
            <div
              class="musicList"
              v-if="searchList.playLists.length > 0 ? true : false"
            >
              <div class="musicList_l">
                <i class="el-icon-tickets"></i>
                <p>歌单</p>
              </div>
              <div class="musicList_r">
                <ul>
                  <li
                    v-for="item in searchList.playLists"
                    :key="item.id"
                    @click="routePlayList(item.id)"
                  >
                    <p>{{ item.name }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- mv -->
            <div class="mv"></div>
          </div>
        </div>
      </div>
      <!-- 创作者中心 -->
      <div class="creatorCenter">
        <p>创作者中心</p>
      </div>
      <div class="login" @click="landingPageClk" v-if="head">
        <span>登录</span>
      </div>
      <!-- 登录头像 -->
      <div class="headPortrait" v-else>
        <img
          @mouseover="informationSow = false"
          @mouseout="informationSow = true"
          :src="userInfo.profile.avatarUrl"
        />
        <div class="information" v-show="informationSow">
          <p>{{ information }}</p>
        </div>
      </div>
      <!-- 登录信息、设置等栏目 -->
      <div
        class="InformationList"
        v-show="!informationSow"
        @mouseover="informationSow = false"
        @mouseout="informationSow = true"
      >
        <ul>
          <li v-for="item in homeList" :key="item.id">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
            <div class="information" v-show="item.name == '我的信息'">
              <p>{{ information }}</p>
            </div>
          </li>
        </ul>
        <ul>
          <li v-for="item in setUpList" :key="item.id">
            <i :class="item.icon"></i>
            <p>{{ item.name }}</p>
          </li>
        </ul>
        <ul>
          <li v-for="item in logOut" :key="item.id" @click="outLogin">
            <i :class="item.icon"></i>
            <p>{{ item.name }}</p>
          </li>
        </ul>
        <i class="icon-triangle"></i>
      </div>
    </div>
    <!-- 登录页 -->
    <div v-show="loginShow" class="landingPage" ref="showDoc">
      <!-- 登录文字 -->
      <div class="landing" @mousedown="start($event)" @mouseup="end($event)">
        <div class="text">登录</div>
        <!-- 关闭按钮 -->
        <div class="closePop">
          <img
            src="@/assets/img/closePop.png"
            alt=""
            title="关闭窗体"
            width="10px"
            height="10px"
            @click="closePop"
          />
        </div>
      </div>
      <!-- 登录内容 -->
      <div class="landingContent" v-show="modeShow">
        <!-- app扫码登录 -->
        <div class="appCode">
          <div class="landingImg">
            <img
              src="	https://s2.music.126.net/style/web2/img/qr_guide.png?032a700940641b97d366f1c383b6a49c"
              alt=""
              width="125px"
              height="220px"
            />
          </div>
          <!-- 扫码 二维码图 -->
          <div class="scanCode">
            <h1>扫码登录</h1>
            <img :src="codeImg" alt="" width="128px" height="128px" />
            <p>
              使用
              <span>网易云音乐APP</span>
              扫码登录
            </p>
          </div>
        </div>
        <!-- 登录模式选择 -->
        <div class="loginMode">
          <p class="mode" @click="modeShow = !modeShow">选择其他登录模式</p>
        </div>
      </div>
      <!-- 其他登录方式 -->
      <div class="otherLogin" v-show="!modeShow">
        <div class="other">
          <div class="iphone">
            <img
              src="https://s2.music.126.net/style/web2/img/platform.png?bdeb8d4ec7096becfd579408e4d455d2"
              alt=""
              width="224px"
              height="120px"
            />
            <div class="cellPhoneNumber" @click="iphoneLoginClk">
              手机号登录
            </div>
            <div class="register" @click="iphoneRegisterClk">注册</div>
          </div>
          <div class="weChat">
            <ul>
              <li v-for="item in list" :key="item.id">
                <img :src="item.src" alt="" width="38px" height="38px" />
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="input">
          <input type="checkbox" ref="regulations" />
          <span>
            <span>同意</span>
            《服务条款》《隐私政策》《儿童隐私政策》
          </span>
        </div>
        <img
          src="https://s2.music.126.net/style/web2/img/qr_login_icon.png?b5d45a44b1bf929a4267a95e0564cb72"
          alt=""
          width="52px"
          height="52px"
          @click="modeShow = true"
        />
      </div>
    </div>
    <!-- 手机号登录、注册页 -->
    <div v-show="iphoneLoginShow" class="iPhoneLandingPage" ref="iphoneShowDoc">
      <!-- 登录文字 -->
      <div
        class="landing"
        @mousedown.stop="iphoneStart($event)"
        @mouseup="iphoneEnd($event)"
      >
        <div class="text">{{ Switch == true ? "手机登录" : "手机号注册" }}</div>
        <!-- 关闭按钮 -->
        <div class="closePop">
          <img
            src="@/assets/img/closePop.png"
            alt=""
            title="关闭窗体"
            width="10px"
            height="10px"
            @click="iphoneLoginShow = false"
          />
        </div>
      </div>
      <!-- 手机登录内容 -->
      <div class="landingContent" @click="numberShow = false" v-if="Switch">
        <div class="iphoneLanding">
          <div class="iphoneLandingContent">
            <!-- 输入手机号 -->
            <div class="iphoneNumber">
              <!-- 电话码选择 -->
              <div class="numberPrefix" @click.stop="numberShow = !numberShow">
                <p>+{{ numberPrefix }}</p>
                <i class="el-icon-caret-bottom"></i>
              </div>

              <div class="number">
                <input
                  type="text"
                  placeholder="请输入手机号"
                  @keyup="keyUp()"
                  id="p"
                  v-model="valueIphone"
                />
              </div>
            </div>

            <!-- 验证码 -->
            <div class="verificationCode" v-show="pLogin">
              <div class="codeNumber">
                <input
                  type="text"
                  placeholder="请输入验证码"
                  id="t"
                  v-model="valueCode"
                />
              </div>
              <el-button size="small" @click="getCode">发送验证码</el-button>
            </div>
            <!-- 短信登录输入密码 -->
            <div class="smsLogin" v-show="!pLogin">
              <input
                type="text"
                placeholder="请输入密码"
                id="t"
                v-model="valueCode"
              />
              <p>忘记密码?</p>
            </div>

            <!-- 警告提示 -->
            <div class="warning" v-show="warning">
              <i class="el-icon-warning">
                <p>请输入正确的手机号</p>
              </i>
            </div>
            <div class="warning" v-show="warningCode">
              <i class="el-icon-warning">
                <p>请输入验证码</p>
              </i>
            </div>
            <!-- 密码登录、自动登录 -->
            <div class="passwordLogin">
              <p @click="pLogin = !pLogin">
                {{ pLogin == true ? "密码登录" : "短信登录" }}
              </p>
              <div class="checkbox">
                <input type="checkbox" /><span>自动登录</span>
              </div>
            </div>
            <!-- 登录-->
            <div class="signIn" @click="psLogin">登录</div>
          </div>
          <!--电话码 -->
          <ul v-show="numberShow">
            <li
              v-for="item in iphoneList"
              :key="item.id"
              @click="iphoneListPrefix(item.iphone)"
            >
              <p>{{ item.name }}</p>
              <p>{{ item.iphonePrefix }}</p>
            </li>
          </ul>
        </div>
        <!-- 切换其他登录 -->
        <div class="landing">
          <p
            style="color: #0c72c3; margin-left: 20px"
            @click="returnOtherLogin"
          >
            &lt; 其他登录方式
          </p>
          <p style="color: #999; margin-right: 20px" @click="Switch = !Switch">
            没有帐号？免费注册 >
          </p>
        </div>
      </div>
      <!-- 注册内容 -->
      <div v-else class="register">
        <div class="iphoneRegister">
          <div class="iphoneRegisterContent">
            <!-- 输入手机号 -->
            <label>手机号:</label>
            <div class="iphoneNumber">
              <!-- 电话码选择 -->

              <div class="numberPrefix" @click.stop="numberShow = !numberShow">
                <p>+{{ numberPrefix }}</p>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <div class="number">
                <input
                  type="text"
                  placeholder="请输入手机号"
                  @keyup="keyUp()"
                  id="number"
                  v-model="registerIphone"
                />
              </div>
            </div>
            <!-- 输入密码 -->
            <label>密码:</label>
            <div class="password" :style="{ border: '1px solid ' + color }">
              <input
                type="password"
                placeholder="设置登录密码，不少于8位"
                id="password"
                @focus="passWordFocus"
                @keyup="passWordKeyup"
                v-model="registerPassword"
              />
            </div>
            <!-- 注册密码提示 -->
            <div class="passwordWarning" v-show="passwordWarning">
              <ul>
                <li>
                  <i :class="Class.spaceClass">
                    <p>密码不能包含空格</p>
                  </i>
                </li>
                <li>
                  <i :class="Class.numberClass">
                    <p>包含字母、数字、符号中至少两种</p>
                  </i>
                </li>
                <li>
                  <i :class="Class.lengthClass">
                    <p>密码长度为8-20位</p>
                  </i>
                </li>
              </ul>
            </div>
            <!-- 下一步-->
            <div
              class="nextStep"
              :style="{
                backgroundColor: backgroundColor,
                color: nextStopColor,
              }"
            >
              下一步
            </div>
          </div>
        </div>
        <!-- 返回登录 -->
        <div class="goLanding">
          <p style="color: #0c72c3; margin-left: 20px" @click="Switch = true">
            &lt; 返回登录
          </p>
        </div>
      </div>
      <!--电话码 -->
      <ul v-show="numberShow" id="iphoneCode">
        <li
          v-for="item in iphoneList"
          :key="item.id"
          @click="iphoneListPrefix(item.iphone)"
        >
          <p>{{ item.name }}</p>
          <p>{{ item.iphonePrefix }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  getRqCodeKey, //获取二维码key值
  getRqCodeImg, //获取二维码图片
  getRqCodeState, //获取二维码状态
  getCode, //获取验证码
  verificationCode, //验证验证码
  verificationLogin, //验证码登录
  search, //搜索
  outLogin, //退出登录
  getAccount,
  // getSubcount,
} from "../../api/http";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Nav",
  data() {
    return {
      loginPage: true,
      isActive: 0, //发现音乐等背景初始颜色
      warningCode: false, //手机登录验证码提示
      pLogin: true, //密码登录/短信登录切换
      head: true, //登录头像
      userImg: "", //登录头像图片
      information: 0, //用户信息数
      informationSow: true, //用户信息数显示隐藏
      Switch: "", //切换注册页
      loginShow: false, //登录也的显示与隐藏
      modeShow: true, //登录方式切换
      iphoneLoginShow: false, //手机登录
      key: null, //二维码图片key值
      codeImg: "", //二维码图片
      code: null, //二维码状态
      numberPrefix: 86, //初始电话码
      numberShow: false, //电话码显示隐藏
      valueIphone: "", //电话号码
      registerIphone: "", //注册手机号
      registerPassword: "", //注册密码
      valueCode: "", //验证码
      warning: false, //警告的显示
      color: "#ccc", //边框颜色
      backgroundColor: "#ececec", //下一步背景颜色
      nextStopColor: "#ccc", //下一步文字颜色
      passwordWarning: false, //手机号注册密码提示显示隐藏
      Class: {
        spaceClass: "el-icon-success", //密码不能包含空格提示类名
        numberClass: "el-icon-warning", //包含字母、数字、符号中至少两种提示类名
        lengthClass: "el-icon-warning", //密码长度为8-20位提示类名
      },
      //显示登录页初始位置
      moveDoc: {
        x: null,
        y: null,
      },
      //我的主页等。。。
      homeList: [
        {
          id: 0,
          name: "我的主页",
          icon: "el-icon-s-custom",
        },
        {
          id: 1,
          name: "我的信息",
          icon: "el-icon-message-solid",
        },
        {
          id: 2,
          name: "我的等级",
          icon: "el-icon-medal",
        },
        {
          id: 3,
          name: "VIP会员",
          icon: "el-icon-trophy",
        },
      ],
      // 个人设置
      setUpList: [
        {
          id: 0,
          name: "个人设置",
          icon: "el-icon-s-tools",
        },
        {
          id: 1,
          name: "实名认证",
          icon: "el-icon-connection",
        },
      ],
      // 退出登录
      logOut: [{ id: 0, name: "退出登录", icon: "el-icon-switch-button" }],
      // 发现音乐等
      musicList: [
        {
          id: 0,
          name: "发现音乐",
          path: "/discoverMusic",
        },
        {
          id: 1,
          name: "我的音乐",
          path: "/myMusic",
        },
        {
          id: 2,
          name: "关注",
          path: "/follow",
        },
        {
          id: 3,
          name: "商城",
          path: "/shoppingMall",
        },
        {
          id: 4,
          name: "音乐人",
          path: "/musician",
        },
        {
          id: 5,
          name: "下载客户端",
          path: "/download",
        },
      ],
      // 号码前缀
      iphoneList: [
        {
          id: 0,
          name: "中国",
          iphonePrefix: "+86",
          iphone: 86,
        },
        {
          id: 1,
          name: "中国香港",
          iphonePrefix: "+852",
          iphone: 852,
        },
        {
          id: 2,
          name: "中国澳门",
          iphonePrefix: "+853",
          iphone: 853,
        },
        {
          id: 3,
          name: "中国台湾",
          iphonePrefix: "+886",
          iphone: 886,
        },
        {
          id: 4,
          name: "阿尔巴尼亚",
          iphonePrefix: "+355",
          iphone: 355,
        },
        {
          id: 5,
          name: "阿尔及利亚",
          iphonePrefix: "+213",
          iphone: 213,
        },
        {
          id: 6,
          name: "阿富汗",
          iphonePrefix: "+93",
          iphone: 93,
        },
        {
          id: 7,
          name: "阿根廷",
          iphonePrefix: "+54",
          iphone: 54,
        },
        {
          id: 8,
          name: "阿拉伯联合酋长国",
          iphonePrefix: "+971",
          iphone: 971,
        },
        {
          id: 9,
          name: "阿曼",
          iphonePrefix: "+968",
          iphone: 968,
        },
        {
          id: 10,
          name: "阿塞拜疆",
          iphonePrefix: "+994",
          iphone: 994,
        },
        {
          id: 11,
          name: "阿森松",
          iphonePrefix: "+994",
          iphone: 994,
        },
      ],
      //   微信、QQ等其他登录
      list: [
        {
          id: 0,
          name: "微信登录",
          src: require("@/assets/img/weChat.png"),
        },
        { id: 1, name: "QQ登录", src: require("@/assets/img/qq.png") },
        { id: 2, name: "微博登录", src: require("@/assets/img/wb.png") },
        {
          id: 3,
          name: "网易邮箱账号登录",
          src: require("@/assets/img/wy.png"),
        },
      ],
      //保存输入框定时器
      timer: null,
      // 输入框
      searchValue: "",
      // 输入框显示与隐藏
      searchShow: false,
      // 搜索内容列表
      searchList: {
        // 单曲
        songs: [],
        // 歌手
        artists: [],
        // 专辑
        albums: [],
        // 歌单
        playLists: [],
      },
      // 用户信息
      userInfo: "",
    };
  },
  watch: {
    login(newName) {
      this.loginShow = newName;
    },
    code(newName) {
      if (newName == 801) {
        this.setInterval = setInterval(() => {
          this.getRqCodeState();
        }, 1000);
        console.log("等待扫码");
        console.log(newName);
      } else if (newName == 800) {
        console.log("已过期");
        console.log(newName);
        //  重新获取key值
        this.getKey();
      } else if (newName == 802) {
        console.log("待确认");
        console.log(newName);
      } else if (newName == 803) {
        console.log("授权登录成功");
        console.log(newName);
        clearInterval(this.setInterval);
        // 刷新登录状态
        this.loginRefresh();
        // 登录状态
        this.getLoginStatus();
      }
    },
    // 监听是否有用户信息
    userInfo: {
      handler(newName) {
        if (newName) {
          this.head = false;
        } else {
          this.head = true;
        }
      },
    },
    // 监听密码提示类名变化
    Class: {
      handler(newName) {
        if (
          newName.lengthClass == "el-icon-success" &&
          newName.numberClass == "el-icon-success" &&
          newName.spaceClass == "el-icon-success"
        ) {
          this.color = "#ccc";
          this.backgroundColor = "#507daf";
          this.nextStopColor = "white";
        } else {
          this.color = "red";
          this.backgroundColor = "#ececec";
          this.nextStopColor = "#ccc";
        }
      },
      deep: true,
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      console.log(JSON.parse(localStorage.getItem("userInfo")));
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }

    // 点击歌单组件外隐藏组件
    const _this = this;
    document.addEventListener("click", (event) => {
      event = event || window.event;
      //得到目标元素的位置信息
      let target = _this.$refs.searchBox.getBoundingClientRect();
      //判断之间的关系：如果点击的x坐标在目标位置left、right之间and点击的y坐标在目标位置的top、bottom之间则证明在元素内点击，否则则在元素外点击
      if (
        target.left < event.clientX &&
        event.clientX < target.right &&
        target.top < event.clientY &&
        event.clientY < target.bottom
      ) {
        // console.log(1);
      } else {
        _this.searchShow = false;
      }
    });
  },
  computed: {
    ...mapState(["login"]),
  },
  methods: {
    musicLi() {
      // document.querySelectorAll(".item")[item].style.backgroundColor = "black";
      // document.querySelectorAll(".item>span>a>p")[item].style.color = "white";
    },
    //   点击登录按钮显示登录页面
    landingPageClk() {
      this.loginShow = true;
      this.getKey();
    },
    // 关闭窗口
    closePop() {
      this.loginShow = false;
      this.$store.commit("loginShow", this.loginShow);
      clearInterval(this.setInterval);
      this.key = null;
      this.numberPrefix = 86; //复位初始电话码
    },
    // 电话码点击事件
    iphoneListPrefix(iphone) {
      this.numberPrefix = iphone;
      this.numberShow = false;
    },
    // 电话号码验证
    numberVerification() {
      if (!/^1[3456789]\d{9}$/.test(this.valueIphone)) {
        alert("手机号码有误，请重填");
        return false;
      }
    },
    // 电话号码输入警告
    keyUp() {
      if (isNaN(this.valueIphone)) {
        this.$message({
          message: "请输入数字",
          type: "warning",
        });
      }
      if (isNaN(this.registerIphone)) {
        this.$message({
          message: "请输入数字",
          type: "warning",
        });
      }
    },
    // 获取验证码
    async getCode() {
      if (!/^1[3456789]\d{9}$/.test(this.valueIphone)) {
        return (this.warning = true);
      } else {
        this.warning = false;
        let res;
        try {
          res = await getCode({
            phone: this.valueIphone,
            ctcode: this.numberPrefix,
          });
        } catch (error) {
          console.log(error);
          return;
        }
        if (res.code == 400) {
          this.$message({
            message: "发送验证码超过限制:每个手机号一天只能发5条验证码",
            type: "warning",
          });
        }
      }
    },
    // 点击手机号登录
    iphoneLoginClk() {
      if (this.$refs.regulations.checked) {
        this.iphoneLoginShow = true;
        this.loginShow = false;
        this.Switch = true;
      } else {
        this.$message({
          message: "请勾选同意《服务条例》、《隐私政策》、《儿童隐私政策》",
          type: "warning",
        });
      }
      // console.log(this.$refs.regulations.checked);
    },
    // 点击注册
    iphoneRegisterClk() {
      if (this.$refs.regulations.checked) {
        this.iphoneLoginShow = true;
        this.loginShow = false;
        this.Switch = false;
      } else {
        this.$message({
          message: "请勾选同意《服务条例》、《隐私政策》、《儿童隐私政策》",
          type: "warning",
        });
      }
    },
    // 返回其他登录窗口
    returnOtherLogin() {
      this.iphoneLoginShow = false;
      this.loginShow = true;
    },
    // 手机号注册密码框焦点事件
    passWordFocus() {
      this.color = "red";
      this.passwordWarning = true;
    },
    // 手机号注册密码框键盘事件
    passWordKeyup() {
      // 数字验证！
      let number = new RegExp("^[0-9]*$");
      // 字母验证！
      let letter = new RegExp("^[a-zA-Z]*$");
      //特殊字符验证
      let flag = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]"
      );
      let num = 0;
      let ler = 0;
      let fag = 0;
      for (let i = 0; i < this.registerPassword.length; i++) {
        // 下面判断密码不能包含空格
        if (this.registerPassword[i] == " ") {
          this.Class.spaceClass = "el-icon-warning";
        } else {
          this.Class.spaceClass = "el-icon-success";
        }
        //包含字母、数字、符号中至少两种
        if (number.test(this.registerPassword[i])) {
          num++;
        } else if (letter.test(this.registerPassword[i])) {
          ler++;
        } else if (flag.test(this.registerPassword[i])) {
          fag++;
        }
      }
      // 输入空白时的样式类
      if (this.registerPassword == "") {
        this.Class.spaceClass = "el-icon-success";
        num = 0;
        ler = 0;
        fag = 0;
      }
      // 包含字母、数字、符号中至少两种
      if (num > 0 && ler > 0) {
        this.Class.numberClass = "el-icon-success";
      } else if (fag > 0 && ler > 0) {
        this.Class.numberClass = "el-icon-success";
      } else if (num > 0 && fag > 0) {
        this.Class.numberClass = "el-icon-success";
      } else {
        this.Class.numberClass = "el-icon-warning";
      }
      // 密码长度为8-20位
      if (
        this.registerPassword.length >= 8 &&
        this.registerPassword.length <= 20
      ) {
        this.Class.lengthClass = "el-icon-success";
      } else {
        this.Class.lengthClass = "el-icon-warning";
      }
    },
    // 登录窗口拖拽
    start(event) {
      this.moveDoc.x = event.pageX - this.$refs.showDoc.offsetLeft;
      this.moveDoc.y = event.pageY - this.$refs.showDoc.offsetTop;
      event.currentTarget.style.cursor = "move";
      window.onmousemove = this.mouseMoveHandDoc;
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 鼠标抬起
    end(event) {
      window.onmousemove = null;
      event.currentTarget.style.cursor = "move";
    },
    // 手机登录窗口拖拽
    iphoneStart(event) {
      this.moveDoc.x = event.pageX - this.$refs.iphoneShowDoc.offsetLeft;
      this.moveDoc.y = event.pageY - this.$refs.iphoneShowDoc.offsetTop;
      event.currentTarget.style.cursor = "move";
      window.onmousemove = this.mouseMoveHandDoc;
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 鼠标抬起
    iphoneEnd(event) {
      window.onmousemove = null;
      event.currentTarget.style.cursor = "move";
    },
    // 鼠标移动
    mouseMoveHandDoc(event) {
      let moveTop = event.pageY - this.moveDoc.y + "px";
      let moveLeft = event.pageX - this.moveDoc.x + "px";
      this.$refs.showDoc.style.top = moveTop;
      this.$refs.showDoc.style.left = moveLeft;
      this.$refs.iphoneShowDoc.style.top = moveTop;
      this.$refs.iphoneShowDoc.style.left = moveLeft;
    },
    // 手机登录按钮
    async psLogin() {
      this.valueIphone == "" ? (this.warning = true) : (this.warning = false);
      this.warningCode == " "
        ? (this.warningCode = true)
        : (this.warningCode = false);
      if (this.valueCode) {
        let res;
        try {
          res = await verificationCode({
            phone: this.valueIphone,
            captcha: this.valueCode,
          });
        } catch (error) {
          console.log(error);

          return;
        }
        console.log(res);
        if (res == undefined) {
          this.$message.error("验证码失效");
        } else {
          this.warningCode = false;
          // 验证码登录
          if (res.data) {
            let res;
            try {
              res = await verificationLogin({
                phone: this.valueIphone,
                captcha: this.valueCode,
              });
            } catch (error) {
              console.log(error);
              return;
            }
            this.head = false;
            this.loginShow = false;
            this.$store.dispatch("setUser", res);
            this.userImg = this.$store.state.userImg;
            var d = new Date();
            d.setTime(d.getTime() + 10 * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toGMTString();
            document.cookie = "username" + "=" + res + ";" + expires;
          }
        }
      }
    },
    // 获取二维码key值
    async getKey() {
      let res;
      try {
        res = await getRqCodeKey({
          t: new Date().getTime(),
        });
      } catch (error) {
        console.log(error);
        return;
      }
      //   console.log(res);
      this.key = res.data.data.unikey;
      this.getRqCodeImg(); //获取二维码图片
      this.getRqCodeState(); //获取二维码状态
    },
    // 获取二维码图片
    async getRqCodeImg() {
      let res;
      try {
        res = await getRqCodeImg({
          key: this.key,
          qrimg: "base64",
          t: new Date().getTime(),
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // //   console.log(res);
      this.codeImg = res.data.data.qrimg;
    },
    // 获取二维码状态
    async getRqCodeState() {
      let res;
      try {
        res = await getRqCodeState({
          key: this.key,
          t: new Date().getTime(),
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.code = res.data.code;
    },
    // 刷新登录状态
    async loginRefresh() {
      let res;
      try {
        res = await axios.post("/api/login/refresh");
      } catch (error) {
        console.log(error);
        return;
      }
      console.log(res + "---------");
    },
    //登录状态
    async getLoginStatus() {
      const res = await axios({
        url: `/api/login/status?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      if (res.data.data.profile == null) {
        this.head = true;
        // 二维码状态
        // this.getRqCodeState();
      } else {
        // 用户信息
        this.getAccount();
      }
    },
    // 获取账号信息
    async getAccount() {
      let res;
      try {
        res = await getAccount({});
      } catch (error) {
        console.log(error);
        return;
      }
      this.userInfo = res.data;
      console.log(this.userInfo);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      this.loginShow = false;
      this.head = false;
    },
    // 退出登录
    async outLogin() {
      try {
        await outLogin({});
      } catch (error) {
        console.log(error);
        return;
      }
      this.head = true;
      this.userInfo = "";
      localStorage.setItem("userInfo", JSON.stringify({}));
      // 检查登录状态
      this.getLoginStatus();
    },
    // 输入框输入
    change(fn, delay) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        fn();
      }, delay);
    },
    // 获取搜索内容
    async getSearch() {
      let res;
      try {
        res = await search({
          keywords: this.searchValue,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // 单曲
      this.searchList.songs = res.data.result.song.songs;
      // 歌手
      this.searchList.artists = res.data.result.artist.artists;
      // 专辑
      this.searchList.albums = res.data.result.album.albums;
      // 歌单
      this.searchList.playLists = res.data.result.playList.playLists;
    },
    // 输入框请求
    search() {
      if (this.searchValue !== "") {
        // 获取搜索内容
        this.getSearch();
        this.searchShow = true;
      } else {
        this.searchShow = false;
      }
    },
    // 播放搜索单曲
    playSong(id) {
      this.$store.dispatch("playId", id);
      //跳转到歌词界面
      this.$router.push({
        name: "lyric",
        params: {
          id,
        },
      });
      localStorage.setItem("lyricId", id);
    },
    // 搜索结果歌手跳转
    routeSinger(id, name, src) {
      this.$router.push({
        name: "singerInformation",
        params: {
          singer: {
            id,
            name,
            src,
          },
        },
      });
      let singer = {
        id,
        name,
        src,
      };
      localStorage.setItem("singerId", JSON.stringify(singer));
    },
    //搜索结果专辑跳转
    routeAlbum(id) {
      this.$router.push({
        name: "disc",
        params: {
          id,
        },
      });
      localStorage.setItem("discId", id);
    },
    // 搜索结果歌单跳转
    routePlayList(id) {
      this.$router.push({
        name: "songListInformation",
        params: { id },
      });
      localStorage.setItem("songListId", id);
    },
  },

  mounted() {
    this.$store.commit("loginShow", this.loginShow);
    this.getLoginStatus();
  },
  destroyed() {
    clearInterval(this.setInterval);
  },
};
</script>
<style lang="less" scoped>
.nav {
  width: 100%;
  height: 70px;
  background-color: #242424;
  .navContent {
    width: 1100px;
    height: 70px;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .login {
      font-size: 12px;
      color: #787878;
      line-height: 70px;
      cursor: pointer;
      float: right;
      &:hover {
        color: #ccc;
        text-decoration: underline;
      }
    }
    .headPortrait {
      width: 52px;
      height: 45px;
      margin-top: 16px;
      margin-right: -15px;
      cursor: pointer;
      float: right;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .information {
        width: 23px;
        height: 17px;
        border-radius: 18px;
        font-size: 12px;
        color: white;
        text-align: center;
        border: 1px solid #242424;
        background-color: #c20c0c;
        float: right;
        position: relative;
        top: -36px;
        left: -4px;
      }
    }
    .InformationList {
      position: absolute;
      top: 57px;
      right: -56px;
      width: 158px;
      background: #2b2b2b;
      font-size: 12px;
      color: #ccc;
      border: 1px solid #202020;
      box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
      border-radius: 4px;
      z-index: 10000;
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 37px;
          text-align: center;
          line-height: 37px;
          position: relative;
          &:hover {
            background-color: #353535;
            cursor: pointer;
          }
          i {
            line-height: 37px;
            position: absolute;
            left: 30px;
            float: left;
          }
          .information {
            width: 23px;
            height: 17px;
            border-radius: 18px;
            font-size: 12px;
            color: white;
            text-align: center;
            border: 1px solid #242424;
            background-color: #c20c0c;
            position: absolute;
            top: 8px;
            right: 17px;
            p {
              margin-top: -10px;
            }
          }
        }
      }
      ul:nth-child(1),
      ul:nth-child(2) {
        border-bottom: 1px solid black;
      }
      .icon-triangle {
        position: absolute;
        top: -16px;
        left: 71px;
        border-top: 8px solid transparent;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #2b2b2b;
      }
    }
    .logo {
      cursor: pointer;
    }
    .Navigation {
      position: relative;
      ul {
        .bg {
          background-color: black;
          a {
            color: white;
          }
        }
        li {
          float: left;
          &:hover {
            background-color: black;
            color: white;
            cursor: pointer;
            a {
              color: white;
            }
          }
          a {
            padding: 0 19px;
            display: flex;
            height: 70px;
            font-size: 14px;
            color: #ccc;
            line-height: 70px;
          }
        }
      }
      .icon-hot {
        width: 26px;
        height: 13px;
        background-image: url("../../assets/img/hot.png");
        position: absolute;
        top: 20px;
        right: -20px;
      }
    }
    .searchBox {
      width: 158px;
      height: 32px;
      background-color: white;
      border-radius: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      > i {
        margin-left: 10px;
      }
      input {
        width: 120px;
        border: none;
        margin-right: 10px;
        &:focus {
          outline: none;
        }
      }
      .search {
        width: 230px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 17px 2px #333;
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 100;
        .title {
          width: 100%;
          line-height: 42px;
          border-bottom: 1px solid #d3d3d3;
          p {
            height: 42px;
            margin-left: 10px;
          }
        }
        .single {
          width: 100%;
          overflow: hidden;
          .single_l {
            width: 60px;
            padding: 7px;

            float: left;
            p {
              float: right;
            }
          }
          .single_r {
            width: 170px;

            box-sizing: border-box;
            float: right;
            border-bottom: 1px solid #d3d3d3;
            border-left: 1px solid #d3d3d3;
            ul {
              margin-top: 10px;
              li {
                margin-bottom: 5px;
                padding-left: 10px;
                p {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  span:first-child {
                    color: #507daf;
                  }
                }
                &:hover {
                  background-color: #e3e5e7;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .singer {
          width: 100%;
          overflow: hidden;
          .singer_l {
            width: 60px;
            padding: 7px;

            float: left;
            p {
              float: right;
            }
          }
          .singer_r {
            width: 170px;

            box-sizing: border-box;
            float: right;
            border-bottom: 1px solid #d3d3d3;
            border-left: 1px solid #d3d3d3;
            ul {
              margin-top: 10px;
              li {
                margin-bottom: 5px;
                padding-left: 10px;
                p {
                  color: #507daf;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
                &:hover {
                  background-color: #e3e5e7;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .disc {
          width: 100%;
          overflow: hidden;
          .disc_l {
            width: 60px;
            padding: 7px;

            float: left;
            p {
              float: right;
            }
          }
          .disc_r {
            width: 170px;

            box-sizing: border-box;
            float: right;
            border-bottom: 1px solid #d3d3d3;
            border-left: 1px solid #d3d3d3;
            ul {
              margin-top: 10px;
              li {
                margin-bottom: 5px;
                padding-left: 10px;
                p {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  span:first-child {
                    color: #507daf;
                  }
                }
                &:hover {
                  background-color: #e3e5e7;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .musicList {
          width: 100%;
          overflow: hidden;
          .musicList_l {
            width: 60px;
            padding: 7px;

            float: left;
            p {
              float: right;
            }
          }
          .musicList_r {
            width: 170px;

            box-sizing: border-box;
            float: right;
            border-bottom: 1px solid #d3d3d3;
            border-left: 1px solid #d3d3d3;
            ul {
              margin-top: 10px;
              li {
                margin-bottom: 5px;
                padding-left: 10px;
                p {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                &:hover {
                  background-color: #e3e5e7;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    .creatorCenter {
      width: 90px;
      height: 32px;
      border: 1px solid #4c4c4c;
      border-radius: 20px;
      color: #ccc;
      font-size: 12px;
      line-height: 32px;
      text-align: center;
      &:hover {
        color: white;
        border: 1px solid #ccc;
        cursor: pointer;
      }
    }
  }
  .landingPage {
    width: 530px;
    height: 372px;
    border-radius: 4px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.5);
    border: none;
    position: absolute;
    top: 278.5px;
    left: 820px;
    z-index: 1000;
    .landing {
      height: 38px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: #242424;
      display: flex;
      .text {
        width: 90%;
        height: 100%;
        font-size: 14px;
        line-height: 38px;
        margin-left: 15px;
        color: white;
        cursor: move;
      }
      .closePop {
        width: 10%;
        height: 100%;

        img {
          margin-left: 40%;
          margin-top: 28%;
          cursor: pointer;
        }
      }
    }
    .landingContent {
      height: 334px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background-color: white;
      .appCode {
        height: 85%;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .landingImg {
          margin-left: 100px;
          margin-top: 50px;
        }
        .scanCode {
          margin-right: 50px;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          h1 {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 20px;
          }
          p {
            font-size: 12px;
            width: 200px;
            line-height: 17px;
            color: rgba(0, 0, 0, 0.4);
            margin-top: 15px;
            text-align: center;
            span {
              color: #0c73c2;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }
      .loginMode {
        width: 120px;
        height: 30px;
        font-size: 12px;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 15px;
        margin: 0 auto;
        cursor: pointer;
        // background-color: pink;
      }
      .mode {
        line-height: 30px;
        margin-left: 10px;
      }
    }
    .otherLogin {
      padding: 40px 0 52px 0;
      background-color: white;
      .other {
        display: flex;
        justify-content: space-around;
        .iphone {
          padding: 0 35px 3px 40px;
          border-right: 1px dotted #ccc;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .cellPhoneNumber {
            width: 100%;
            height: 31px;
            color: white;
            background-color: #3080cc;
            border-radius: 4px;
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
            text-align: center;
            line-height: 31px;
            cursor: pointer;
          }
          .register {
            width: 100%;
            height: 31px;
            color: black;
            border-radius: 4px;
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
            text-align: center;
            line-height: 31px;
            cursor: pointer;
          }
        }
        .weChat {
          width: 148px;
          height: 205px;
          margin-right: 20px;
          ul > li {
            display: flex;
            font-size: 12px;
            line-height: 38px;
            margin-bottom: 16px;
            p {
              margin-left: 10px;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }
      .input {
        margin-top: 20px;
        margin-left: 40px;
        font-size: 10px;
        span {
          margin-left: 5px;
          color: #507daf;
          cursor: pointer;
          span {
            color: #ccc;
          }
        }
      }
    }
    .otherLogin > img {
      float: right;
      cursor: pointer;
    }
  }
  .iPhoneLandingPage {
    width: 530px;
    height: 372px;
    border-radius: 4px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.5);
    border: none;
    position: absolute;
    top: 278.5px;
    left: 820px;
    z-index: 1000;
    .landing {
      height: 38px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: #242424;
      display: flex;
      .text {
        width: 90%;
        height: 100%;
        font-size: 14px;
        line-height: 38px;
        margin-left: 15px;
        color: white;
        cursor: move;
      }
      .closePop {
        width: 10%;
        height: 100%;

        img {
          margin-left: 40%;
          margin-top: 28%;
          cursor: pointer;
        }
      }
    }
    .landingContent {
      height: 334px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .iphoneLanding {
        height: 300px;
        // background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        .iphoneLandingContent {
          width: 220px;
          height: 224px;
          // background-color: red;
          .iphoneNumber {
            height: 32px;
            border: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            .numberPrefix {
              width: 60px;
              height: 100%;
              border-right: 1px solid #ccc;
              display: flex;
              justify-content: space-between;
              cursor: pointer;
              p {
                // text-align: center;
                line-height: 32px;
                font-size: 13px;
              }
              .el-icon-caret-bottom {
                line-height: 32px;
                color: #ccc;
              }
            }
            .number {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              #p {
                width: 158px;
                margin-left: 10px;
                border: none;
                &:focus {
                  outline: none;
                }
              }
            }
          }
          .verificationCode {
            width: 218px;
            height: 32px;

            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            .codeNumber {
              width: 136px;
              height: 32px;
              border: 1px solid #ccc;
              #t {
                width: 120px;
                border: none;
                line-height: 30px;
                margin-left: 10px;
                // margin-top: -1px;
                &:focus {
                  outline: none;
                }
              }
            }
          }
          .smsLogin {
            width: 218px;
            height: 32px;
            margin-top: 15px;
            border: 1px solid #ccc;
            #t {
              line-height: 30px;
              border: none;
              margin-left: 10px;
              &:hover {
                outline: none;
              }
            }
            p {
              line-height: 30px;
              float: right;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
          .warning {
            margin-top: 5px;
            .el-icon-warning {
              font-size: 18px;
              color: #e33232;
              p {
                font-size: 12px;
                line-height: 18px;
                margin-left: 10px;
                float: right;
              }
            }
          }
          .passwordLogin {
            font-size: 13px;
            color: #666666;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            p {
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            .checkbox {
              display: flex;
              justify-content: space-between;
            }
          }
          .signIn {
            width: 100%;
            height: 31px;
            color: white;
            margin-top: 30px;
            background-color: #3080cc;
            border-radius: 4px;
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
            text-align: center;
            line-height: 31px;
            cursor: pointer;
          }
        }
      }
      .landing {
        height: 50px;
        background-color: #f7f7f7;
        border-radius: 0;
        border-top: 1px solid #ccc;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          cursor: pointer;
        }
      }
    }
    .register {
      height: 334px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .iphoneRegister {
        height: auto;
        // margin-top: -19px;
        display: flex;
        justify-content: center;
        align-items: center;
        .iphoneRegisterContent {
          width: 220px;
          height: 224px;
          label {
            font-size: 12px;
            color: #666;
          }
          .iphoneNumber {
            height: 32px;
            border: 1px solid #ccc;
            margin-top: 10px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            .numberPrefix {
              width: 60px;
              height: 100%;
              border-right: 1px solid #ccc;
              display: flex;
              justify-content: space-between;
              cursor: pointer;
              p {
                // text-align: center;
                line-height: 32px;
                font-size: 13px;
              }
              .el-icon-caret-bottom {
                line-height: 32px;
                color: #ccc;
              }
            }
            .number {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              #number {
                width: 158px;
                margin-left: 10px;
                border: none;
                &:focus {
                  outline: none;
                }
              }
            }
          }
          .password {
            height: 32px;
            border: 1px solid #ccc;
            margin-top: 10px;
            margin-bottom: 15px;
            #password {
              margin-left: 10px;
              border: none;
              line-height: 30px;
              &:focus {
                outline: none;
              }
            }
          }
          .passwordWarning {
            width: 100%;
            margin-top: -10px;
            ul > li {
              margin-bottom: 5px;
              .el-icon-success {
                font-size: 15px;
                color: #999;
                p {
                  font-size: 13px;
                  margin-left: 10px;
                  float: right;
                }
              }
              .el-icon-warning {
                font-size: 15px;
                color: #e33232;
                p {
                  font-size: 13px;
                  margin-left: 10px;
                  float: right;
                }
              }
            }
          }
          .nextStep {
            width: 100%;
            height: 31px;
            color: black;
            border-radius: 4px;
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
            text-align: center;
            line-height: 31px;
            margin-top: 10px;
            cursor: pointer;
          }
        }
      }
      .goLanding {
        width: 100%;
        height: 50px;
        background-color: #f7f7f7;
        border-radius: 0;
        border-top: 1px solid #ccc;
        font-size: 12px;
        line-height: 50px;
        p {
          cursor: pointer;
        }
      }
    }
    #iphoneCode {
      width: 218px;
      height: 194px;
      overflow-y: scroll;
      border: 1px solid #ccc;
      border-top: none;
      position: absolute;
      top: 103px;
      left: 155px;
      background-color: white;
      li {
        width: 100%;
        height: 30px;

        &:hover {
          background-color: #f1f1f1;
          cursor: pointer;
        }
        p {
          line-height: 30px;
          font-size: 12px;
        }
        p:first-child {
          float: left;
          margin-left: 10px;
        }
        p:last-child {
          margin-right: 10px;
          float: right;
        }
      }
    }
  }
}
/deep/ .el-button {
  width: 75px;
  height: 32px;
  span {
    margin-left: -10px;
  }
}
</style>

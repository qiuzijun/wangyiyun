<template>
  <div class="songs">
    <div class="name">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          :title="item.name"
          :name="item.id"
          v-for="item in list"
          :key="item.id"
        >
          <div
            v-for="data in item.songs"
            :key="data.id"
            class="song"
            @click="switchSongs(item.id, data.id, data.name)"
          >
            {{ data.name }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="list">
      <div class="l_name">
        <p>{{ titleName }}</p>
      </div>
      <div class="letter">
        <ul>
          <li v-for="item in letter" :key="item.id">
            <p @click="switchName(item.name)">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <div class="songsImg">
        <ul>
          <li v-for="item in artistList.slice(0, 10)" :key="item.id">
            <div class="img">
              <img v-lazy="item.picUrl" alt="" width="130px" height="130px" />
              <img
                src="../../assets/img/icon-coverall.png"
                alt=""
                width="130px"
                height="130px"
              />
            </div>
            <div class="s_m_img">
              <p @click="Jump(item.id, item.name, item.picUrl)">
                {{ item.name }}
              </p>
              <img
                src="../../assets/img/r_zhu.png"
                alt=""
                v-show="item.accountId == undefined ? false : true"
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="songsText">
        <ul>
          <li
            v-for="item in artistList.slice(11, artistList.length - 1)"
            :key="item.id"
          >
            <div class="s_m_img">
              <p @click="Jump(item.id, item.name, item.picUrl)">
                {{ item.name }}
              </p>
              <img
                src="../../assets/img/r_zhu.png"
                alt=""
                v-show="item.accountId == undefined ? false : true"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { artist, hotSinger } from "@/api/http.js";
export default {
  data() {
    return {
      activeNames: ["1"],
      // 歌手列表
      list: [
        {
          id: 7,
          name: "华语",
          songs: [
            { id: 1, name: "华语男歌手" },
            { id: 2, name: "华语女歌手" },
            { id: 3, name: "华语组合/乐队" },
          ],
        },
        {
          id: 96,
          name: "欧美",
          songs: [
            { id: 1, name: "欧美男歌手" },
            { id: 2, name: "欧美女歌手" },
            { id: 3, name: "欧美组合/乐队" },
          ],
        },
        {
          id: 8,
          name: "日本",
          songs: [
            { id: 1, name: "日本男歌手" },
            { id: 2, name: "日本女歌手" },
            { id: 3, name: "日本组合/乐队" },
          ],
        },
        {
          id: 16,
          name: "韩国",
          songs: [
            { id: 1, name: "韩国男歌手" },
            { id: 2, name: "韩国女歌手" },
            { id: 3, name: "韩国组合/乐队" },
          ],
        },
        {
          id: 0,
          name: "其他",
          songs: [
            { id: 1, name: "其他男歌手" },
            { id: 2, name: "其他女歌手" },
            { id: 3, name: "其他组合/乐队" },
          ],
        },
      ],
      // 字母列表
      letter: [
        { id: 0, name: "热门" },
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
        { id: 4, name: "D" },
        { id: 5, name: "E" },
        { id: 6, name: "F" },
        { id: 7, name: "G" },
        { id: 8, name: "H" },
        { id: 9, name: "I" },
        { id: 10, name: "J" },
        { id: 11, name: "K" },
        { id: 12, name: "L" },
        { id: 13, name: "M" },
        { id: 14, name: "N" },
        { id: 15, name: "O" },
        { id: 16, name: "P" },
        { id: 17, name: "Q" },
        { id: 18, name: "R" },
        { id: 19, name: "S" },
        { id: 20, name: "T" },
        { id: 21, name: "U" },
        { id: 22, name: "V" },
        { id: 23, name: "W" },
        { id: 24, name: "X" },
        { id: 25, name: "Y" },
        { id: 26, name: "Z" },
        { id: 27, name: "其他" },
      ],
      initial: "", //歌手名首字母
      type: -1, //歌手类型
      area: -1, //国家
      titleName: "热门歌手",
      // 歌手列表
      artistList: [],
    };
  },
  methods: {
    // 获取歌手
    async getArtist() {
      let res;
      try {
        res = await artist({
          limit: 100, //页数据
          offset: 1, //页码
          type: this.type, //歌手类型
          area: this.area, //国家
          initial: this.initial, //歌手名首字母
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.artistList = res.data.artists;
    },
    // 获取热门歌手
    async getHotSongs() {
      let res;
      try {
        res = await hotSinger({});
      } catch (error) {
        console.log(error);
        return;
      }
      this.artistList = res.data.artists;
    },
    // 根据拼音切换歌手
    switchName(code) {
      if (code == "热门") {
        this.getHotSongs();
        this.titleName = "热门歌手";
      } else if (code == "其他") {
        this.initial = 0;
        this.getArtist();
      } else {
        this.initial = code.toLowerCase();
        this.getArtist();
      }
    },
    //切换歌手种类
    switchSongs(countryId, id, name) {
      this.type = id;
      this.area = countryId;
      this.titleName = name;
      this.getArtist();
    },
    // 跳转歌手信息页面
    Jump(id, name, src) {
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
  },
  mounted() {
    // // 获取歌手
    // this.getArtist();
    // 热门歌手
    this.getHotSongs();
  },
};
</script>
<style lang="less" scoped>
.songs {
  width: 980px;
  border: 1px solid #d3d3d3;
  margin: 0 auto;
  overflow: hidden;
  .name {
    width: 180px;
    height: 400px;
    float: left;
  }
  .list {
    width: 798px;
    // height: 400px;
    background-color: white;
    padding: 40px;
    border-left: 1px solid #d3d3d3;
    float: right;
    .l_name {
      width: 100%;
      height: 42px;
      border-bottom: 2px solid red;
      > p {
        font-size: 24px;
      }
    }
    .letter {
      width: 100%;
      height: 42px;
      overflow: hidden;
      ul {
        margin-top: 9px;
        li {
          padding: 5px 8px 5px 8px;
          float: left;
          p {
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        li:first-child {
          background-color: red;
          color: white;
          border-radius: 3px;
        }
      }
    }
    .songsImg {
      width: 100%;
      // height: 400px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      ul {
        overflow: hidden;
        margin-left: -18px;
        li {
          width: 147px;
          height: 184px;
          float: left;
          padding: 0 0 30px 17px;
          .img {
            height: 130px;
            position: relative;
            cursor: pointer;
            img:first-child {
              position: absolute;
              top: 0;
            }
            img:last-child {
              position: absolute;
              top: 0;
            }
          }
          .s_m_img {
            width: 100%;
            height: 20px;
            margin-top: 5px;
            p {
              float: left;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            img {
              float: right;
            }
          }
        }
      }
    }
    .songsText {
      width: 100%;
      ul {
        overflow: hidden;
        margin-left: -19px;
        margin-top: 20px;
        li {
          width: 147px;
          height: 30px;
          float: left;
          padding: 0 0 0 17px;
          .s_m_img {
            width: 100%;
            p {
              float: left;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
/deep/ .el-collapse-item__header {
  border: none;
  background-color: transparent;
  padding-left: 25px;
}
/deep/ .el-collapse {
  user-select: none;
  border: none;
  .song {
    margin-left: 50px;
    margin-top: 15px;
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}
/deep/.el-collapse-item__wrap {
  background-color: transparent;
}
</style>

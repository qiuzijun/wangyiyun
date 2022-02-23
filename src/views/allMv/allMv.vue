<template>
  <div class="allMv">
    <!-- 分类 -->
    <div class="classification">
      <ul>
        <li v-for="item in classification" :key="item.id">
          <span>
            {{ item.name }}:
            <span
              v-for="(data, index) in item.list"
              :key="index"
              :class="data.default ? 'color' : ''"
              @click="mvClick(index, data.name, item.name, item.list)"
            >
              {{ data.name }}
            </span>
          </span>
        </li>
      </ul>
      <p class="count">
        共<span style="color: #ff5c38; font-size: 13px">{{ mvList.count }}</span
        >个筛选结果
      </p>
    </div>
    <!-- mv列表 -->
    <div class="content">
      <ul>
        <li v-for="item in mvList.data" :key="item.id">
          <el-image :src="item.cover" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <p class="name" @click="routeMv(item.id)">{{ item.name }}</p>
          <p class="singerName">
            <span v-for="data in item.artists" :key="data.id">
              {{ data.name }}&nbsp;&nbsp;
            </span>
          </p>
          <i class="el-icon-video-play" @click="routeMv(item.id)"></i>
        </li>
      </ul>
    </div>
    <!-- 分页 -->
    <div class="page">
      <Page
        :total="mvList.count"
        :page-size="20"
        @on-change="pageIndexChange"
        @on-page-size-change="pageSizeChange"
        show-total
        show-sizer
        :page-size-opts="[20, 30, 40, 50]"
        class="p_con"
      ></Page>
    </div>
  </div>
</template>
<script>
import { getAllMv } from "@/api/http.js";
export default {
  data() {
    return {
      mvList: [], //mv列表
      //mv分类
      classification: [
        {
          id: 7647567,
          name: "热度",
          list: [
            {
              name: "上升最快",
              default: true,
            },
            {
              name: "最热",
              default: false,
            },
            {
              name: "最新",
              default: false,
            },
          ],
        },
        {
          id: 75834,
          name: "地区",
          list: [
            {
              name: "全部",
              default: true,
            },
            {
              name: "内地",
              default: false,
            },
            {
              name: "港台",
              default: false,
            },
            {
              name: "欧美",
              default: false,
            },
            {
              name: "日本",
              default: false,
            },
            {
              name: "韩国",
              default: false,
            },
          ],
        },
        {
          id: 6425654,
          name: "类型",
          list: [
            {
              name: "全部",
              default: true,
            },
            {
              name: "官方版",
              default: false,
            },
            {
              name: "原生",
              default: false,
            },
            {
              name: "现场版",
              default: false,
            },
            {
              name: "网易出品",
              default: false,
            },
          ],
        },
      ],
      //mv参数
      parameter: {
        area: "全部", //地区
        type: "全部", //类型
        order: "上升最快", //排序
        limit: 50, //取出数量
        offset: 0, //偏移数量
      },
    };
  },
  methods: {
    //获取全部MV
    async getAllMv() {
      let res;
      try {
        res = await getAllMv(
          this.parameter //mv参数
        );
      } catch (error) {
        console.log(error);
        return;
      }
      this.mvList = res.data;
    },
    // 分类选择
    mvClick(i, name, nameS, data) {
      // 样式的有无
      data.forEach((item, index) => {
        if (index !== i) {
          item.default = false;
        } else {
          item.default = true;
        }
      });
      //   改变参数
      switch (nameS) {
        case "地区":
          this.parameter.area = name;
          //获取全部MV
          this.getAllMv();
          break;
        case "类型":
          this.parameter.type = name;
          //获取全部MV
          this.getAllMv();
          break;
        case "热度":
          this.parameter.order = name;
          //获取全部MV
          this.getAllMv();
          break;

        default:
          break;
      }
    },
    // 页码
    pageIndexChange(i) {
      this.parameter.offset = i;
      //获取全部MV
      this.getAllMv();
    },
    // 页数据条数
    pageSizeChange(i) {
      this.parameter.limit = i;
      //获取全部MV
      this.getAllMv();
    },
    // 播放mv
    routeMv(id) {
      this.$router.push({
        name: "mv",
        params: {
          id,
        },
      });
      localStorage.setItem("mvId", id);
    },
  },
  mounted() {
    //获取全部MV
    this.getAllMv();
  },
};
</script>
<style lang="less" scoped>
.allMv {
  width: 982px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #d3d3d3;
  padding: 20px;
  .classification {
    width: 100%;
    height: 100px;
    padding: 0 20px 0 20px;
    position: relative;
    ul {
      li {
        margin-bottom: 10px;
        > span {
          span {
            margin-left: 5px;
            padding-right: 5px;
            padding-left: 8px;
            &:hover {
              color: #ff5c38;
              cursor: pointer;
            }
          }
          .color {
            color: #ff5c38;
            background-color: #d3d3d3;
            border-radius: 20px;
          }
        }
      }
    }
    .count {
      position: absolute;
      top: 0;
      right: 20px;
    }
  }
  .content {
    width: 100%;
    ul {
      overflow: hidden;
      li {
        width: 154px;
        height: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0 20px 17px;
        float: left;
        position: relative;
        .name {
          &:hover {
            color: #ff5c38;
            cursor: pointer;
          }
        }
        .singerName {
          span {
            &:hover {
              color: #ff5c38;
              cursor: pointer;
            }
          }
        }
        .el-icon-video-play {
          font-size: 0px;
          color: white;
          position: absolute;
          top: 40%;
          left: 55%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity, font-size 0.5s;
        }
      }
    }
  }
  .page {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/deep/.content {
  .el-image {
    width: 137px;
    height: 103px;
    img {
      width: 137px;
      height: 103px;
      transition: all 0.2s;
    }
    .image-slot {
      width: 137px;
      height: 103px;
    }
  }
  ul {
    li {
      &:hover {
        img {
          width: 140px;
          height: 110px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .el-icon-video-play {
          font-size: 40px;
          opacity: 1;
          transition: opacity, font-size 0.5s;
          cursor: pointer;
          &:hover {
            color: #ff5c38;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="paging">
    <div data-v-a72348a4="" class="paging-bar">
      <div data-v-a72348a4="" class="paging-record-info">
        Tổng số: <span style="font-weight: bold">{{ totalEmployees }}</span> bản
        ghi
      </div>

      <div data-v-a72348a4="" class="paging-option">
        <div class="group-page-index">
          <div value="10" class="show-index-per-page" @click="showListIndex">
            {{ sizePage }} bản ghi trên 1 trang
          </div>
          <div
            class="list-index-page"
            :class="{ 'hide-list-index-page': isHide }"
          >
            <div class="item-index-page" value="100" @click="rePagingData(100)">
              <a href="#">100 bản ghi trên 1 trang</a>
            </div>
            <div class="item-index-page" value="50" @click="rePagingData(50)">
              <a href="#">50 bản ghi trên 1 trang</a>
            </div>
            <div class="item-index-page" value="30" @click="rePagingData(30)">
              <a href="#">30 bản ghi trên 1 trang</a>
            </div>
            <div class="item-index-page" value="20" @click="rePagingData(20)">
              <a href="#">20 bản ghi trên 1 trang</a>
            </div>
            <div class="item-index-page" value="10" @click="rePagingData(10)">
              <a href="#">10 bản ghi trên 1 trang</a>
            </div>
          </div>
        </div>
        <paginate
          :page-count="totalPage"
          :prev-text="'Trước'"
          :next-text="'Sau'"
          :prev-link-class="'page-prev'"
          :next-link-class="'page-next'"
          :page-link-class="'page-link'"
          :container-class="'container-page'"
          :click-handler="clickNextPrePage"
          :page-class="'page-number'"
        ></paginate>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Paginate from "vuejs-paginate";
import { baseURL } from "../../config/dev.env.js";
export default {
  components: {
    Paginate,
  },
  props: 
  ['searchNameCode']
  ,
  created() {
    this.getTotalEmployee();
    this.showPrePage = false;
  },
  methods: {
    /**
     * Lấy tổng số bản ghi
     * Created by CMChau 10/5/2021
     */
    getTotalEmployee() {
      axios.get(`${baseURL}/Employees/totalFilter?textFilter=${this.searchNameCode}`).then((res) => {
        this.totalEmployees = res.data;
        this.totalPage = Math.ceil(this.totalEmployees / this.sizePage);
        // this.showPrePageNumber();
      });
    },
    clickNextPrePage(index) {
      this.currentPage = index;
      var size = this.sizePage;
      this.pagingEmployeeData(index, size);
    },
    /**
     * Chọn phân trang
     * Created by CMChau 10/5/2021
     */
    rePagingData(size) {
      this.sizePage = size;
      var index = this.currentPage;
      // this.sizePage = parseInt(event.target.value);
      this.pagingEmployeeData(index, size);
      this.isHide = true;
    },
    /**
     * Lấy dữ liệu phân trang mới
     * Created by CMChau 10/5/2021
     */
    pagingEmployeeData(pageindex, pagesize) {
      this.currentPage = pageindex;
      this.$emit("checkFilter", [pageindex], [pagesize]);
      // this.showPrePageNumber();
      this.getTotalEmployee();
    },
    showListIndex() {
      this.isHide = false;
    },
  },
  data() {
    return {
      currentPage: 1,
      sizePage: 10,
      totalEmployees: 0,
      totalPage: 0,
      isHide: true,
    };
  },
};
</script>
<style scoped>
.group-pre-page {
  display: none;
}
.group-next-page {
  display: none;
}
.group-last-page {
  display: none;
}
.group-page {
  display: flex;
}
.current-page-number {
  font-weight: bolder;
}
.show-index-per-page {
  height: 40px;
  width: 180px;
  border: 1px solid #bbb;
  align-content: center;
  align-items: center;
  justify-content: center;
  display: flex;
  bottom: 0;
  cursor: pointer;
}
.item-index-page {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 181px;
  cursor: pointer;
}
.item-index-page:hover {
  background-color: #08aa0a;
  color: #fff;
}
.item-index-page:hover a {
  color: #fff;
}
.item-index-page a:focus {
  background-color: #08aa0a;
  color: #fff;
}
.list-index-page {
  position: absolute;
  width: 180px;
  bottom: 52px;
  background-color: #fff;
  border: 1px solid #bbb;
}
.hide-list-index-page {
  display: none;
}
.page-prev,
.page-next {
  border: 1px solid #bbb;
  border-radius: 4px;
}
.container-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin-left: 16px;
  margin-right: 16px;
  padding-left: 0;
  width: 200px;
}
.page-number {
  font-weight: 700;
  margin-left: 4px;
  margin-right: 4px;
}
.page-link {
  width: 21px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-link:focus {
  font-weight: bold;
}
</style>
<template>
  <div>
    <!-- <div v-bind:key="componentKey"> -->
    <div class="page-title">
      <div class="page-left">NHÂN VIÊN</div>
      <div class="page-right">
        <button
          id="btnAdd"
          class="btn-default"
          style="backgound-color: #019138"
          v-on:click="btnAddOnClick()"
        >
          <div>Thêm mới nhân viên</div>
        </button>
      </div>
    </div>
    <div class="toolbar">
      <div class="toolbarSelect">
        <!-- <Combobox
          :departments="departments"
          :positions="positions"
          :key="comboboxKey"
          :employees="employees"
        /> -->
        <div>
          <input
            id="imput-search"
            type="text"
            class="input-search"
            placeholder="Tìm kiếm theo mã, tên nhân viên"
            v-model="searchNameCode"
            @input="filterEmployee"
          />
        </div>
      </div>

      <div class="toolbarButton">
        <button class="btn-refresh" v-on:click="btnRefresh()"></button>
      </div>
    </div>
    <div class="grid">
      <table id="tblListEmployee" border="0">
        <thead style="border: none">
          <tr style="border: none">
            <th><input type="checkbox" style="height: 20px; width: 20px" /></th>
            <th style="border-right: 1px solid #bbb">MÃ NHÂN VIÊN</th>
            <th>TÊN NHÂN VIÊN</th>
            <th>NGÀY SINH</th>
            <th>SỐ CMND</th>
            <th>CHỨC DANH</th>
            <th>TÊN ĐƠN VỊ</th>
            <th>SỐ TÀI KHOẢN</th>
            <th>TÊN NGÂN HÀNG</th>
            <th>CHI NHÁNH NGÂN HÀNG</th>
            <th
              style="
                border-right: none;
                position: sticky;
                right: 0;
                border-left: 1px solid #bbb;
              "
            >
              CHỨC NĂNG
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in employees"
            :key="item.employeeId"
            @dblclick="dblRowOnClick(item.employeeId)"
            @click="selectedRowId(item.employeeId, item.employeeCode)"
            :class="{ hightlight: item.employeeId == selectedId }"
          >
            <td><input type="checkbox" style="height: 20px; width: 20px" /></td>
            <td>{{ item.employeeCode }}</td>
            <td>{{ item.fullName }}</td>
            <td>{{ formatDate(item.dateOfBirth) }}</td>
            <td>{{ item.identityNumber }}</td>
            <td>{{ item.positionName }}</td>
            <td>{{ item.departmentName }}</td>
            <td>{{ item.bankAccount }}</td>
            <td>{{ item.bankName }}</td>
            <td>{{ item.bankBranch }}</td>
            <td class="activity-table">
              <div class="group-btn-delete">
                <div class="delete-row" style="color: blue; padding-right: 5px">
                  <button
                    class="btn-default btn-delete-row"
                    @click="dblRowOnClick(item.employeeId)"
                  >
                    Sửa
                  </button>
                </div>
                <button class="btn-delete-row list-select-down">
                  <div
                    class="arrow-down arrow-down-list-delete"
                    style="z-index: 1"
                  >
                    <div class="list-arrow-delete">
                      <div class="select-list-item">Nhân bản</div>
                      <div
                        class="select-list-item"
                        @click="btnOnDelete(item.employeeId)"
                      >
                        Xóa
                      </div>
                      <div class="select-list-item">Sử dụng</div>
                    </div>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      @getEmployeesData="getEmployeesData"
      @checkFilter="checkFilter"
      :searchNameCode="searchNameCode"
      ref="paging"
    />
    <EmployeeDetail
      ref="dialogEmployee"
      :searchNameCode="searchNameCode"
      :isHide="isHide"
      @hideDialogDetail="hideDialogDetail"
      :employee="employee"
      @getEmployeesData="getEmployeesData"
      :selectedId="selectedId"
      :formMode="formMode"
      :newEmployeeCode="newEmployeeCode"
      :departments="departments"
      :positions="positions"
      :messageNotification="messageNotification"
      :showNotic="showNotic"
      @noticficationData="noticficationData"
      @formatFormDate="formatDate"
    />
    <DialogConfirm
      :isHideDialogConfirm="isHideDialogConfirm"
      @hideDialogDetail="hideDialogDetail"
      :selectedId="selectedId"
      @getEmployeesData="getEmployeesData"
      @deleteDataOnRow="deleteDataOnRow"
      :employee="employee"
      :messageDelete="messageDelete"
      :messageNotification="messageNotification"
      :showNotic="showNotic"
    />
    <Noticfication
      :messageNotification="messageNotification"
      :showNotic="showNotic"
    />
    <div class="loading" :class="{ displayNone: isDone }">
      <div class="sprite-loading"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail.vue";
import DialogConfirm from "../../Commons/DialogConfirm.vue";
import moment from "moment";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import Noticfication from "../../Commons/Noticfication.vue";
// import Combobox from "./Combobox.vue";
import Pagination from "../../Commons/Pagination.vue";
import { baseURL } from "./../../../config/dev.env.js";
export default {
  components: {
    EmployeeDetail,
    DialogConfirm,
    Noticfication,
    // Combobox,
    Pagination,
  },
  props: {},
  //
  created() {
    // this.getAllEmployeesData();
    this.getDepartmentData();
    this.getEmployeesData(1, 10);
    // // this.getPositionData();
    // this.forcedRender();
  },
  mounted() {},
  computed: {},
  methods: {
    /**kiểm tra xem có lọc hay không
     *
     */
    checkFilter(a, b) {
      this.pageIndex = a;
      this.pageSize = b;
      var c = this.searchNameCode;
      if (this.searchNameCode == null || this.searchNameCode == "") {
        this.getEmployeesData(a, b);
      } else {
        this.filterEmployee(a, b, c);
      }
    },
    /**
     * Lọc phân trang
     * Created by CMChau 13/5/2021
     */
    filterEmployee(index, size, text) {
      index = this.pageIndex;
      size = this.pageSize;
      text = this.searchNameCode;
      this.$refs.paging.getTotalEmployee();
      if (text == null || text == "") {
        this.getEmployeesData(index, size);
      } else {
        axios
          .get(
            `${baseURL}/Employees/Paging/Filter?pageIndex=${index}&pageSize=${size}&textFilter=${text}`
          )
          .then((res) => {
            this.employees = res.data;
            this.isDone = true;
            this.showNotic = true;
            this.hideNoticfication();
          });
      }
    },
    /**
     * Focus vào input Mã nhân viên
     * Created by CMChau (9/5/2021)
     */
    focusInput() {
      // alert(1);
      this.$nextTick(() =>
        this.$refs.dialogEmployee.$refs.employeeCode.focus()
      );
    },
    /***
     * Hiển thị dialog thêm nhân viên khi bấm nút thêm
     * Created by CMChau (9/5/2021)
     */
    btnAddOnClick() {
      this.isHide = false;
      this.employee = {};
      this.formMode = "Add"; //Xác định form là thêm mới
      this.getAutoEmployeeCode();
      this.focusInput();
    },
    /**
     * Double click vào 1 hàng hiện form chi tiết
     * Created by CMChau(9/5/2021)
     */
    dblRowOnClick(selectedId) {
      this.isHide = false;
      //Lấy data của 1 nhân viên thông qua API
      this.getInforEmployee(selectedId);
      this.formMode = "Edit"; //Xác định form là sửa
      this.focusInput();
    },
    /**
     * Bấm nút xóa hiện dialog xác nhận xóa
     * Created by CMChau (9/5/2021)
     * Nếu không chọn dòng nào thì không hoạt động
     */
    btnOnDelete() {
      if (this.selectedId == null) return "";
      else {
        this.isHideDialogConfirm = false;
        console.log(this.selectedId);
        this.messageDelete =
          "Bạn có chắc chắn muốn xóa nhân viên có mã<" +
          this.employeeCode +
          "> không?";
      }
    },
    //truyền tham số vào component con để ẩn dialog khi bấm nút X hoặc hủy
    hideDialogDetail() {
      this.isHide = true;
      this.isHideDialogConfirm = true;
    },
    /**
     * Lấy id của 1 nhân viên khi focus vào 1 hàng
     * Lấy mã nhân viên
     * Created by CMChau (9/5/2021)
     */
    selectedRowId(employeeId, employeeCode) {
      this.selectedId = employeeId;
      this.employeeCode = employeeCode;
      console.log(employeeId);
      this.hideBtnDelete = false;
    },
    /**
     * Bấm nút refresh sẽ tải lại dữ liệu của trang
     * Created by CMChau (9/5/2021)
     */
    btnRefresh() {
      var Index = this.pageIndex;
      var Size = this.pageSize;
      this.getEmployeesData(Index, Size);
    },
    /**
     * gọi API để lấy danh sách nhân viên theo phân trang
     * Create by CMChau(8/5/2021)
     */
    getEmployeesData(index, size) {
      axios
        .get(`${baseURL}/Employees/Paging?pageIndex=${index}&pageSize=${size}`)
        .then((res) => {
          this.employees = res.data;
          this.pageIndex = index;
          this.pageSize = size;
          //Ẩn modal đang lấy dữ liệu
          this.isDone = true;
          this.showNotic = true;
          this.hideNoticfication();
          // return true;
          // this.employee.dateOfbirth = this.formatFormDate(
          //   this.employee.dateOfbirth
          // );
          console.log(res.data);
        });
    },
    /**
     * gọi API để lấy danh sách nhân viên
     * Create by CMChau(8/5/2021)
     */
    // getAllEmployeesData() {
    //   axios.get(`${baseURL}/Employees`).then((res) => {
    //     this.allEmployees = res.data;
    //     console.log(res.data);
    //     console.log(this.allEmployees);
    //   });
    // },
    // /**
    //  * Định dạng lương cơ bản
    //  * Created by CMChau(4/4/2021)
    //  * Ví dụ: 2000000 -> 2.000.000 VND
    //  */
    // formatPrice(value) {
    //   let val = value / 1;
    //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // },
    /**
     * Lấy thông tin chi tiết của 1 nhân viên qua API
     * Created by CMChau (9/5/2021)
     */
    getInforEmployee(selectedId) {
      axios
        .get(`${baseURL}/Employees/` + selectedId)
        .then((res) => {
          this.employee = res.data;
          this.newEmployeeCode = this.employeeCode;
          this.employee.dateOfBirth = this.formatFormDate(
            this.employee.dateOfBirth
          );
          this.employee.identityDate = this.formatFormDate(
            this.employee.identityDate
          );
          // this.employee.JoinDate = this.formatFormDate(this.employee.JoinDate);
          // this.employee.Salary =
          //   this.formatPrice(this.employee.Salary) + " (VNĐ)";
          console.log(this.employee.dateOfBirth);
        })
        .catch((res) => {
          console.log(res.status);
        });
    },
    /**
     * Xóa 1 bản ghi tại dòng được chọn
     * Created by CMChau (9/5/2021)
     */
    deleteDataOnRow(selectedId) {
      this.isDone = false;
      axios.delete(`${baseURL}/Employees/` + selectedId).then((res) => {
        console.log(res.status);
        this.getEmployeesData(1, 10);
        this.hideBtnDelete = true;
        this.messageNotification = "Xóa thành công";
      });
    },
    /***
     * Định dạng ngày sinh trong bảng
     * Created by CMChau (9/5/2021)
     * Hiển thị thành DD-MM-YYYY
     */
    formatDate(date) {
      if (!date) return "";
      else {
        return moment(date).format("DD/MM/YYYY");
      }
    },
    /**
     * Format lại ngày tháng trong form
     * Created by CMChau(9/5/2021)
     */
    formatFormDate(date) {
      if (!date) return "";
      else {
        return moment(date, "YYYY-MM-DD hh:mm").format("YYYY-MM-DD");
      }
    },
    /**
     * Lấy mã nhân viên tự động tăng
     * Created by CMChau (9/5/2021)
     */
    getAutoEmployeeCode() {
      axios.get(`${baseURL}/Employees/NewEmployeeCode`).then((res) => {
        this.newEmployeeCode = res.data;
        // console.log(this.newEmployeeCode);
      });
    },
    /**
     * Lấy danh sách phòng ban qua API
     * Created by CMChau (9/5/2021)
     */
    getDepartmentData() {
      axios.get(`${baseURL}/Departments`).then((res) => {
        this.departments = res.data;
        this.forcedRender();
      });
    },
    // /**
    //  * Lấy danh sách vị trí công việc
    //  * Created by CMChau (9/5/2021)
    //  */
    // getPositionData() {
    //   axios.get(`${baseURL}/Positions`).then((res) => {
    //     this.positions = res.data;
    //     this.forcedRender();
    //   });
    // },
    /**
     * Gọi Api để lọc theo select
     */
    // onFilterDepartment(selectDepartmentId) {
    //   axios
    //     .get(`${baseURL}/Department/Filter/` + selectDepartmentId)
    //     .then((res) => {
    //       this.employees = res.data;
    //     });
    // },
    // /**
    //  * Gọi Api để lọc theo select position
    //  */
    // onFilterPosition(selectPositionId) {
    //   axios
    //     .get(`${baseURL}/Positions/Filter/` + selectPositionId)
    //     .then((res) => {
    //       this.employees = res.data;
    //     });
    // },
    // /**
    // Binding tên phòng ban vào form lọc
    // Created by CMChau (14/4/2021)
    //  */
    // selectNameDepartment(name) {
    //   this.selectedDepartmentname = name;
    //   this.changeBackground = true;
    // },
    // //Binding tên vị trí
    // selectNamePosition(name) {
    //   this.selectedPositionName = name;
    // },
    // /**
    //  *Chọn tất cả phòng ban
    //  *Created by CMChau(15/4/2021)
    //  *
    //  */
    // loadDataDepartment() {
    //   this.selectedDepartmentname = "Tất cả phòng ban";
    // },
    // /***
    //  * Chọn tất cả vị trí
    //  * Created by CMChau(15/4/2021)
    //  */
    // loadDataPosition() {
    //   this.selectedPositionName = "Tất cả vị trí";
    // },
    /**
     * Hiển thị thông báo thao tác thành công
     * Created by CMChau(18/4/2021)
     */
    hideNoticfication() {
      setTimeout(() => (this.showNotic = true), 3000);
    },
    noticficationData(message) {
      this.showNotic = false;
      this.messageNotification = message;
      this.hideNoticfication();
    },
    forcedRender() {
      // this.comboboxKey += 1;
    },
  },

  data() {
    return {
      searchNameCode: "",
      pageIndex: 1,
      pageSize: 10,
      comboboxKey: 0,
      isDone: true,
      isHide: true,
      allEmployees: [],
      employees: [],
      employee: {},
      gender: null,
      selectedId: null,
      employeeId: null,
      isHideDialogConfirm: true,
      formMode: "Add",
      messageDelete: null,
      employeeCode: null,
      newEmployeeCode: null,
      departments: [],
      positions: [],
      selectDepartmentId: null,
      selectPositionId: null,
      isDisable: false,
      hideBtnDelete: true,
      messageDepartment: "",
      messagePosition: "",
      dataPosition: new DataManager({
        url: "",
        adaptor: new WebApiAdaptor(),
        crossDomain: false,
      }),
      dataFieldsPosition: { value: "PositionId", text: "PositionName" },
      // dataDepartment: new DataManager({
      //   url: "http://api.manhnv.net/api/Department",
      //   adaptor: new WebApiAdaptor(),
      //   crossDomain: false,
      // }),
      // dataFieldsDepartment: { value: "DepartmentId", text: "DepartmentName" },
      selectedDepartmentname: "Tất cả phòng ban",
      selectedPositionName: "Tất cả vị trí",
      changeBackground: false,

      currentPage: 1,
      bootstrapPagination: {
        // http://getbootstrap.com/docs/4.1/components/pagination/
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disable",
        button: "page-link",
      },
      customLabels: {
        first: "First",
        prev: "Previous",
        next: "Next",
        last: "Last",
      },
      messageNotification: "",
      showNotic: true,
      positionName: [],
    };
  },
};
</script>

<style scoped >
@import url(../../../assets/css/EmployeeCss/employee.css);

.change-hightlight::after {
  background-color: #019160;
}
.combobox-position {
  border: 1px solid #bbbbbb;
  width: 180px;
  height: 40px;
  border-radius: 4px;
  margin-right: 10px;
}
.combobox-position span {
  border-bottom: none !important;
}
.combobox-position option:focus {
  background-color: #019160 !important;
  color: #ffffff;
}
.combobox-position input {
  border: none;
}
.hightlight {
  background: #e5e5e5;
  outline: none;
  color: #000000;
}
#dropDown {
  width: 180px;
  margin-right: 0 !important;
  position: relative;
}

#drop-down-input {
  position: relative;
}

#drop-down-input .select-item {
  height: 38px;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#drop-down-list {
  position: absolute;
  width: 178px;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  visibility: hidden;
  border: 1px solid #bbbbbb;
  z-index: 1;
  background-color: #ffffff;
}

#drop-down-list .drop-down-item {
  height: 40px;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
}

.drop-down-item:hover {
  background-color: #e9ebee;
}

.drop-down-item:focus {
  background-color: #019160;
  outline: none;
}

#dropDown:hover #drop-down-list {
  visibility: visible;
}
.col-multiselect {
  width: 180px;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  text-align: center;
  display: flex;
}
.activity-table {
  align-items: center;
  justify-content: center;
  height: 46px;
  display: flex;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
  position: sticky;
  right: 0;
  background-color: #fff;
  /* border-left: 1px dotted #bbb; */
}
</style>
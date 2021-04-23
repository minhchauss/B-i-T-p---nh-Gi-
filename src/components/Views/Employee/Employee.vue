<template>
  <div>
    <!-- <div v-bind:key="componentKey"> -->
    <div class="page-title">
      <div class="page-left">Danh sách nhân viên</div>
      <div class="page-right">
        <button id="btnAdd" class="btn-default" v-on:click="btnAddOnClick()">
          <div><img src="../../../assets/icon/add.png" /></div>
          <div>Thêm nhân viên</div>
        </button>
      </div>
    </div>
    <div class="toolbar">
      <div class="toolbarSelect">
        <Combobox 
          :departments="departments"
          :positions="positions"
          />
      </div>

      <div class="toolbarButton">
        <button
          :disabled="isDisable"
          class="btn btn-delete"
          :class="{ hideBtnDelete: hideBtnDelete }"
          v-on:click="btnOnDelete()"
        >
          Xóa
        </button>
        <button class="btn-refresh" v-on:click="btnRefresh()"></button>
      </div>
    </div>
    <div class="grid">
      <table id="tblListCustomer" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Mức lương cơ bản</th>
            <th>Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="dblRowOnClick(employee.EmployeeId)"
            @click="selectedRowId(employee.EmployeeId, employee.EmployeeCode)"
            :class="{ hightlight: employee.EmployeeId == selectedId }"
          >
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td>{{ formatDate(employee.DateOfBirth) }}</td>
            <td>{{ employee.PhoneNumber }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
            <td style="text-align: right">
              {{ formatPrice(employee.Salary) }}
            </td>
            <td style="text-align: right">{{ employee.WorkStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination 
    
    />
    <EmployeeDetail
      ref="dialogEmployee"
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
      <div class="modal"></div>
      <div class="lds-dual-ring"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail.vue";
import DialogConfirm from "../../Commons/DialogConfirm.vue";
import Pagination from "../../Commons/Pagination.vue";
import moment from "moment";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import Noticfication from '../../Commons/Noticfication.vue';
import Combobox from './Combobox.vue'
const baseURL="http://api.manhnv.net/v1";
export default {
  components: {
    EmployeeDetail,
    DialogConfirm,
    Pagination,
    Noticfication,
    Combobox,
  },
  props: {
    
  },
  //
  created() {
    this.getDepartmentData();
    this.getPositionData();
    this.getEmployeesData();
  },
  mounted() {},
  methods: {
    /**
     * Focus vào input Mã nhân viên
     * Created by CMChau (7/4/2021)
     */
    focusInput() {
      // alert(1);
      this.$nextTick(() =>
        this.$refs.dialogEmployee.$refs.employeeCode.focus()
      );
    },
    /***
     * Hiển thị dialog thêm nhân viên khi bấm nút thêm
     * Created by CMChau(4/4/2021)
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
     * Created by CMChau(4/42021)
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
     * Created by CMChau (5/4/2021)
     * Nếu không chọn dòng nào thì không hoạt động
     */
    btnOnDelete() {
      if (this.selectedId == null) return "";
      else {
        this.isHideDialogConfirm = false;
        console.log(this.selectedId);
        this.messageDelete =
          "Bạn có chắc chắn muốn xóa nhân viên [" +
          this.employeeCode +
          "] không?";
      }
    },
    //truyền tham số vào component con để ẩn dialog khi bấm nút X hoặc hủy
    hideDialogDetail() {
      this.isHide = true;
      this.isHideDialogConfirm = true;
    },
    /**
     * Lấy id của 1 nhân viên khi focus vào 1 hàng
     * Created by CMChau(5/4/2021)
     * Lấy mã nhân viên
     * Created by CMChau (6/4/2021)
     */
    selectedRowId(employeeId, employeeCode) {
      this.selectedId = employeeId;
      this.employeeCode = employeeCode;
      console.log(employeeId);
      this.hideBtnDelete = false;
    },
    /**
     * Bấm nút refresh sẽ tải lại dữ liệu của trang
     * Created by CMChau (5/4/2021)
     */
    btnRefresh() {
      this.getEmployeesData();
    },
    /**
     * gọi API để lấy danh sách nhân viên
     * Create by CMChau(4/4/2021)
     */
    getEmployeesData() {
      axios.get(`${baseURL}/Employees`).then((res) => {
        this.employees = res.data;
        //Ẩn modal đang lấy dữ liệu
        this.isDone=true;
        this.showNotic=false;
        this.hideNoticfication();
        return true;
        // this.employee.DateOfbirth = this.formatFormDate(
        //   this.employee.DateOfbirth
        // );
        // console.log(res.data);
      });
    },
    /**
     * Định dạng lương cơ bản
     * Created by CMChau(4/4/2021)
     * Ví dụ: 2000000 -> 2.000.000 VND
     */
    formatPrice(value) {
      let val = value / 1;
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    /**
     * Lấy thông tin chi tiết của 1 nhân viên qua API
     * Created by CMChau(5/4/2021)
     */
    getInforEmployee(selectedId) {
      axios
        .get(`${baseURL}/Employees/` + selectedId)
        .then((res) => {
          this.employee = res.data;
          this.newEmployeeCode = this.employeeCode;
          this.employee.DateOfBirth = this.formatFormDate(
            this.employee.DateOfBirth
          );
          this.employee.IdentityDate = this.formatFormDate(
            this.employee.IdentityDate
          );
          this.employee.JoinDate = this.formatFormDate(this.employee.JoinDate);
          // this.employee.Salary =
          //   this.formatPrice(this.employee.Salary) + " (VNĐ)";
          console.log(this.employee.DateOfBirth);
        })
        .catch((res) => {
          console.log(res.status);
        });
    },
    /**
     * Xóa 1 bản ghi tại dòng được chọn
     * Created by CMChau(5/4/2021)
     */
    deleteDataOnRow(selectedId) {
      this.isDone=false;
      axios
        .delete(`${baseURL}/Employees/` + selectedId)
        .then((res) => {
          console.log(res.status);
          this.getEmployeesData();
          this.hideBtnDelete = true;
          this.messageNotification="Xóa thành công";
          
        });
    },
    /***
     * Định dạng ngày sinh trong bảng
     * Created by CMChau(4/42021)
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
     * Created by CMChau(6/4/2021)
     */
    formatFormDate(date) {
      if (!date) return "";
      else {
        return moment(date,"YYYY-MM-DD hh:mm").format("YYYY-MM-DD");
      }
    },
    /**
     * Lấy mã nhân viên tự động tăng
     * Created by CMChau(6/4/2021)
     */
    getAutoEmployeeCode() {
      axios
        .get(`${baseURL}/Employees/NewEmployeeCode`)
        .then((res) => {
          this.newEmployeeCode = res.data;
          // console.log(this.newEmployeeCode);
        });
    },
    /**
     * Lấy danh sách phòng ban qua API
     * Created by CMChau(7/4/2021)
     */
    getDepartmentData() {
      axios.get(`http://api.manhnv.net/api/Department`).then((res) => {
        this.departments = res.data;
      });
    },
    /**
     * Lấy danh sách vị trí công việc
     * Created by CMChau(7/4/2021)
     */
    getPositionData() {
      axios.get(`${baseURL}/Positions`).then((res) => {
        this.positions = res.data;
      });
    },
    /**
     * Gọi Api để lọc theo select
     */
    onFilterDepartment(selectDepartmentId) {
      axios
        .get(`${baseURL}/Department/Filter/` + selectDepartmentId)
        .then((res) => {
          this.employees = res.data;
        });
    },
    /**
     * Gọi Api để lọc theo select position
     */
    onFilterPosition(selectPositionId) {
      axios
        .get(`${baseURL}/Positions/Filter/` + selectPositionId)
        .then((res) => {
          this.employees = res.data;
        });
    },
    /**
    Binding tên phòng ban vào form lọc
    Created by CMChau (14/4/2021)
     */
    selectNameDepartment(name) {
      this.selectedDepartmentname = name;
      this.changeBackground=true;
    },
    //Binding tên vị trí
    selectNamePosition(name) {
      this.selectedPositionName = name;
    },
    /**
    *Chọn tất cả phòng ban
    *Created by CMChau(15/4/2021)
    *
     */
     loadDataDepartment(){
       this.selectedDepartmentname="Tất cả phòng ban"
     },
     /***
      * Chọn tất cả vị trí
      * Created by CMChau(15/4/2021)
      */
     loadDataPosition(){
       this.selectedPositionName="Tất cả vị trí"
     },
      /**
       * Hiển thị thông báo thao tác thành công
       * Created by CMChau(18/4/2021)
       */
     hideNoticfication(){
       setTimeout(()=>this.showNotic=true,3000)
     },
     noticficationData(message){
       this.showNotic=false;
       this.messageNotification=message;
       this.hideNoticfication();
     }
     

  },
  computed: {},
  data() {
    return {
      isDone : false,
      isHide: true,
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
        url: "http://api.manhnv.net/v1/Positions",
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
      changeBackground:false,


      currentPage:1,
      bootstrapPagination:{// http://getbootstrap.com/docs/4.1/components/pagination/
      ul:'pagination',
      li: 'page-item',
      liActive:'active',
      liDisable:'disable',
      button:'page-link'
      },
      customLabels:{
        first:'First',
        prev:'Previous',
        next:'Next',
        last:'Last'
      },
      messageNotification:"",
      showNotic:true,
    };
  },
};
</script>

<style scoped >
@import url(../../../assets/css/EmployeeCss/employee.css);
.change-hightlight::after{
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
  background: #019160;
  outline: none;
  color: #ffffff;
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
</style>
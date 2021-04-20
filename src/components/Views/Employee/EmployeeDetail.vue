<template>
  <div>
    <div
      id="dlgCustomerDetail"
      ref="dlgCustomerDetail"
      class="dialog"
      v-bind:class="{ 'dialog-hide': isHide }"
      :tabindex="tabindex + 1"
    >
      <div class="model"></div>
      <div class="dialog-content" id="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">THÔNG TIN NHÂN VIÊN</div>
          <!----------------------------------------------->
          <div
            class="dialog-close-button"
            @click="btnCloseOnClick()"
            v-on:keyup.esc="btnCloseOnClick()"
            :tabindex="tabindex + 1"
          >
            &#x2715;
          </div>
        </div>
        <div class="dialog-body">
          <div class="insertAvatar">
            <div class="avatar" type="file"></div>
            <div>(Vui lòng chọn ảnh có định dạng .jpg,.jepg,.png,.gif)</div>
          </div>
          <div class="insertInfor">
            <div class="m-col">
              <div class="tittleDialog">A. THÔNG TIN CHUNG:</div>
              <hr class="hrStyle" />
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <div
                  v-bind:class="{
                    'form-valid-input': this.validateEmployeeCode,
                  }"
                >
                  <div class="form-valid">
                    <div class="valid-tooltip">{{ messValidateCode }}</div>
                    <div class="arrow-down"></div>
                  </div>
                </div>
                <label class="form-label">Mã nhân viên (<span>*</span>)</label>
                <input
                  id="employeeCode"
                  aria-describedby="inputGroupPrepend2"
                  type="text"
                  v-model="newEmployeeCode"
                  name="employeeCode"
                  ref="employeeCode"
                  :tabindex="tabindex + 1"
                  @focusout="checkEmployeeCode()"
                  :class="{ redLine: !validateEmployeeCode }"
                />
              </div>
              <!----------------------------------------------->
              <div class="m-col">
                <div
                  :class="{
                    'form-valid-input': validateEmployeeName,
                  }"
                >
                  <div class="form-valid">
                    <div class="valid-tooltip">
                      {{ messValidateName }}
                    </div>
                    <div class="arrow-down"></div>
                  </div>
                </div>
                <label class="form-label">Họ và tên (<span>*</span>)</label>
                <input
                  id="ipEmployeeName"
                  ref="ipEmployeeName"
                  aria-describedby="inputGroupPrepend2"
                  type="text"
                  v-model="employee.FullName"
                  :tabindex="tabindex + 1"
                  @focusout="checkEmployeeName()"
                  :class="{ redLine: !validateEmployeeName }"
                />
              </div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <label class="form-label">Ngày sinh</label>
                <input
                  id="ipEmployeeDoB"
                  v-model="employee.DateOfBirth"
                  value="01/01/2020"
                  :tabindex="tabindex + 1"
                  placeholder="tháng/ngày/năm"
                  type="text"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  pattern="\d{2}-\m{2}-\y{4}"
                />
              </div>
              <!----------------------------------------------->
              <div class="m-col">
                <label class="form-label">Giới tính</label>
                <select
                  :tabindex="tabindex + 1"
                  v-model="employee.Gender"
                  id="ipEmployeeGender"
                >
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                  <option value="2">Không xác định</option>
                </select>
              </div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <div
                  :class="{
                    'form-valid-input': this.validateEmployeeIdentity,
                  }"
                >
                  <div class="form-valid">
                    <div class="valid-tooltip">
                      {{ messValidateIdentityNumber }}
                    </div>
                    <div class="arrow-down"></div>
                  </div>
                </div>
                <label class="form-label"
                  >Số CMTND/Căn cước (<span>*</span>)</label
                >
                <input
                  id="ipEmployeeIdentityNo"
                  type="text"
                  value=""
                  :tabindex="tabindex + 1"
                  v-model="employee.IdentityNumber"
                  @focusout="checkEmployeeIdentityNumber()"
                  :class="{ redLine: !validateEmployeeIdentity }"
                />
              </div>
              <!----------------------------------------------->
              <div class="m-col">
                <label class="form-label">Ngày cấp</label>
                <input
                  v-model="employee.IdentityDate"
                  value="date"
                  :tabindex="tabindex + 1"
                  placeholder="tháng/ngày/năm"
                  type="text"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                />
              </div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <label class="form-label">Nơi cấp</label>
                <input
                  type="text"
                  v-model="employee.IdentityPlace"
                  :tabindex="tabindex + 1"
                />
              </div>
              <div class="m-col"></div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <div
                  :class="{
                    'form-valid-input': validateEmployeeEmail,
                  }"
                >
                  <div class="form-valid">
                    <div class="valid-tooltip">{{ messValidateEmail }}</div>
                    <div class="arrow-down"></div>
                  </div>
                </div>
                <label class="form-label">Email (<span>*</span>)</label>
                <input
                  type="email"
                  v-model="employee.Email"
                  :tabindex="tabindex + 1"
                  @focusout="checkEmployeeEmail()"
                  :class="{ redLine: !validateEmployeeEmail }"
                />
              </div>
              <!----------------------------------------------->
              <div class="m-col">
                <div
                  :class="{
                    'form-valid-input': validateEmployeePhone,
                  }"
                >
                  <div class="form-valid">
                    <div class="valid-tooltip">
                      {{ messValidatePhoneNumber }}
                    </div>
                    <div class="arrow-down"></div>
                  </div>
                </div>
                <label class="form-label">Số điện thoại (<span>*</span>)</label>
                <input
                  type="text"
                  v-model="employee.PhoneNumber"
                  :tabindex="tabindex + 1"
                  @focusout="checkEmployeePhoneNumber()"
                  :class="{ redLine: !validateEmployeePhone }"
                />
              </div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <div class="tittleDialog">B. THÔNG TIN CÔNG VIỆC:</div>
                <hr class="hrStyle" />
              </div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <label>Vị trí</label>
                <select :tabindex="tabindex + 1" v-model="employee.PositionId">
                  <option disabled :value="employee.PositionName" hidden>
                    -- chọn vị trí --
                  </option>
                  <option
                    v-for="item in positions"
                    :value="item.PositionId"
                    :key="item.PositionId"
                  >
                    {{ item.PositionName }}
                  </option>
                </select>
              </div>
              <!----------------------------------------------->
              <div class="m-col">
                <label>Phòng ban</label>
                <select
                  :tabindex="tabindex + 1"
                  v-model="employee.DepartmentId"
                >
                  <option disabled :value="employee.DepartmentName" hidden>
                    -- chọn vị trí --
                  </option>
                  <option
                    v-for="item in departments"
                    :value="item.DepartmentId"
                    :key="item.DepartmentId"
                  >
                    {{ item.DepartmentName }}
                  </option>
                </select>
              </div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <label>Mã số thuế cá nhân</label>
                <input
                  type="text"
                  :tabindex="tabindex + 1"
                  v-model="employee.PersonalTaxCode"
                />
              </div>
              <!----------------------------------------------->
              <div class="m-col">
                <div
                  v-bind:class="{
                    'form-valid-input': this.validateEmployeeSalary,
                  }"
                >
                  <div class="form-valid">
                    <div class="valid-tooltip">{{ messValidateCode }}</div>
                    <div class="arrow-down"></div>
                  </div>
                </div>
                <label>Mức lương cơ bản</label>
                <div class="input-group">
                  <div class="input-group-salary">
                    <div style="width: 100%">
                      <!-- <CurrencyInput/> -->
                      <input
                        type="text"
                        v-money="money"
                        :tabindex="tabindex + 1"
                        v-model="employee.Salary"
                        class="form-control"
                        @focusout="checkEmployeeSalary()"
                        :class="{ redLine: !validateEmployeeSalary }"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col">
                <label>Ngày gia nhập công ty</label>
                <input
                  :tabindex="tabindex + 1"
                  value="date"
                  v-model="employee.JoinDate"
                  placeholder="tháng/ngày/năm"
                  type="text"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  pattern="[0-9]{4}/[0-9]{2}/[0-9]{2}"
                />
              </div>
              <!----------------------------------------------->
              <div class="m-col">
                <label>Tình trạng công việc</label>
                <select :tabindex="tabindex + 1" v-model="employee.WorkStatus">
                  <option value="0">Đang làm việc</option>
                  <option value="1">Đã nghỉ hưu</option>
                  <option value="2">Đang thử việc</option>
                  <!-- <option disabled value="">Chọn</option>
                    <option v-for="employee in employees" v-bind:key="employee.WorkStatus">{{employee.WorkStatus}}</option> -->
                </select>
              </div>
              <!----------------------------------------------->
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button
            id="btn-cancel-delete"
            tabindex="20"
            class="btn-default btn-cancel"
            v-on:click.esc="btnOnCancel()"
            v-on:keydown.tab="loopTabindex()"
          >
            Hủy
          </button>
          <button
            id="btnSave"
            class="btn-default"
            v-on:click.enter="btnSave()"
            tabindex="19"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>

    <DialogAlert
      :isHideDialogAlert="isHideDialogAlert"
      @hideDialogAlert="hideDialogAlert"
      :newEmployeeCode="newEmployeeCode"
    />
  </div>
</template>
<script>
import axios from "axios";
import { VMoney } from "v-money";
// import moment from "moment";
import DialogAlert from "../../Commons/DialogAlert.vue";

// import CurrencyInput from '../../Commons/CurrencyInput.vue';
const baseURL="http://api.manhnv.net/v1/";
export default {
  components: {
    DialogAlert,
    // CurrencyInput,
  },
  props: {
    isHide: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: Number,
      require: false,
      default: 1,
    },
    employee: {
      type: Object,
      default: null,
    },
    selectedId: {
      type: String,
      default: null,
    },
    formMode: {
      type: String,
      default: null,
    },
    newEmployeeCode: {
      type: String,
      default: null,
    },
    departments: {
      type: Array,
      default: null,
    },
    positions: {
      type: Array,
      default: null,
    },
    messageNotification: {
      type: String,
      default: null,
    },
    showNotic: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Bấm nút X thì đóng form chi tiết
     */
    btnCloseOnClick() {
      this.$emit("hideDialogDetail");
      this.validateEmployeeName = this.validateEmployeeCode = this.validateEmployeeIdentity = this.validateEmployeeEmail = this.validateEmployeePhone = true;
    },
    btnOnCancel() {
      this.btnCloseOnClick();
    },
    /**
     * Validate thông tin nhập vào form
     * Created by CMChau(12/4/20210)
     */
    checkValidate() {
      this.checkEmployeeCode();
      this.checkEmployeeName();
      this.checkEmployeePhoneNumber();
      this.checkEmployeeIdentityNumber();
      this.checkEmployeeEmail();
      if (
        this.employee.IdentityNumber == "" ||
        this.employee.IdentityNumber == null ||
        this.newEmployeeCode == "" ||
        this.newEmployeeCode == null ||
        this.employee.FullName == "" ||
        this.employee.FullName == null ||
        this.employee.Email == "" ||
        this.employee.Email == null ||
        this.employee.PhoneNumber == "" ||
        this.employee.PhoneNumber == null
      ) {
        return false;
      } else {
        return true;
      }
    },
    /***
     * Kiểm tra validate từng input
     * Created by CMChau(12/4/2021)
     */
    //Kiểm tra họ và tên
    checkEmployeeName() {
      if (this.employee.FullName == "" || this.employee.FullName == null) {
        this.messValidateName = "Không để trống Họ và tên";
        this.validateEmployeeName = false;
        return false;
      } else {
        this.validateEmployeeName = true;
        return true;
      }
    },
    //Kiểm tra Mã nhân viên
    checkEmployeeCode() {
      if (this.newEmployeeCode == "" || this.newEmployeeCode == null) {
        this.messValidateCode = "Không để trống Mã nhân viên";
        this.validateEmployeeCode = false;
        return false;
      } else {
        this.validateEmployeeCode = true;
        return true;
      }
    },
    //Kiểm tra CMND/Căn cước
    checkEmployeeIdentityNumber() {
      if (
        this.employee.IdentityNumber == "" ||
        this.employee.IdentityNumber == null
      ) {
        this.messValidateIdentityNumber = "Không để trống Số CMND/Căn cước";
        this.validateEmployeeIdentity = false;
        return false;
      } else if (!this.validNumnber(this.employee.IdentityNumber)) {
        this.messValidateIdentityNumber =
          "Vui lòng nhập Số CMND/Căn cước đúng định dạng";
        this.validateEmployeeIdentity = false;
        return false;
      } else {
        this.validateEmployeeIdentity = true;
        return true;
      }
    },
    //Kiểm tra Email
    checkEmployeeEmail() {
      if (this.employee.Email == "" || this.employee.Email == null) {
        this.messValidateEmail = "Không để trống Email";
        this.validateEmployeeEmail = false;
        return false;
      } else if (!this.validEmail(this.employee.Email)) {
        this.messValidateEmail = "Vui lòng nhập Email đúng định dạng";
        this.validateEmployeeEmail = false;
        return false;
      } else {
        this.validateEmployeeEmail = true;
        return true;
      }
    },
    //Kiểm tra số điện thoại
    checkEmployeePhoneNumber() {
      if (
        this.employee.PhoneNumber == "" ||
        this.employee.PhoneNumber == null
      ) {
        this.messValidatePhoneNumber = "Không để trống Số điện thoại";
        this.validateEmployeePhone = false;
        return false;
      } else if (!this.validNumnber(this.employee.PhoneNumber)) {
        this.messValidatePhoneNumber =
          "Vui lòng nhập Số điện thoại đúng định dạng";
        this.validateEmployeePhone = false;
        return false;
      } else {
        this.validateEmployeePhone = true;
        return true;
      }
    },
    //Kiểm tra tiền lương
    checkEmployeeSalary() {
      if (!this.validSalary(this.employee.Salary)) {
        this.messValidateSalary = "Vui lòng nhập tiền lương đúng định dạng";
        this.validateEmployeeSalary = false;
        return false;
      } else {
        return true;
      }
    },
    //Kiểm tra Email có nhập đúng định dạng không
    validEmail(value) {
      if (
        //eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    //Kiểm tra số điện thoại nhâp có đúng định dạng không
    validNumnber(value) {
      if (
        //eslint-disable-next-line
        /^[0123456789]/.test(value)
      ) {
        return true;
      } else {
        return false;
      }
    },
    //Kiểm tra số tiền lương
    validSalary(value) {
      if (
        //eslint-disable-next-line
        /^[0123456789., A-Za-z]/.test(value)
      ) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * Xử lý sự kiện thi bấm nút lưu
     * -formMode= Add thì là thêm mới dữ liệu
     * -còn lại là sửa dữ liệu
     * Created by CMChau (5/4/2021)
     */
    btnSave() {
      if (this.checkValidate()) {
        if (this.formMode === "Add") {
          //Thêm mới
          this.addNewEmployee();
        } else {
          //Sửa
          this.editEmployee();
        }
      }
    },
    /**
     * Thêm mới nhân viên
     * Created by CMChau(12/4/2021)
     */
    addNewEmployee() {
      this.employee.EmployeeCode = this.newEmployeeCode;
      this.employee.Salary = this.forrmatSalaryNumber(this.employee.Salary);
      console.log(this.employee.Salary);
      console.log(this.employee.EmployeeCode);
      axios
        .post(`${baseURL}Employees/`, this.employee)
        .then((res) => {
          console.log(res);
          this.btnCloseOnClick();
          this.messageNotification="Thêm mới thành công";
          this.noticAdd(this.messageNotification);
          this.$emit("getEmployeesData");
        })
        .catch((res) => {
          console.log(res);
        });
    },
    /**
     * Sửa thông tin nhân viên
     * Created by CMChau(12/4/2021)
     */
    editEmployee() {
      this.employee.Salary = this.forrmatSalaryNumber(this.employee.Salary);
      axios
        .put(
          `${baseURL}Employees/` + this.selectedId,
          this.employee
        )
        .then((res) => {
          console.log(res);
          this.btnCloseOnClick();
          this.messageNotification="Sửa thành công";
          this.noticAdd(this.messageNotification);
          this.$emit("getEmployeesData");
        })
        .catch((res) => {
          console.log(res.status);
        });
    },
    noticAdd(mes){
       this.$emit('noticficationData',mes);
    },
    /**
     * Ẩn form alert
     */
    hideDialogAlert() {
      this.isHideDialogAlert = true;
    },
    /**
     * Lặp tabindex ở form chi tiết
     * Created by CMChau
     */
    loopTabindex() {
      this.$nextTick(() => this.$refs.dlgCustomerDetail.focus());
    },
    /**
     * Format tiền sang dạng số
     */
    forrmatSalaryNumber(value) {
      let val = value;
      return val.split(/[. A-Z]/).join("");
    },
  },
  data() {
    return {
      messValidateName: "",
      messValidatePhoneNumber: "",
      messValidateIdentityNumber: "",
      messValidateCode: "",
      messValidateEmail: "",
      messValidateSalary: "",
      isHideDialogAlert: true,
      validateEmployeeCode: true,
      validateEmployeeName: true,
      validateEmployeeIdentity: true,
      validateEmployeeEmail: true,
      validateEmployeePhone: true,
      validateEmployeeSalary: true,

      // messageAlert: "",
      msg: "",
      email: "",
      selectedPositionName: "--chọn vị trí--",
      // employees:[],
      // placeholder:"ngày-tháng-năm",
      mask: [
        "(",
        /\d/,
        /\d/,
        /\d/,
        ") ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: " VND",
        precision: "",
        masked: false,
      },
    };
  },
  mounted() {
    //  this.$nextTick(() => this.$refs.employeeCode.focus())
    // var self = this;
    //   this.$nextTick(() => {
    //   self.$$.employeeCode.focus();
    // })
  },
  created() {
    console.log(this.departments);
    this.employee.EmployeeCode = this.newEmployeeCode;
  },
  watch: {},
  directives: {
    money: VMoney,
  },
};
</script>



<style scoped>
@import url(../../../assets/css/CommonCss/dialog.css);
@import url(../../../assets/css/EmployeeCss/employee.css);
.m-col select:hover {
  background-color: #e9ebee;
}
</style>
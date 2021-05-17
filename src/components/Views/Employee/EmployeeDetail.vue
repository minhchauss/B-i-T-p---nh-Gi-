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
          <div style="padding-left: 10px; display: flex; align-items: center">
            <input
              type="checkbox"
              style="width: 20px; height: 20px"
              name="customerName"
            /><label style="padding-right: 10px">Là khách hàng</label>
            <input
              type="checkbox"
              style="width: 20px; height: 20px"
              name="customerName"
            /><label>Là nhà cung cấp</label>
          </div>
        </div>
        <!----------------------------------------------->
        <div
          class="dialog-close-button"
          @click="btnCloseOnClick()"
          v-on:keyup.esc="btnCloseOnClick()"
          :tabindex="tabindex + 1"
        >
          &#x2715;
        </div>

        <div class="dialog-body">
          <div class="insertInfor">
            <!-- <div class="m-col">
              <div class="tittleDialog">A. THÔNG TIN CHUNG:</div>
              <hr class="hrStyle" />
            </div> -->
            <!----------------------------------------------->
            <div class="m-row">
              <div class="m-col" style="width: 50%">
                <div class="m-row" style="width: 95%">
                  <div class="m-col" style="width: 48%">
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
                    <label class="form-label">Mã <span>*</span></label>
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
                  <div class="m-col" style="width: 49%">
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
                    <label class="form-label">Họ và tên <span>*</span></label>
                    <input
                      id="ipEmployeeName"
                      ref="ipEmployeeName"
                      aria-describedby="inputGroupPrepend2"
                      type="text"
                      v-model="employee.fullName"
                      tabindex="2"
                      @focusout="checkEmployeeName()"
                      :class="{ redLine: !validateEmployeeName }"
                    />
                  </div>
                </div>
                <div class="m-row" style="width: 95%">
                  <div class="m-col" style="width: 100%">
                    <div
                      :class="{
                        'form-valid-input': validateDepartment,
                      }"
                      style="left: 50%"
                    >
                      <div class="form-valid">
                        <div class="valid-tooltip">
                          {{ messValidateDepartment }}
                        </div>
                        <div class="arrow-down"></div>
                      </div>
                    </div>
                    <label class="form-label">Vị trí <span>*</span></label>
                    <select
                      tabindex="5"
                      v-model="employee.departmentId"
                      @focusout="checkEmployeeDepartment()"
                      :class="{ redLine: !validateDepartment }"
                    >
                      <option
                        v-for="department in departments"
                        :value="department.departmentId"
                        :key="department.departmentId"
                      >
                        {{ department.departmentName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="m-row" style="width: 95%">
                  <div class="m-col" style="width: 100%">
                    <label class="form-label">Chức danh</label>
                    <input
                      type="text"
                      v-model="employee.positionName"
                      tabindex="7"
                    />
                  </div>
                </div>
              </div>
              <div class="m-col" style="width: 50%">
                <div class="m-row">
                  <div class="m-col" style="width: 48%">
                    <label class="form-label">Ngày sinh</label>
                    <input
                      id="ipEmployeeDoB"
                      v-model="employee.dateOfBirth"
                      tabindex="2"
                      placeholder="ngày/tháng/năm"
                      type="date"
                    />
                  </div>
                  <div class="m-col" style="width: 49%; height: 30px">
                    <label class="form-label">Giới tính</label>
                    <div
                      class="m-row"
                      style="margin-top: 10px; vertical-align: middle"
                    >
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="1"
                        tabindex="3"
                        v-model="employee.gender"
                        checked
                      />
                      <label for="male" style="margin-top: 5px">Nam</label
                      ><br />
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="0"
                        tabindex="4"
                        v-model="employee.gender"
                      />
                      <label for="female" style="margin-top: 5px">Nữ</label
                      ><br />
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="2"
                        tabindex="5"
                        v-model="employee.gender"
                      />
                      <label for="other" style="margin-top: 5px">Khác</label>
                    </div>
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-col" style="width: 48%">
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
                    <label class="form-label">Số CMTND</label>
                    <input
                      id="ipEmployeeIdentityNo"
                      type="text"
                      value=""
                      tabindex="8"
                      v-model="employee.identityNumber"
                      :class="{ redLine: !validateEmployeeIdentity }"
                      @focusout="checkEmployeeIdentityNumber()"
                    />
                  </div>
                  <div class="m-col" style="width: 48%">
                    <label class="form-label">Ngày cấp</label>
                    <input
                      v-model="employee.identityDate"
                      tabindex="9"
                      placeholder="ngày/tháng/năm"
                      type="date"
                    />
                  </div>
                </div>
                <div class="m-row">
                  <div class="m-col" style="width: 100%">
                    <label class="form-label">Nơi cấp</label>
                    <input
                      type="text"
                      v-model="employee.identityPlace"
                      tabindex="10"
                    />
                  </div>
                </div>
              </div>
              <!----------------------------------------------->
            </div>
            <div class="m-row" style="display: block">
              <div class="m-col">
                <div class="m-row">
                  <div class="m-col" style="width: 100%">
                    <label class="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      v-model="employee.address"
                      tabindex="11"
                    />
                  </div>
                </div>
                <div class="m-row" style="width: 70%">
                  <div class="m-col" style="width: 32%">
                    <div class="m-row">
                      <div class="m-col">
                        <label>ĐT di động</label>
                        <input
                          type="text"
                          tabindex="12"
                          v-model="employee.mobilePhoneNumber"
                        />
                      </div>
                    </div>
                    <div class="m-row">
                      <div class="m-col">
                        <label>Tài khoản ngân hàng</label>
                        <input
                          type="text"
                          tabindex="15"
                          v-model="employee.bankAccount"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="m-col" style="width: 32%">
                    <div class="m-row">
                      <div class="m-col">
                        <label>ĐT cố định</label>
                        <input
                          type="text"
                          tabindex="13"
                          v-model="employee.phoneNumber"
                        />
                      </div>
                    </div>
                    <div class="m-row">
                      <div class="m-col">
                        <label>Tên ngân hàng</label>
                        <input
                          type="text"
                          tabindex="16"
                          v-model="employee.bankName"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="m-col" style="width: 32%">
                    <div class="m-row">
                      <div class="m-col">
                        <div
                          :class="{
                            'form-valid-input': this.validateEmployeeEmail,
                          }"
                        >
                          <div class="form-valid">
                            <div class="valid-tooltip">
                              {{ messValidateEmail }}
                            </div>
                            <div class="arrow-down"></div>
                          </div>
                        </div>
                        <label>Email</label>
                        <input
                          type="text"
                          tabindex="14"
                          v-model="employee.email"
                        />
                      </div>
                    </div>
                    <div class="m-row">
                      <div class="m-col">
                        <label>Chi nhánh</label>
                        <input
                          type="text"
                          tabindex="17"
                          v-model="employee.bankBranch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!----------------------------------------------->
            <!-- <div class="m-row">
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
              </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-col">
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
            </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-row">
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
              </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-col">
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
            </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-row">
              <div class="m-col">
                <label class="form-label">Nơi cấp</label>
                <input
                  type="text"
                  v-model="employee.IdentityPlace"
                  :tabindex="tabindex + 1"
                />
              </div>
              <div class="m-col"></div>
            </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-row">
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
              </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-col">
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
            </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-row">
              <div class="m-col">
                <div class="tittleDialog">B. THÔNG TIN CÔNG VIỆC:</div>
                <hr class="hrStyle" />
              </div>
            </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-row">
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
              </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-col">
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
            </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-row"> -->
            <!-- <div class="m-col">
                <label>Mã số thuế cá nhân</label>
                <input
                  type="text"
                  :tabindex="tabindex + 1"
                  v-model="employee.PersonalTaxCode"
                />
              </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-col">
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
                    <div style="width: 100%"> -->
            <!-- <CurrencyInput/> -->
            <!-- <input
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
            </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-row">
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
              </div> -->
            <!----------------------------------------------->
            <!-- <div class="m-col">
                <label>Tình trạng công việc</label>
                <select :tabindex="tabindex + 1" v-model="employee.WorkStatus">
                  <option value="0">Đang làm việc</option>
                  <option value="1">Đã nghỉ hưu</option>
                  <option value="2">Đang thử việc</option> -->
            <!-- <option disabled value="">Chọn</option>
                    <option v-for="employee in employees" v-bind:key="employee.WorkStatus">{{employee.WorkStatus}}</option> -->
            <!-- </select>
              </div> -->
            <!----------------------------------------------->
            <!-- </div> -->
          </div>
        </div>
        <div class="dialog-footer">
          <div>
            <button
              id="btn-cancel-delete"
              tabindex="21"
              class="btn-default btn-cancel"
              v-on:click.esc="btnOnCancel()"
              v-on:keydown.tab="loopTabindex()"
            >
              <p>Hủy</p>
            </button>
          </div>
          <div>
            <button
              id="btnSave"
              class="btn-default"
              v-on:click="btnSave()"
              tabindex="20"
            >
              <p>Cất</p>
            </button>
            <button
              id="btnSave-add"
              class="btn-default"
              v-on:click="btnSave()"
              tabindex="19"
            >
              <p>Cất và Thêm</p>
            </button>
          </div>
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
const baseURL = "https://localhost:44333/api/v1";
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
    searchNameCode: {
      type: String,
      default: "",
    },
  },
  methods: {
    /**
     * Bấm nút X thì đóng form chi tiết
     */
    btnCloseOnClick() {
      this.$emit("hideDialogDetail");
      this.validateEmployeeName = this.validateEmployeeCode = this.validateDepartment = true;
    },
    btnOnCancel() {
      this.btnCloseOnClick();
    },
    /**
     * Validate thông tin nhập vào form
     * Created by CMChau(9/5/20210)
     */
    checkValidate() {
      this.checkEmployeeCode();
      this.checkEmployeeName();
      this.checkEmployeeDepartment();
      if (
        this.newEmployeeCode == "" ||
        this.newEmployeeCode == null ||
        this.employee.fullName == "" ||
        this.employee.fullName == null ||
        this.employee.departmentId == "" ||
        this.employee.departmentId == null
      ) {
        return false;
      } else {
        return true;
      }
    },
    /***
     * Kiểm tra validate từng input
     * Created by CMChau(9/5/2021)
     */
    //Kiểm tra họ và tên
    checkEmployeeName() {
      if (this.employee.fullName == "" || this.employee.fullName == null) {
        this.messValidateName = "Không để trống Họ và tên";
        this.validateEmployeeName = false;
        return false;
      } else {
        this.validateEmployeeName = true;
        return true;
      }
    },
    /***
     * Kiểm tra validate từng input
     * */
    //Kiểm tra vị trí làm việc
    checkEmployeeDepartment() {
      if (
        this.employee.departmentId == "" ||
        this.employee.departmentId == null
      ) {
        this.messValidateDepartment = "Không để trống vị trí";
        this.validateDepartment = false;
        return false;
      } else {
        this.validateDepartment = true;
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
    /**
     * Kiểm tra CMND/Căn cước
     * Createdby CMChau 9/5/2021
     */
    // checkEmployeeIdentityNumber() {
    //   if (
    //     this.employee.identityNumber == "" ||
    //     this.employee.identityNumber == null
    //   ) {
    //     this.messValidateIdentityNumber = "Không để trống Số CMND/Căn cước";
    //     this.validateEmployeeIdentity = false;
    //     return false;
    //   } else if (!this.validNumnber(this.employee.identityNumber)) {
    //     this.messValidateIdentityNumber =
    //       "Vui lòng nhập Số CMND/Căn cước đúng định dạng";
    //     this.validateEmployeeIdentity = false;
    //     return false;
    //   } else {
    //     this.validateEmployeeIdentity = true;
    //     return true;
    //   }
    // },
    /**
     * Kiểm tra số nhập có đúng định dạng không
     * Created by CMChau 9/5/2021
     */
    // validNumnber(value) {
    //   if (
    //     //eslint-disable-next-line
    //     /^[0123456789]/.test(value)
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    /**
     * Kiểm tra Email
     * Created by CMChau 9/5/2021
     */
    // checkEmployeeEmail() {
    //   if (this.employee.email == "" || this.employee.email == null) {
    //     this.messValidateEmail = "Không để trống Email";
    //     this.validateEmployeeEmail = false;
    //     return false;
    //   } else if (!this.validEmail(this.employee.email)) {
    //     this.messValidateEmail = "Vui lòng nhập Email đúng định dạng";
    //     this.validateEmployeeEmail = false;
    //     return false;
    //   } else {
    //     this.validateEmployeeEmail = true;
    //     return true;
    //   }
    // },
    /**
     * Kiểm tra định dạng Email
     * Createdby CMChau 9/5/2021
     */
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

    /**
     * Xử lý sự kiện thi bấm nút lưu
     * -formMode= Add thì là thêm mới dữ liệu
     * -còn lại là sửa dữ liệu
     * Created by CMChau (9/5/2021)
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
     * Created by CMChau(9/5/2021)
     */
    addNewEmployee() {
      this.employee.employeeCode = this.newEmployeeCode;
      axios
        .post(`${baseURL}/Employees/`, this.employee)
        .then(() => {
          this.btnCloseOnClick();
          this.messageNotification = "Thêm mới thành công";
          this.noticAdd(this.messageNotification);
          var text = this.searchNameCode;
          this.$emit("getEmployeesData", [1], [10], [text]);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    /**
     * Sửa thông tin nhân viên
     * Created by CMChau(9/5/2021)
     */
    editEmployee() {
      axios
        .put(`${baseURL}/Employees/` + this.selectedId, this.employee)
        .then(() => {
          this.btnCloseOnClick();
          this.messageNotification = "Sửa thành công";
          this.noticAdd(this.messageNotification);
          var text = this.searchNameCode;
          this.$emit("getEmployeesData", [1], [10], [text]);
        })
        .catch((res) => {
          console.log(res.status);
        });
    },
    /***
     * Thông báo thay đổi dữ liệu
     * Createdby CMChau 9/5/2021
     */
    noticAdd(mes) {
      this.$emit("noticficationData", mes);
    },
    /**
     * Ẩn form alert
     */
    hideDialogAlert() {
      this.isHideDialogAlert = true;
    },
    /**
     * Lặp tabindex ở form chi tiết
     * Created by CMChau 9/5/2021
     */
    loopTabindex() {
      this.$nextTick(() => this.$refs.dlgCustomerDetail.focus());
    },
  },
  data() {
    return {
      department: {},
      messValidateName: "",
      messValidatePhoneNumber: "",
      messValidateIdentityNumber: "",
      messValidateCode: "",
      messValidateEmail: "",
      messValidateDepartment: "",
      isHideDialogAlert: true,
      validateEmployeeCode: true,
      validateEmployeeName: true,
      validateEmployeeIdentity: true,
      validateEmployeeEmail: true,
      validateEmployeePhone: true,
      validateEmployeeSalary: true,
      validateDepartment: true,
      DepartmentID: null,
      msg: "",
      email: "",
      selectedPositionName: "--chọn vị trí--",
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
    this.employee.employeeCode = this.newEmployeeCode;
  },
  watch: {},
  directives: {
    money: VMoney,
  },
};
</script>



<style scoped>
@import url(../../../assets/css/EmployeeCss/employee.css);
@import url(../../../assets/css/CommonCss/dialog.css);
@import url(../../../assets/css/CommonCss/select.css);
.m-col select:hover {
  background-color: #e9ebee;
}
</style>
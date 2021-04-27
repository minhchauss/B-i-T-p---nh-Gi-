<template>
  <div>
    <div class="toolbarSelect">
      <div>
        <input
          id="imput-search"
          type="text"
          class="input-search"
          placeholder="Tìm kiếm theo mã, tên nhân viên"
        />
      </div>
      <div class="combobox">
        <div class="combobox-selected-item" id="combobox-department">
          <!----------------------input nhập department---------------------------------->
          <input
            type="text"
            tabindex="-1"
            v-bind:class="{
              'out-line-input-department': outLineDepartment,
              'error-outline-department': errOutlineDepartment,
            }"
            v-model="selectedDepartmentname"
            @input="filterDepartmentName()"
            @focus="clearDataDepartmentInput"
            @focusout="focusOutInputDepartment"
          />
          <!------------------------icon xổ ra list-------------------------------->
          <div
            class="icon-down"
            tabindex="-1"
            @click="focusIconDown()"
            v-bind:class="{
              'out-line-input-department': outLineDepartment,
              'error-outline-department': errOutlineDepartment,
            }"
          >
           <div
              class="tooltip-text"
              :class="{ 'tooltip-text-department': tooltipDepartment }"
            >
              Dữ liệu không tồn tại trong hệ thống
            </div>
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </div>
        </div>
        <!------------------------Nội dung list-------------------------------->
        <div
          class="combobox-content"
          tabindex="-1"
          v-bind:class="{ 'show-combobox-list-department': showCbbList }"
          @focusout="unFocusList()"
        >
          <div class="combobox-list" tabindex="-1">
            <!----------------------item tất cả phòng ban---------------------------------->
            <div
              class="combobox-item"
              tabindex="-1"
              @click="loadDataDepartment()"
              :class="{ 'hide-department-name': isHideDepartment }"
            >
              <div class="text-position">Tất cả phòng ban</div>
            </div>
            <!----------------------item list phòng ban---------------------------------->
            <div v-if="filterDepartmentInput">
              <div
                ref="test"
                v-for="item in filterDepartmentInput"
                :key="item.DepartmentId"
                class="combobox-item"
                tabindex="1"
                @click="selectNameDepartment(item.DepartmentName)"
                :class="{
                  highlight: item.DepartmentName == selectedDepartmentname,
                }"
              >
                <!--------------------------icon tick------------------------------>
                <font-awesome-icon
                  class="icon-down-list"
                  :icon="['fas', 'check']"
                />
                <div class="text-position">
                  {{ item.DepartmentName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="combobox">
        <div class="combobox-selected-item" id="combobox-position">
          <!------------------Input nhập --------------------->
          <input
            type="text"
            tabindex="0"
            v-bind:class="{
              'out-line-input-position': outLinePosition,
              'error-outline-position': errOutline,
            }"
            v-model="selectedPositionName"
            @input="filterPositionName()"
            @focus="clearDataPositionInput()"
            @focusout="focusOutInputPosition()"
            @keydown="test"
          />

          <!----------------Icon xổ ra list---------- ------------>
          <div
            class="icon-down"
            tabindex="-1"
            @click="clickIconDownPosition()"
            v-bind:class="{
              'out-line-input-position': outLinePosition,
              'error-outline-position': errOutline,
            }"
          >
            <div
              class="tooltip-text"
              :class="{ 'tooltip-text-position': tooltipPosition }"
            >
              Dữ liệu không tồn tại trong hệ thống
            </div>
            <!------------ ------------>
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </div>
        </div>
        <!---------------------Nội dung list------------------------->
        <div
          class="combobox-content"
          tabindex="-1"
          :class="{ 'show-combobox-list-position': showCbbListPosition }"
        >
          <!------------------------------------------------>

          <div
            class="combobox-list"
            tabindex="-1"
            @focusout="unFocusListPosition()"
            v-if="filterPositionName"
          >
            <!-------------------Chọn tất cả----------------------------->

            <div
              :class="{ 'hide-position-name': isHidePosition }"
              class="combobox-item"
              tabindex="-1"
              @click.enter="loadDataPosition()"
            >
              <div class="text-position">{{ defaultPositionName }}</div>
            </div>
            <!-------------------Binding tên vị trí----------------------------->
            <div v-if="filterPositionInput">
              <div
                v-for="item in filterPositionInput"
                :key="item.PositionId"
                class="combobox-item"
                tabindex="1"
                @click="selectNamePosition(item.PositionName)"
                :class="{
                  highlight: item.PositionName == selectedPositionName,
                }"
              >
                <font-awesome-icon
                  class="icon-down-list"
                  :icon="['fas', 'check']"
                />
                <!---------------------Tên vị trí--------------------------->

                <div class="text-position">{{ item.PositionName }}</div>
              </div>
              <!-- <div>{{ item.PositionName }}</div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="about">
        <input
          type="text"
          class="br-gray-300 px-4 py-2"
          v-model="state"
          autocomplete="off"
          @input="filterStates()"
        />
        <div v-if="filteredStates" class="filter-state">
          <ul>
            <li
              v-for="item in filteredStates"
              :key="item"
              @click="setState(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // document.addEventListener("keyup", this.nextItem);
    this.filterPositionInput = this.positions;
    this.filterDepartmentInput = this.departments;
  },
  created() {
    this.setValueInput();
    this.filterPositionInput = this.positions;
    this.filterDepartmentInput = this.departments;
  },
  computed: {
    // filteredPosition() {
    //   function compare(a, b) {
    //     if (a.PositionName < b.PositionName) return -1;
    //     if (a.PositionName > b.PositionName) return 1;
    //     return 0;
    //   }
    //   return this.dataPo
    //     .filter((item) => {
    //       return item.PositionName.toLowerCase().includes(
    //         this.selectedPositionName.toLowerCase()
    //       );
    //     })
    //     .sort(compare);
    // },
  },
  props: {
    departments: {
      typy: Object,
      default: [],
    },
    positions: {
      typy: Object,
      default: [],
    },
    icon: {
      default: "",
    },
  },
  data() {
    return {
      selectDepartmentId: null,
      selectPositionId: null,
      selectedDepartmentname: "",
      outLineDepartment: false,
      outLinePosition: false,
      errOutline: false,
      errOutlineDepartment: false,
      showCbbList: false,
      nameDepartment: "",
      namePosition: "",
      showCbbListPosition: false,
      isHideDepartment: true,
      isHidePosition: true,
      selectedRowPositionId: null,
      checkIcon: true,
      hideCheckIcon: true,
      state: "",
      states: ["alabama", "texsas", "alaska", "Frorida"],
      filteredStates: [],
      selectedPositionName: "",
      filterPositionInput: [],
      filterDepartmentInput: [],
      value: 1,
      defaultPositionName: "Tất cả vị trí",
      tooltipPosition: true,
      tooltipDepartment:true,
    };
  },
  methods: {
    /**
     * Test điều hướng mũi tên
     */
    //   setResult(text) {
    //   this.search = text
    // },

    // onArrow(event) {
    //   if (this.filteredUsers.length > 0) {
    //     this.arrowCounter = event.code == "ArrowDown" ? ++this.arrowCounter : --this.arrowCounter;
    //     if (this.arrowCounter >= this.filteredUsers.length)
    //       this.arrowCounter = (this.arrowCounter) % this.filteredUsers.length;
    //     else if (this.arrowCounter < 0)
    //       this.arrowCounter = this.filteredUsers.length + this.arrowCounter;
    //     this.setResult(this.filteredUsers[this.arrowCounter].text);
    //   }
    // },
    // inputChanged(event) {
    //   if (event.code == "ArrowUp" || event.code == "ArrowDown")
    //     return;

    //   this.filteredUsers = [];

    //   if (event.code == "Enter")
    //     return;

    //   var filtered = this.users.filter((user) => {
    //     return user.text.match(this.search)
    //   });

    //   this.isOpen = true
    //   this.filteredUsers.push(...filtered)

    //   console.log(this.filteredUsers)
    // },


    /**
     * Validate combobox
     * Createdby CMChau 27/4/2021
     */
    //Position
    focusOutInputPosition() {
      if (this.selectedPositionName != this.filterPositionInput) 
        //Viền báo lỗi
        this.errOutline = true;
        //Thông báo lỗi khi hover
        this.tooltipPosition = false;
      
      
    },
    //Department
    focusOutInputDepartment() {
      if (this.selectedDepartmentname != this.filterDepartmentInput)
      //Hiện viền báo lỗi
        this.errOutlineDepartment = true;
        //Hiển thị thông báo lối khi hover
        this.tooltipDepartment=false;
    },
    /**
     * Clear data khi focus vào input posiiton
     * Createdby CMChau 27/4/2021
     */
    clearDataPositionInput() {
      this.selectedPositionName = "";
    },
    /**
     * Clear data khi focus vào input department
     * Createdby CMChau 27/4/2021
     */
    clearDataDepartmentInput() {
      this.selectedDepartmentname = "";
    },
    /**
     * test Điều hướng bằng mũi tên
     */
    test(event) {
      switch (event.keyCode) {
        case 38:
          if (this.filterPositionInput === null) {
            this.filterPositionInput = 0;
          } else if (this.filterPositionInput > 0) {
            this.filterPositionInput--;
          }
          break;
        case 40: {
          if (this.filterPositionInput === null) {
            this.filterPositionInput = 0;
          } else if (this.filterPositionInput < this.item.length - 1) {
            this.filterPositionInput++;
          }
          break;
        }
      }
    },
    /**
     * Lấy danh sách tên vị trí
     * Created by CMChau 26/4/2021
     */
    setValueInput() {
      this.selectedDepartmentname = "Tất cả phòng ban";
      this.selectedPositionName = "Tất cả vị trí";
      this.filterPositionName();
      this.showCbbListPosition = false;
      this.filterDepartmentName();
      this.showCbbList = false;
    },
    /**
     * Autocomplete vị trí
     * Created by CMChau 26/4/2021
     */
    filterPositionName() {
      this.isHidePosition = false;
      this.showCbbListPosition = true;
      // this.dataPo = this.positions;
      this.filterPositionInput = this.positions.filter((item) => {
        return item.PositionName.toLowerCase().includes(
          this.selectedPositionName.toLowerCase()
        );
      });
    },
    /**
     * AutoComplete phòng ban
     * Created by CMChau 26/4/2021
     */
    filterDepartmentName() {
      //hiện list
      this.isHideDepartment = false;
      this.showCbbList = true;
      //gán data department
      // this.dataDe = this.departments;
      //thực hiện filter
      this.filterDepartmentInput = this.departments.filter((item) => {
        return item.DepartmentName.toLowerCase().includes(
          this.selectedDepartmentname.toLowerCase()
        );
      });
    },
    /**
     * Filter test
     */
    filterStates() {
      this.filteredStates = this.states.filter((state) => {
        return state.toLowerCase().startsWith(this.state.toLowerCase());
      });
    },
    /**
     * Click vào icon down phòng ban
     *Createdby CMChau 26/4/2021
     */
    focusIconDown() {
      // Hiện border input
      this.outLineDepartment = !this.outLineDepartment;
      // Hiện list phòng ban
      this.showCbbList = !this.showCbbList;

      this.filterDepartmentInput = this.departments;
    },
    /**
     * Click vào icon down vị trí
     * Createdby CMChau 26/4/2021
     */
    clickIconDownPosition() {
      // Hiện border input
      this.outLinePosition = !this.outLinePosition;
      // Toggle list vị trí
      this.showCbbListPosition = !this.showCbbListPosition;

      this.filterPositionInput = this.positions;
    },
    /**
     * Sau khi bấm ra ngoài combobox phòng ban
     * Createdby CMChau 26/4/2021
     */
    unFocusList() {
      // Ẩn list phòng ban
      this.showCbbList = false;
      // Ẩn border input
      this.outLineDepartment = false;
    },
    /***
     * Sau khi bấm ra ngoài combobox vị trí
     * Createdby CMChau 26/4/2021
     */
    unFocusListPosition() {
      // Ẩn list vị trí
      this.showCbbListPosition = false;
      // Ẩn border input
      this.outLinePosition = false;

      if (this.filterPositionInput == null || this.filterPositionInput == "") {
        this.errOutline = true;
      } else this.errOutline = false;
    },
    /**
     * Gọi Api để lọc theo select
     * Createdby CMChau 24/4/2021
     */
    async onFilterDepartment(selectDepartmentId) {
      this.employees = await this.$axios.$get(
        "/Department/Filter/" + selectDepartmentId
      );
    },
    /**
     * Gọi Api để lọc theo select position
     * Createdby CMChau 24/4/2021
     */
    async onFilterPosition(selectPositionId) {
      this.employees = await this.$axios.$get(
        "/Positions/Filter/" + selectPositionId
      );
    },
    /**
     * Binding tên phòng ban vào form lọc
     * Created by CMChau (14/4/2021)
     * Updated by CMChau(27/4/2021)
     * Thêm ẩn viền, thông báo lỗi
    */
    selectNameDepartment(nameDepartment) {
      // Gán tên phòng ban
      this.selectedDepartmentname = nameDepartment;
      // Ẩn list phòng ban
      this.showCbbList = false;
      // Hiển thị dòng "Tất cả vị trí"
      this.isHideDepartment = false;
      //Border xổ xuống
      this.outLineDepartment = false;
      //Ẩn border lỗi
      this.errOutlineDepartment = false;

      this.tooltipDepartment=true;
    },
    /**
     * Binding tên vị trí
     * Createdby CMChau 14/4/2021
     * Updated by CMChau(26/4/2021)
     * Thêm dấu tích, thông báo lỗi, border
     */
    selectNamePosition(name) {
      // Gán tên vị trí
      this.selectedPositionName = name;
      // Ẩn list vị trí
      this.showCbbListPosition = false;
      // Hiển thị dòng "Tất cả vị trí"
      this.isHidePosition = false;
      // Thêm dấu tick
      this.hideCheckIcon = false;
      //Border icon xổ xuống
      this.outLinePosition = false;
      //Ẩn thông báo lỗi
      this.tooltipPosition=true;
    },
    /**
     *Chọn tất cả phòng ban
     *Created by CMChau(15/4/2021)
     *Updated by CMChau(27/4/2021)
     * Thêm ẩn viền, thông báo lỗi, ẩn dòng "Tất cả vị trí"
     */
    loadDataDepartment() {
      // Gán tên phòng ban
      this.selectedDepartmentname = "Tất cả phòng ban";
      // Ẩn list phòng ban
      this.showCbbList = false;
      // Ẩn border input
      this.outLineDepartment = false;
      // Ẩn dòng "Tất cả phòng ban"
      this.isHideDepartment = true;
      //Ẩn thông báo lỗi 
      this.tooltipDepartment=true;
      //Ẩn viền lỗi
      this.errOutlineDepartment=false
      //Ẩn thống báo lỗi
      this.tooltipDepartment=true
    },
    /***
     * Chọn tất cả vị trí
     * Created by CMChau(15/4/2021)
     * Updated by CMChau(27/4/2021)
     * Thêm ẩn viền, thông báo lỗi, ẩn dòng "Tất cả vị trí"
     */
    loadDataPosition() {
      // Gán tên vị trí
      this.selectedPositionName = "Tất cả vị trí";
      // Ẩn list vị trí
      this.showCbbListPosition = false;
      // Ẩn border input
      this.outLinePosition = false;
      // Ẩn dòng "Tất cả vị trí"
      this.isHidePosition = true;
      //Ẩn viền lỗi
      this.errOutline=false
      //Ẩn thông báo lỗi
      this.tooltipPosition=true

    },
    // hideRowCombobox(){
    //   this.isHidePosition=true
    //   this.isHideDepartment=true
    // }
  },
  // created() {
  //   this.hideRowCombobox()
  // },
};
</script>
<style scoped>
#imput-search {
  width: 250px;
}

.out-line-input-department {
  border-color: #019160;
}

.out-line-input-position {
  border-color: #019160;
}

.show-combobox-list-department {
  display: block;
}

.show-combobox-list-position {
  display: block;
}

.highlight {
  background-color: #019160 !important;
  color: #fff;
}

.combobox-list option {
  width: 180px;
  padding: 0;
}

.hide-position-name {
  display: none;
}

.hide-department-name {
  display: none;
}

.icon-down-list {
  height: 15px;
  width: 15px;
  outline: none;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
}

.hide-check-icon {
  display: none;
}

.filter-state {
  position: absolute;
  z-index: 10;
  background: #70dfba;
  height: 40px;
  width: 100px;
  color: #fff;
}

.error-outline-position {
  border-color: red;
}
.error-outline-department {
  border-color: red;
}

.tooltip-text {
  font-size: 10px;
  width: 180px;
  position: absolute;
  left: 50px;
  top: 20px;
  border: 0.5px solid #bbbbbb;
  background-color: #ffffff;
  padding: 4px;
  visibility: hidden;
  z-index: 1;
}

#combobox-position:hover .tooltip-text {
  visibility: visible;
}
#combobox-department:hover .tooltip-text {
  visibility: visible;
}
.tooltip-text-position {
  display: none;
}
.tooltip-text-department {
  display: none;
}
</style>

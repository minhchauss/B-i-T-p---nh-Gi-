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
        <div class="combobox-selected-item">
          <input
            type="text"
            tabindex="-1"
            v-bind:class="{
              'out-line-input-department': outLineDepartment,
              'error-outline-department': errOutlineDepartment,
            }"
            v-model="selectedDepartmentname"
            @input="filterDepartmentName()"
          />
          <div
            class="icon-down"
            tabindex="-1"
            @click="focusIconDown()"
            v-bind:class="{
              'out-line-input-department': outLineDepartment,
              'error-outline-department': errOutlineDepartment,
            }"
          >
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </div>
        </div>
        <div
          class="combobox-content"
          tabindex="-1"
          v-bind:class="{ 'show-combobox-list-department': showCbbList }"
          @focusout="unFocusList()"
        >
          <div class="combobox-list" tabindex="-1">
            <div
              class="combobox-item"
              tabindex="-1"
              @click="loadDataDepartment()"
              :class="{ 'hide-department-name': isHideDepartment }"
            >
              <div class="text-position">Tất cả phòng ban</div>
            </div>
            <div v-if="filterDepartmentInput">
              <div
                v-for="item in filterDepartmentInput"
                :key="item.DepartmentId"
                class="combobox-item"
                tabindex="1"
                @click="selectNameDepartment(item.DepartmentName)"
                :class="{
                  highlight: item.DepartmentName == selectedDepartmentname,
                }"
              >
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
        <div class="combobox-selected-item">
          <!------------------Input nhập --------------------->
          <input
            type="text"
            tabindex="-1"
            v-bind:class="{
              'out-line-input-position': outLinePosition,
              'error-outline-position': errOutline,
            }"
            v-model="selectedPositionName"
            @input="filterPositionName()"
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
    this.filterDepartmentInput=this.departments;
  },
  created() {
    this.setValueInput();
    this.filterPositionInput = this.positions;
    this.filterDepartmentInput=this.departments;
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
      errOutlineDepartment:false,
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
      defaultPositionName:"Tất cả vị trí",
        
    };
  },
  methods: {
    /**
     * Điều hướng bằng mũi tên
     */
    // nextItem(e) {
    //   if (e.keyCode == 38 && this.value > 1) {
    //     this.value--;
    //   } else if (e.keyCode == 40 && this.value < 3) {
    //     this.value++;
    //   }
    // },
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
      this.showCbbList=false;
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
     */
    focusIconDown() {
      // Hiện border input
      this.outLineDepartment = !this.outLineDepartment;
      // Hiện list phòng ban
      this.showCbbList = !this.showCbbList;

    },
    /**
     * Click vào icon down vị trí
     */
    clickIconDownPosition() {
      // Hiện border input
      this.outLinePosition = !this.outLinePosition;
      // Toggle list vị trí
      this.showCbbListPosition = !this.showCbbListPosition;

    },
    /**
     * Sau khi bấm ra ngoài combobox phòng ban
     */
    unFocusList() {
      // Ẩn list phòng ban
      this.showCbbList = false;
      // Ẩn border input
      this.outLineDepartment = false;
    },
    /***
     * Sau khi bấm ra ngoài combobox vị trí
     */
    unFocusListPosition() {
      // Ẩn list vị trí
      this.showCbbListPosition = false;
      // Ẩn border input
      this.outLinePosition = false;
    },
    /**
     * Gọi Api để lọc theo select
     */
    async onFilterDepartment(selectDepartmentId) {
      this.employees = await this.$axios.$get(
        "/Department/Filter/" + selectDepartmentId
      );
    },
    /**
     * Gọi Api để lọc theo select position
     */
    async onFilterPosition(selectPositionId) {
      this.employees = await this.$axios.$get(
        "/Positions/Filter/" + selectPositionId
      );
    },
    /**
    Binding tên phòng ban vào form lọc
    Created by CMChau (14/4/2021)
     */
    selectNameDepartment(nameDepartment) {
      // Gán tên phòng ban
      this.selectedDepartmentname = nameDepartment;
      // Ẩn list phòng ban
      this.showCbbList = false;
      // Hiển thị dòng "Tất cả vị trí"
      this.isHideDepartment = false;

      this.outLineDepartment = false;
    },
    // Binding tên vị trí
    selectNamePosition(name) {
      // Gán tên vị trí
      this.selectedPositionName = name;
      // Ẩn list vị trí
      this.showCbbListPosition = false;
      // Hiển thị dòng "Tất cả vị trí"
      this.isHidePosition = false;
      // Thêm dấu tick
      this.hideCheckIcon = false;
    },
    /**
     *Chọn tất cả phòng ban
     *Created by CMChau(15/4/2021)
     *
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
    },
    /***
     * Chọn tất cả vị trí
     * Created by CMChau(15/4/2021)
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
</style>

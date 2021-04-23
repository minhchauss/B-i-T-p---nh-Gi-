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
            }"
            v-model="selectedDepartmentname"
          />
          <div
            class="icon-down"
            tabindex="-1"
            @click="focusIconDown()"
            v-bind:class="{
              'out-line-input-department': outLineDepartment,
            }"
          >
            <font-awesome-icon :icon="icon" />
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
              Tất cả phòng ban
            </div>
            <div
              v-for="item in departments"
              :key="item.DepartmentId"
              class="combobox-item"
              tabindex="1"
              @click="selectNameDepartment(item.DepartmentName)"
              :class="{
                highlight: item.DepartmentName == selectedDepartmentname,
              }"
            >
            <div
              class="icon-down-list" >
                <font-awesome-icon :icon="iconCheck" />
              </div>
              {{ item.DepartmentName }}
            </div>
          </div>
        </div>
      </div>
      <div class="combobox">
        <div class="combobox-selected-item">
          <input
            type="text"
            tabindex="-1"
            v-bind:class="{
              'out-line-input-position': outLinePosition,
            }"
            v-model="selectedPositionName"
          />
          <div
            class="icon-down"
            tabindex="-1"
            @click="focusIconDownPosition()"
            v-bind:class="{
              'out-line-input-position': outLinePosition,
            }"
          >
            <font-awesome-icon :icon="icon" />
          </div>
        </div>
        <div
          class="combobox-content"
          tabindex="-1"
          v-bind:class="{ 'show-combobox-list-position': showCbbListPosition }"
          @focusout="unFocusListPosition()"
        >
          <div class="combobox-list" tabindex="-1">
            <div
              :class="{ 'hide-position-name': isHidePosition }"
              class="combobox-item"
              tabindex="-1"
              @click="loadDataPosition()"
            >
              Tất cả vị trí
            </div>
            <div
              v-for="item in positions"
              :key="item.PositionId"
              class="combobox-item"
              tabindex="1"
              @click="selectNamePosition(item.PositionName)"
              :class="{ highlight: item.PositionName == selectedPositionName }"
            >
              <div
              class="icon-down-list" >
                <font-awesome-icon :icon="iconCheck" />
              </div>
              <div>{{ item.PositionName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    icon() {
      return ["fas", "angle-down"];
    },
    iconCheck() {
      return ["fas", "check"];
    },
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
  },
  data() {
    return {
      selectDepartmentId: null,
      selectPositionId: null,
      selectedDepartmentname: "Tất cả phòng ban",
      selectedPositionName: "Tất cả vị trí",
      outLineDepartment: false,
      showCbbList: false,
      nameDepartment: null,
      namePosition: null,
      outLinePosition: false,
      showCbbListPosition: false,
      isHidePosition: true,
      isHideDepartment: true,
      selectedRowPositionId: null,
      checkIcon:true,
      hideCheckIcon:true,
    };
  },
  methods: {
    /**
     * Click vào icon down phòng ban
     */
    focusIconDown() {
      // Hiện border input
      this.outLineDepartment = true;
      // Hiện list phòng ban
      this.showCbbList = !this.showCbbList;
    },
    /**
     * Click vào icon down vị trí
     */
    focusIconDownPosition() {
      // Hiện border input
      this.outLinePosition = true;
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
    },
    // Binding tên vị trí
    selectNamePosition(name) {
      // Ẩn list vị trí
      this.showCbbListPosition = false;
      // Gán tên vị trí
      this.selectedPositionName = name;
      // Hiển thị dòng "Tất cả vị trí"
      this.isHidePosition = false;
      // Thêm dấu tick
      this.hideCheckIcon=false
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
  height: 30px;
  width: 30px;
  outline: none;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 150%;
  padding-right: 10px;
}

.hide-check-icon{
  display: none;
}

</style>

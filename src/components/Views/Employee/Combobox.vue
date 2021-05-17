<template>
  <div>
    <div class="toolbarSelect">
      <div>
        <input
          id="imput-search"
          type="text"
          class="input-search"
          placeholder="Tìm kiếm theo mã, tên nhân viên"
          v-model="searchNameCode"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import A from '../../../assets/img/'
export default {
  props:{
    employees:{
      type:Array,
      default:null,
    }
  },
 data() {
   return {
     searchNameCode:"",

   }
 },
 methods: {
   filterNameOrCode(){
if(this.searchNameCode===0){
  return true;
}return 0;
   },
 },
 computed:{

 }
};
</script>
<style scoped>
/* #imput-search {
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
} */
</style>

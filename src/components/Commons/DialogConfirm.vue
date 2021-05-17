<template>
  <div
    id="dialogConfirmDelete"
    class="dialog"
    v-bind:class="{ 'dialog-hide': isHideDialogConfirm }"
  >
    <div class="model"></div>
    <div class="dialog-content" style="width: 500px">
      <div class="dialog-header">
        <div class="dialog-close-button" v-on:click="btnOnCancel()">
          &#x2715;
        </div>
      </div>
      <div class="dialog-body">
        <div class="icon-svg icon-alert-delete"></div>
        <p :style="styleAlert">{{ messageDelete }}</p>
      </div>
      <div class="dialog-footer">
        <button
          class="btn-default btn-cancel btn-cancel-delete"
          v-on:click="btnOnCancel()"
        >
          Hủy
        </button>
        <button
          id="btnConfirmDelete"
          class="btn-default"
          v-on:click="btnOnConfirmOk()"
          style="background-color: #f65454"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  created() {},
  props: {
    isHideDialogConfirm: {
      type: Boolean,
      default: true,
    },
    selectedId: {
      type: String,
      default: null,
    },
    employee: {
      type: Object,
      default: null,
    },
    messageDelete: {
      type: String,
      default: null,
    },
  },
  methods: {
    /**
     * Ấn hủy xóa
     * Createdby CMChau 10/5/2021
     */
    btnOnCancel() {
      this.$emit("hideDialogDetail", false);
    },
    /**
     * Ấn xóa
     * Createdby CMChau 10/5/2021
     */
    btnOnConfirmOk() {
      this.$emit("deleteDataOnRow", this.selectedId);
      console.log(this.selectedId);
      this.$emit("hideDialogDetail", false);
    },
  },
  data() {
    return {
      font: this.messageDelete,
    };
  },
  computed: {
    styleAlert() {
      return {
        "--font": this.font,
      };
    },
  },
};
</script>
<style scoped>
@import url(../../assets/css/CommonCss/dialog.css);
@import url(../../assets/css/EmployeeCss/employee.css);
.dialog-body p {
  font-style: oblique;
  font-weight: normal;
}
.dialog-body {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-footer {
  height: 60px;
}
.btn-cancel-delete:hover {
  background-color: #e5e5e5;
}
.icon-alert-delete {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -593px -145px;
  width: 40px;
  height: 30px;
}
</style>
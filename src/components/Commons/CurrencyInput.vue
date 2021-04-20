<template>
  <currency-input
    type="text"
    v-model="value"
    :tabindex="tabindex + 1"
    class="form-control"
    aria-describedby="inputGroupPrepend2"
    oninvalid="this.setCustomValidity('Vui lòng nhập đúng số tiền')"
    currency="VND"
    required
  />
</template>

<script>
export default {
  data: () => ({ value: "" }),
};
</script>
<style scoped>
@import url(../../assets/css/CommonCss/dialog.css);
@import url(../../assets/css/EmployeeCss/employee.css);
</style>
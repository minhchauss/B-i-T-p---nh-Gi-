<template>
  <div>
    <div class="header">
      <div class="enterprise-name">
        <div class="icon-header icon-svg icon-nbar-group"></div>
        <div class="enterprise-drop">
          CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUÍ PHÚC
        </div>
        <!-- <img src="../../assets/icon/btn-next-page.svg" /> -->
      </div>
      <div class="user-name">
        <div class="icon-svg bell-img"></div>
        <div class="icon-svg user-img"></div>
        <span>Chu Minh Châu</span>
        <div class="dropdown-user"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  component: {},
};
</script>

<style scoped>
.icon-nbar-group {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  background-position: -847px -35px;
}
.icon-header {
  height: 30px;
  width: 30px;
  margin-left: 10px;
  margin-top: 15px;
}
.bell-img {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -257px -32px;
  height: 30px;
  width: 30px;
  margin-right: 0;
  margin-top: 5px;
}
.user-img {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -352px -894px;
  height: 30px;
  width: 30px;
  margin-right: 0;
  border-radius: 50%;
  padding-left: 2px;
  margin-left: 5px;
}
.dropdown-user {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -1078px -38px;
  height: 20px;
  width: 15px;
  margin-top: 15px;
}
</style>
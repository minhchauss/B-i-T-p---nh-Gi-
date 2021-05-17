<template>
  <div>
    <div id="navbar">
      <div class="logo-box">
        <div class="sidebar icon-svg icon-toggle"></div>
        <!-- <SvgSprite symbol="cls-316" size="0 0 24 24" /> -->
        <div class="logo"></div>
        <div><h3>KẾ TOÁN</h3></div>
      </div>
      <div class="navbar-box">
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-dashboard"></div>
          <div class="navbar-text">Tổng quan</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-cash"></div>
          <div class="navbar-text">Tiền mặt</div>
        </a>
        <router-link class="navbar-item" to="#">
          <div class="navbar-icon icon-svg amis-icon-save-money"></div>
          <div class="navbar-text">Tiền gửi</div>
        </router-link>
        <router-link class="navbar-item" to="/Nhan-vien">
          <div class="navbar-icon icon-svg amis-icon-employee"></div>
          <div class="navbar-text">Danh mục nhân viên</div>
        </router-link>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-buy"></div>
          <div class="navbar-text">Mua hàng</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-sell"></div>
          <div class="navbar-text">Bán hàng</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-vat"></div>
          <div class="navbar-text">Thuế</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-setting"></div>
          <div class="navbar-text">Quản lý hóa đơn</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-repos"></div>
          <div class="navbar-text">Kho</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-tool"></div>
          <div class="navbar-text">Công cụ dụng cụ</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-static"></div>
          <div class="navbar-text">Tài sản cố định</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-price"></div>
          <div class="navbar-text">Giá thành</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-common"></div>
          <div class="navbar-text">Tổng hợp</div>
        </a>
        <a class="navbar-item" href="#">
          <div class="navbar-icon icon-svg amis-icon-report"></div>
          <div class="navbar-text">Báo cáo</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
//  import { SvgSprite } from 'vue-svg-sprite'
export default {
  components: {
    // SvgSprite,
  },
};
</script>

<style scoped>
.icon-toggle {
  background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat ;
  background-position: -428px -92px;
  width: 20px;
  height: 38px;
  color: #fff;
  margin-left: 20px;
  margin-top: 20px;
  size: 150%;

}
.amis-icon-dashboard {
  background-position: -33px -1587px;
  width: 18px;
  height: 18px;
}
.amis-icon-cash {
  background-position: -78px -1588px;
  width: 20px;
  height: 20px;
}
.amis-icon-save-money {
  background-position: -121px -1590px;
  width: 18px;
  height: 18px;
}
.amis-icon-employee {
  background-position: -636px -1588px;
  width: 18px;
  height: 18px;
}
.amis-icon-buy {
  background-position: -165px -1589px;
  width: 18px;
  height: 18px;
}
.amis-icon-sell {
  background-position: -206px -1588px;
  width: 18px;
  height: 18px;
}
.amis-icon-vat {
  background-position: -427px -1591px;
  width: 18px;
  height: 18px;
}
.amis-icon-setting {
  background-position: -254px -1589px;
  width: 18px;
  height: 18px;
}
.amis-icon-repos {
  background-position: -294px -1589px;
  width: 18px;
  height: 18px;
}
.amis-icon-tool {
  background-position: -339px -1590px;
  width: 18px;
  height: 18px;
}
.amis-icon-static {
  background-position: -382px -1589px;
  width: 18px;
  height: 18px;
}
.amis-icon-price {
  background-position: -471px -1590px;
  width: 18px;
  height: 18px;
}
.amis-icon-common {
  background-position: -514px -1590px;
  width: 18px;
  height: 18px;
}
.amis-icon-report {
  background-position: -552px -1593px;
  width: 18px;
  height: 18px;
}
</style>
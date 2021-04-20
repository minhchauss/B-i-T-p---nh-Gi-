<template>
  <div>
    <div class="notic-dialog" :class="{'dialog-hide':showNotic}">
      <p>{{ messageNotification }}</p>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        messageNotification:{
            type:String,
            default:"",
        },
        showNotic:{
            type:Boolean,
            default:true,
        }
    },
};
</script>

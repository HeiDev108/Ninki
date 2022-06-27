<template>
  <div class="half-circle-spinner">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
  </div>
</template>

<script>
export default {

};

</script>

<style>
.half-circle-spinner, .half-circle-spinner * {
  box-sizing: border-box;
}

.half-circle-spinner {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: relative;
}

.half-circle-spinner .circle {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
  border-top-color: #60A5FA;

  -webkit-animation: half-circle-spinner-animation 1000ms infinite;
          animation: half-circle-spinner-animation 1000ms infinite alternate;
}

.half-circle-spinner .circle.circle-2 {
  border-bottom-color: #60A5FA;

  -webkit-animation: half-circle-spinner-animation 1000ms infinite;
          animation: half-circle-spinner-animation 1000ms infinite alternate;
}

@-webkit-keyframes half-circle-spinner-animation {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes half-circle-spinner-animation {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>

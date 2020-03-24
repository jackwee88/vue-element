<template>
  <div>
    <!-- <svg t="1492500959545" @click="toggleClick" class="hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"
      version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
      <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
        p-id="1692"></path>
      <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
        p-id="1693"></path>
      <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
        p-id="1694"></path>
    </svg>-->
    <img
      @click="toggleClick"
      class="hamburger"
      :class="{'is-active':isActive}"
      src="data:image/png;base64,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"
      alt
    />
    <!-- <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" @click="toggleClick" class="hamburger" :class="{'is-active':isActive}" >
        <title>sz-1</title>
        <desc>Created with Sketch.</desc>
        <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="余额提现" transform="translate(-330.000000, -32.000000)" fill-rule="nonzero">
                <g id="更多" transform="translate(330.000000, 32.000000)">
                    <g id="sz-1">
                        <g id="编组">
                            <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="16" height="16"></rect>
                            <path d="M14.453125,12.671875 L1.5546875,12.671875 C1.3671875,12.6828125 1.1875,12.5890625 1.090625,12.4265625 C0.99375,12.265625 0.99375,12.0625 1.090625,11.9015625 C1.1875,11.740625 1.3671875,11.6453125 1.5546875,11.65625 L14.453125,11.65625 C14.640625,11.6453125 14.8203125,11.7390625 14.9171875,11.9015625 C15.0140625,12.0625 15.0140625,12.265625 14.9171875,12.4265625 C14.81875,12.5890625 14.640625,12.6828125 14.453125,12.671875 Z M14.453125,8.3546875 L1.5546875,8.3546875 C1.3671875,8.365625 1.1875,8.271875 1.090625,8.109375 C0.99375,7.9484375 0.99375,7.7453125 1.090625,7.584375 C1.1875,7.4234375 1.3671875,7.328125 1.5546875,7.3390625 L14.453125,7.3390625 C14.640625,7.328125 14.8203125,7.421875 14.9171875,7.584375 C15.0140625,7.7453125 15.0140625,7.9484375 14.9171875,8.109375 C14.81875,8.2703125 14.640625,8.365625 14.453125,8.3546875 Z M14.453125,4.3703125 L1.5546875,4.3703125 C1.3671875,4.38125 1.1875,4.2875 1.090625,4.125 C0.99375,3.9640625 0.99375,3.7609375 1.090625,3.6 C1.1875,3.4390625 1.3671875,3.34375 1.5546875,3.3546875 L14.453125,3.3546875 C14.640625,3.34375 14.8203125,3.4375 14.9171875,3.6 C15.0140625,3.7609375 15.0140625,3.9640625 14.9171875,4.125 C14.81875,4.2859375 14.640625,4.38125 14.453125,4.3703125 Z" id="形状" fill="#FFFFFF"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>-->
  </div>
</template>

<script>
export default {
  name: "hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
};
</script>

<style lang="less" scoped>
.hamburger {
  display: inline-block;
  // margin-top: 6px;
  cursor: pointer;
  width: 42px;
  height: 57px;
  transform: rotate(0deg) scale(0.6);
  transition: 0.36s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(-90deg) scale(0.6);
}
</style>

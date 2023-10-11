<template>
  <div class="container-main">
    <div class="top-content">
      <el-image
        class="ml-3 mt-1.5"
        style="width: 40px; height: 40px"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAACACAYAAADgZTAeAAAAAXNSR0IArs4c6QAADBRJREFUeF7tnX1sG/UZx7/POSmUVBqw9WVsaLRrt5VtKRpjS1qkpay08fkckrDMdlxo4Y/uDQ3G0ESHNKjQoBrTqoE6JCS0ijaJ07e0zdkuRUAkaJ0hBIwWWiraIY0OibdKWwtpE98zXWhD2iTN/eyzfT4/92+fl9/z+X16ceLzz4Qcrqam5XOtoaE4QHNAPAfAHDCuyKGUpJSewHGAjxK0o2A+ygHebJrdr6gui1QSDD1yG0BRAEtV8iS2vAgQsNdi2jrl9MDGnmd7PnKyekciGY3RBhDfC6JlTopKjG8IHATzWjPd/dRkE11QpIaGhqqaqbMeJsI9kxWSf/cvAQY2g/jBZLL7wERTTijSsmVtl1cHqjYAHPYvIpnMKQEGjmgWrezd3fXieDnjihQOt822soGNBCxy2kjiKoLAx0y4NZlMJM+fdoxIn92JAs8BWFARaGRIZQLE9OPedJftyMg1RqSwHlvP4F8qV5eESiKwL8vTb0inHzt1duhzRDKCkTiINlUSEZk1VwL0iJnq+t0YkVpabpkxeGqwH8DsXEtLXmURYIJx9vXSyB0pHIrdxczrKguFTJsngU4zlYjbNUZEMvToSwCuy7OwpFcYAQuB2lSqY/+wSE2hSKvFtK3CGMi4rhCgtWaqa/WwSOFgdAMTVrhSV4pUFgHmt8109zxqa2sLfHoy8B6A6ZVFQKZ1jYCGJaTrsRs18B7XikqhiiPAwDoK6ZH1BMrnD5BrYKHP3J3oqziCPhjYfraMs9kgM98HYGaOIx0mQ49mANTlVIB5hZNHDHKqLUlFJXDmYcVHAQRzaWyL9CaA+arJ9u0smUrcrZon8d4lEG6MXc8av5DLCskIRo+BlB+THchyYF463fFuLk0lx7sEDD32DMBLVFdo35FOAKhRTDxkphLKdzHFHhJeAgJGKPokGLertrZFYtUkMPrMdGKxcp4keJ6AoUcfAHC/6kJFJFViPo8XkXy+wcUaT0QqFmmf9xGRfL7BxRpPRCoWaZ/3EZF8vsHFGk9EKhZpn/cRkXy+wcUaT0QqFmmf9xGRfL7BxRpPRCoWaZ/3EZF8vsHFGk9EKhZpn/cRkXy+wcUar6xEWvr0LTXTpllXW8S1YFw5GhIF6BIGpmsWfxmEE8z0IQgfssVD58QR3rA0emNnXYf9hKdcLhEoG5Fa+pffA+Y7AXzVldkJ/cy0ekf9JvnwgQtAy0Kklkw8DaDRhXnHlGDwAzvqO9cUonYl1fS8SK2ZeISBRGE3Rbu6p37jwcL28Hd1T4t0c3+s1mLNPjJnaiG3gZmf3rGwsyB3vEKu20u1PS1SSyb+cwCPFwOYRfi2vADPnbSnRWrOxNcTkM+neZ2TYf5pz8LOLc4TJHI0AU+L1JKJPw+goRhbxhav2bGo0/4khFw5EPC0SK398YeYsTqHuZRTNNJC2+o2ppQTJWGYgLdF2hdvZ0JHMfaKkZ29oz7xTjF6+bGHp0Vqfn7lpbh48BUq8EGnBN62vb7zJ37c4GLN5GmRbAjN+2LNRFpPIYF8YaB66obFGwYK2cPvtT0vkr0BLZl2+zveCnGO97EsWfquuq7X/b7RhZ6vLESyIbTubf8aa/QXAD8C8MU8wbwDxpaehR0jB4fnWa/i08tGpNE71ZKJzAeq1N+9Z7xmVWWbdv4g8e+K33mXAZSlSJ/9uIurn4YC9PXUd8hpKC5L5Plf/y80r4hUABvyKCl3pDzgSernBEQkscEVAiKSKxiliIgkDrhCQERyBaMUEZHEAVcIiEiuYJQiIpI44AoBEckVjFJERBIHXCEgIrmCUYqISOKAKwREJFcwShERSRxwhYCI5ApGKSIiiQOuEBCRXMEoRUQkccAVAiKSKxiliIgkDrhCQERyBaMUEZHEAVcIiEiuYJQiIpI44AqBshTp5v72eRbTYWUCjNcGcdowF245ppw7SUIo1H4ZZa0FVE0Henu7PnS7/k1Lo1cOVWszNO1/B3t7ez9xu36+9cpGpOa97deQRmvAXA+i6XkNznyECHu213fmfT5lKBRZRazdAfB3R63psH1S7mB2yuo9ezaezGethh77E4PbCLhqVJ1XmbE1mU48lE9tN3PLQqTmffG7iLDOzcHP1DpOBH17XYd9BLPyZehR+6jA4ISJzG8jELjTNDuVjxRsaozVWhrbeV+5wMIOmKnEaIGVZ3ArwfMiNfe3X0tML7s18Hh1plfXTHni+08MqvQw9Oh+AN9xkHPg9FB1ncqdqaFh5cXTLhn41EFtOyRtphK6w9iChXlapPDLqy6pHjz5HAM/LBgBuzBjfc/Cjjuc9ggFo78nwh+dxjPjPpUfQ4Ye2QrQzY7rE/8smex+wml8IeI8LVJzpn0lgf5eiMHPr8nW0Nwdi7qPOOll6JFXAbrGSexwDPPbZrp7npP4xsboVVUa/uUk9vMY2m+mumrVctyN9rRILZn4XwH82t2Rx69GjNbtCzsmPauyubn50qHTFx9XXRMTFiWTiX2T5RlGuw7LSk4WN+Y/AmmXJ5OdyutS7TNRvNdFKt6B7Q6/JclojDZAg70u1WuNmUpMeiC8oUfvBzBp3JjmFhabuxMl+8owT4vUmon/mYHfqu5YLvEEuml7/aZdk+WGw7EvcZY/mCwu140OhaJNxNipWj/L2Rnp9Bb1dak2miDe0yK19MdvB+NJl2a9YJlsFX1r13Wb3nLSy9Cjdtw3nMSeiXnfTCVmOolvalz+TUsbOuQk9mwMAUd6U4m5Kjlux3papNbM8u8xcQaMKW4Pfk49Qn9PXUe90x5GMPo3EH7hNB6Mx810wvEfPw09mgFQ57g+6BEz1VXSE3o9LZINsqU//jAY9zqHqh7JoMWqX0lq6NGPAVzmoNtxzcrW79q9xdHdzq6n+DrsmJlKuPP1rA6GmSjE8yINy5SJb7OP2s5jzglTc/1WpHAwUsdE9p1jssvRi+zzizh90a1ZtGDX7tIfOF8WIg3L9I+4QRbWMeDKawH7vTCiwG/y+QrSVdeuqv7PzP/ab938ahybXoCFP+Tzm1QoFJlvzwyiZWPr87YTn0xd3tfnja++KBuRbJBtz7dNO33RRbUacS1bPGs0XAqghkEzKcuzQPgERO/D4g8YOP+tjyOBQNU/t9U95drXRgSDka8HAlQLC7VMeDWQrXpr125nL9wnu53Z/26/78YaL7CYZjDh9epqPrRzp7cOnS8rkZxAl5jSEBCRSsPdd11FJN9taWkGEpFKw913XUUk321paQYSkUrD3XddRSTfbWlpBhKRSsPdd11FJN9taWkGEpFKw913XUUk321paQYSkUrD3XddRSTfbWlpBhKRSsPdd11FJN9taWkGykekEwBqFJd9yEwl5ivmSHgZEDBC0SfBuF11qWQEo8dAuEIxcSDLgXnpdMe7inkS7nEChh57BuAlqsskQ4++CUD57sLAumQqcbdqQ4n3LoFwY+x61viFXFZoi6T4kZlRbZhXmOnup3JpLDneItDUtHyuNTT06AWP97nAkimkR9YTyPFntcaptQYW+vJ5ON5bSCtrNbZAnM0Gmfk+AI4+/DkOocOk67EbNfCeysIn07pJwH6ZQ21tbYFPTwbeA5DfMXxurkxqlRcBDUvIXnE4GN3AhBXltXpZrScInDkzalikplCk1WKyPwUrlxBQJEBrzVTX6mGR7MvQoy8BuE6xioRXOAELgdpUqmP/iEjhUOwuZi7EibMVjtrX43eaqUTcnnBEpJaWW2YMnhq0jxee7evRZTjXCDDBSCYTw8cbjog0/OMtGImDaJNrnaSQjwmce5bTOSIN/wanx9YzOJ8/UPoYnox2hsC+LE+/IZ1+7NRZImNEWras7fLqQOA5AAsEmxAYjwAx/bg33WU7MnKNEWn4rhRum21lAxsJWCQohcAoAh8z4dazr4smFckO+OzOVLUB4LCgFAIMHNEsWtm7u+vFce9SF0LU0NBQVTN11sNEuEdQVi4BBjaD+MFksvvARBTG/dF2fvDwoZrE945/dF3lAq6AyQ+Cea2TR4UciXQWmKFHbgMoCmBpBUCs2BEJ2GsxbZ1yemBjz7M9HzkBoSTS2YJnHoKKAzQHxHMAzAErP67rZH0SU3gCxwE+StCOgvkoB3izaXa/otr2//QajcuGUogdAAAAAElFTkSuQmCC"
        fit="contain"></el-image>
      <div class="description_content ml-5">
        <div class="title">Automatic snippets</div>
        <div class="desc mt-0.5">仅需简单的几步设置，来帮助您随时随地使用最有用的文本片段。</div>
      </div>
    </div>

    <div class="setting-container p-5">
      <collection class="left-component" @clickCollection="clickCollection"></collection>
      <div class="right-container border rounded bg-white"></div>
    </div>
  </div>
</template>

<script>
import collection from "@/components/collection.vue";
export default {
  components: {
    collection
  },
  data() {
    return {
      collection_list: [],
      current_collection_index: 0,
    }
  },
  mounted() {
  },
  methods: {

    clickCollection(item,index) {
      console.log(item,index)
    },
    addFunctionality() {
      utools.setFeature({
        "code": "ssh",
        "explain": "快速连接ssh",
        // "icon": "res/xxx.png",
        // "icon": "data:image/png;base64,xxx...",
        // "platform": ["win32", "darwin", "linux"]
        "cmds": ["ssh"]
      })
    },
    delFunc() {
      utools.removeFeature('ssh')
    },
    testButton() {
      const features = utools.getFeatures()
      console.log(features)
    },
  },

}
</script>
<style lang="scss" scoped>
.top-content {
  width: 100%;
  background: #E0E0DE;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  padding: 7px 10px;
  display: flex;
  justify-content: left;

  .description_content {
    .title {
      font-size: 18px;
    }

    .desc {
      font-size: 12px;
      color: #888;
    }
  }
}

.setting-container {
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: space-between;

  .left-component{
    width: 32%;
  }
  .right-container {
    width: 66%;
  }
}
</style>

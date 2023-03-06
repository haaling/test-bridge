<template>
  <div class="hello">
    <div class="button" @click="handlepreview">预览jsb</div>
    <div class="button" @click="handledrawcard">开卡jsb</div>
    <div class="button" @click="handlerewardnogained">奖励jsb-未拥有</div>
    <div class="button" @click="handlerewardgained">奖励jsb-已拥有</div>
  </div>
</template>

<script>
import {  onShare, onPayPanel, onBack, 
  drawRewardJsb,
  previewCard, drawCardJsb, preloadUAMResourceJsb} from '../utils'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
return {
    isHalfView: false,
  };
},
  mounted() {
    onShare(this.shareJsbCallback)
    onPayPanel(this.payPanelJsbCallback)
    onBack(this.backJsbCallback)
    preloadUAMResourceJsb({ resource: {

    }})
  },
  methods: {
    // 端上调用share时的回调，TODO: 图鉴也需要在mounted时init
    shareJsbCallback(data) {
      console.log("shareJsbCallback", data)
      // const { share_type } = data
      // 开卡后的分享和奖励的分享，都是分享活动页。
      this.shareProps = {
        type: 'Card',
        shareLink: '', // TODO: 活动页
        cardList: data.card_list || [],
      }
      // switch (share_type) {
        // 开卡的分享
        // case shareType['card']: {
        //   //
        //   // this.shareLink =
        // }
        // // 如果是奖励分享，则没有回调数据，此时分享出去的是活动页面链接。
        // case shareType['reward']: {

        // }
      // }

      this.sharePanelVisible = true
    },

    // 端上调用支付面板时的回调
    payPanelJsbCallback(data) {
      console.log('payPanelJsbCallback', data)
      const { lottery_num = 1, lottery_id = '' } = data
      this.handlePayPanel({
        lottery_num,
        lottery_id,
      })
      // 唤起支付面板
    },

    // 端上返回时的回调
    backJsbCallback() {
      console.log('backJsbCallback')
      // 返回时刷新页面，TODO: 定位卡池
      this.handleRefresh()
    },

    handlepreview(params) {
      const options = {
        screen_type: Number(this.isHalfView),
        horizontal_card_light_url: '',
        horizontal_card_shadow_url: ' ',
        vertical_card_light_url: '',
        vertical_card_shadow_url: '',
        mid: '',
        total_cnt: '',
        not_on_sale: '',
        is_booked: '',
        ...params,
      }
      try {
        previewCard(options)
      } catch (e) {
        console.error(e)
      }
    },

    handledrawcard() {
      const options = {
        share_type: 1, // 抽卡类型的分享
        screen_type: this.isHalfView ? 1 : 0,
        animation_draw_url: {},
        animation_entry_url: {},
        is_booked: this.isBooked,
        no_on_sale: this.notOnSale,
        act_id: this.actId,
        // ...drawCardEffect,
        // ...params,
      }
      try {
        drawCardJsb(options)
      } catch (e) {
        console.log('error', e)
      }
    },

    handlerewardnogained() {
      const params = {
        is_gained: false, // 是否已获得
      }
      try {
        drawRewardJsb(params)
      } catch (e) {
        console.error(e)

      }
    },

    handlerewardgained() {
      const params = {
        is_gained: true, // 是否已获得
      }
      try {
        drawRewardJsb(params)
      } catch (e) {
        console.error(e)

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  width: 200px;
  height: 40px;
  color: #191919;
  border-radius: 16px;
  line-height: 40px;
  border: 1px solid #191919;
  background: #fff;
  cursor: pointer;
}

.button + .button {
  margin-top: 15px;
}
</style>

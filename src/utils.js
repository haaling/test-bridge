import { biliBridge, isSupport, inBiliApp } from '@bilibili/js-bridge'

export const previewCard = params => {
  // 判断是否在我们 App 内
  if (inBiliApp) {
    // 判断该方法是否在该版本app的webview上，建议每次调用新方法时候都先调用isSupport方法
    isSupport('digital.showDLCItemDetail')
      .then(support => {
        if (support) {
          biliBridge.callNative({
            method: 'digital.showDLCItemDetail',
            data: {
              // 装扮去使用跳链:https://www.bilibili.com/h5/mall/myasset?f_source=&from=&from_id=
              garb_apply_url: '',
              // 查看套装详情跳链:https://www.bilibili.com/blackboard/fe/suit-preview.html?id=
              garb_suit_url: '',
              // 查看持有人链接
              holder_list_url: '',
              ...params,
            },
          })
        } else {
          console.error('不支持card.showDLCItemDetail')
        }
      })
  }
}

//
export const drawCardJsb = params => {
  // 版本判断todo
  isSupport('digital.drawDLCItem').then(support => {
    if (support) {
      biliBridge.callNative({
        method: 'digital.drawDLCItem',
        data: {
          jump_url: '', // 图鉴页跳转链接
          ...params,
        },
      })
    }
  })
}

// 给端上预加载资源
export const preloadUAMResourceJsb = params => {
  isSupport('digital.preloadUAMResource').then(support => {
    if (support) {
      biliBridge.callNative({
        method: 'digital.preloadUAMResource',
        data: {
          ...params,
        },
      })
    }
  })
}
// 页面加载时，传给端上的回调方法
export const onShare = fn => {
  try {
    isSupport('digital.observeCardPkgShare').then(support => {
      console.log('digital.observeCardPkgShare support: ', support)
      if (!support) {
        return
      }
      biliBridge.callNative({
        method: 'digital.observeCardPkgShare',
        /**
         * @param {*} data lottery_id, card_list
         */
        onShareCallback(data) {
          fn && fn(data)
        },
        // 添加监听成功回调
        callback() {
          console.log('add theme change listening success...')
        },
      })
    })
  } catch (e) {
    console.error('e', e)
  }
}

// 唤起面板的回调
export const onPayPanel = fn => {
  try {
    isSupport('digital.observeCardPkgPurchase').then(support => {
      console.log('digital.observeCardPkgPurchase support: ', support)
      if (!support) {
        return
      }
      biliBridge.callNative({
        method: 'digital.observeCardPkgPurchase',
        /**
         * @param {*} data lottery_num , // TODO: lottery_id, // 或者前端存起来
         */
        onPurchaseCallback(data) {
          fn && fn(data)
        },
        // 添加监听成功回调
        callback() {
          console.log('add theme change listening success...')
        },
      })
    })
  } catch (e) {
    console.error('e', e)

  }
}

// 返回时的回调
export const onBack = fn => {
  try {
    isSupport('digital.observeCardPkgDetailViewDisappear').then(support => {
      console.log('digital.observeCardPkgDetailViewDisappear support: ', support)
      if (!support) {
        return
      }
      biliBridge.callNative({
        method: 'digital.observeCardPkgDetailViewDisappear',
        /**
         * @param {*} data lottery_num , // TODO: lottery_id, // 或者前端存起来
         */
        onPurchaseCallback(data) {
          fn && fn(data)
        },
        // 添加监听成功回调
        callback() {
          console.log('add theme change listening success...')
        },
      })
    })
  } catch (e) {
    console.error('e', e)

  }
}

export const drawRewardJsb = params => {
  isSupport('digital.cardPkgRewardDetail').then(support => {
    if (support) {
      biliBridge.callNative({
        method: 'digital.cardPkgRewardDetail',
        data: {
          ...params,
        },
      })
    }
  })
}

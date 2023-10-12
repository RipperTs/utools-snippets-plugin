const placeholder_tags = [
  {
    "label": "日期和时间",
    "value": [{
      "name": "日期和时间",
      "value": "{datetime}"
    },
      {
        "name": "现在日期",
        "value": "{date}"
      },
      {
        "name": "现在时间",
        "value": "{time}"
      },
      {
        "name": "现在时间戳",
        "value": "{timestamp}"
      },
      {
        "name": "日期和时间 (自定义格式)",
        "value": "{isodate:YYYY-MM-DD HH:mm:ss}"
      }
    ]
  },
  {
    "label": "剪贴板",
    "value": [
      {
        "name": "剪贴板",
        "value": "{clipboard}"
      },
      {
        "name": "剪贴板转小写",
        "value": "{clipboard:lowercase}"
      },
      {
        "name": "剪贴板转大写",
        "value": "{clipboard:uppercase}"
      },
      {
        "name": "剪贴板转驼峰",
        "value": "{clipboard:camelcase}"
      },
      {
        "name": "剪贴板转下划线",
        "value": "{clipboard:snakecase}"
      },
      {
        "name": "剪贴板去掉首尾空格",
        "value": "{clipboard:trim}"
      },
    ]
  },
  {
    "label": "随机数",
    "value": [
      {
        "name": "UUID",
        "value": "{uuid}"
      },
      {
        "name": "随机数 (自定义范围)",
        "value": "{random:1..10}"
      }
    ]
  }
]


export default placeholder_tags

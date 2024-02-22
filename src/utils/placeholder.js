/**
 * 动态占位符列表
 */

const placeholder_tags = [
  {
    "label": "日期和时间",
    "value": [{
      "name": "日期和时间",
      "value": "{isodate:YYYY-MM-DD HH:mm:ss}"
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
        "name": "时间偏移+1天",
        "value": "{timeoffset:add:1:day:YYYY-MM-DD}"
      },
      {
        "name": "时间偏移-1天",
        "value": "{timeoffset:subtract:1:day:YYYY-MM-DD}"
      },
      {
        "name": "时间偏移+1月",
        "value": "{timeoffset:add:1:month:YYYY-MM-DD}"
      },
      {
        "name": "时间偏移-1月",
        "value": "{timeoffset:subtract:1:month:YYYY-MM-DD}"
      },
    ]
  },
  {
    "label": "剪贴板",
    "value": [
      {
        "name": "文本内容",
        "value": "{clipboard}"
      },
      {
        "name": "转小写",
        "value": "{clipboard:lowercase}"
      },
      {
        "name": "转大写",
        "value": "{clipboard:uppercase}"
      },
      {
        "name": "转驼峰",
        "value": "{clipboard:camelcase}"
      },
      {
        "name": "转下划线",
        "value": "{clipboard:snakecase}"
      },
      {
        "name": "删除首尾空格",
        "value": "{clipboard:trim}"
      },
      {
        "name": "删除首尾指定字符",
        "value": "{clipboard:trim:xxx}"
      },
      {
        "name": "数字转常规",
        "value": "{clipboard:number}"
      },
      {
        "name": "文件路径",
        "value": "{clipboard:file:0}"
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
  },
  {
    "label": "划词选中",
    "value": [
      {
        "name": "当前选中文本",
        "value": "{selection}"
      },
      {
        "name": "转小写",
        "value": "{selection:lowercase}"
      },
      {
        "name": "转大写",
        "value": "{selection:uppercase}"
      },
      {
        "name": "转驼峰",
        "value": "{selection:camelcase}"
      },
      {
        "name": "转下划线",
        "value": "{selection:snakecase}"
      }
    ]
  },
  {
    "label": "其他",
    "value": [
      {
        "name": "光标位置",
        "value": "{cursor}"
      },
      {
        "name": "手动输入内容",
        "value": "{input:content}"
      },
      {
        "name": "手动输入内容 (多个)",
        "value": "{input:content:1}"
      },
      {
        "name": "内网ip",
        "value": "{ip:0}"
      }
    ]
  },
]


export default placeholder_tags

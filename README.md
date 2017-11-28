# flightRender
基于jQuery||Zepto的航班数据渲染插件，用于项目的航班版块，保证数据的统一和样式的高灵活性

## 如何使用
下载插件:  
1.使用npm   
```
$ git clone git@github.com:Qinhank/flightRender.git
```

2.右上角“Clone or download”  

##HTML模板
``` html
<!DOCTYPE html>
<body>
    <div id="flight"></div>
</body>
</html>
```

## js调用
``` javascript
<script type="text/javascript">
    var api = 某接口;//or
    var data = {数据};
    $('#flight').flightRender({
        url:api,//or
        data:data,
        index:0,
        ...
    });
</script>
```

## 数据格式
``` javascript
var data = {
		"北京":{
			"去程":{
				"第一天":[{
				    "go":"北京",
				    "goTime":"06:20",
				    "goAirplan":"首都国际机场",
				    "back":"马累",
				    "backTime":"12:25",
				    "backAirplan":"马累国际机场",
				    "company":"首都航空 \/ JD455",
				    "transit":"曼谷经停约45分钟"
				}]
			},
			"回程":{
				"第七天":[{
				    "go":"马累",
				    "goTime":"13:50",
				    "goAirplan":"马累国际机场",
				    "back":"北京",
				    "backTime":"00:50+1",
				    "backAirplan":"首都国际机场",
				    "company":"首都航空 \/ JD456",
				    "transit":"曼谷经停约45分钟"
				}]
			},
		}
	};
```

## API
| Name             | Meaning                    | Defalut value |
| ---------------- | -------------------------- | ------------- |
| ```url```        | 获取一个json格式的接口，作为主数据        | ''            |
| ```data```       | 如果url为空，则必须设置数据，详见“数据格式”部分 | ''            |
| ```background``` | 设置整个航班盒子的背景色               | 'white'       |
| ```index```      | 设置默认显示位置                   | 0             |
| ```callback```   | 回调函数，默认返回参数当前标签的index      |               |







;(function($,window,document,undefined){
	if(!$){
		return console.warn('flightRender依赖jQuery或zepto,请确保它们的存在！');
	}
	var Flight = function(container,opt){
		var that = this;
		//未绑定DOM，返回
		if (!container) return;
		this.$element = container;
		//默认参数，url为必填
		this.defaults = {
            background: 'white',
            url:'',
            data:'',
            index:0,
            callback:function(){
            }
        };
		this.options = $.extend({}, this.defaults, opt);
		//入口
		this.init();
	}
	Flight.prototype ={
		init:function(){
			var that = this;
			that.setStyle();
			that.callback();
		},
		//设置样式
		setStyle:function(){
			this.creatChild();//生成DOM

			return this.$element.css({
				background:this.options.background
			});
		},
		//创建子元素
		creatChild:function(){
			var that = this;
			var $infoTitle = document.createElement('div');
			var $infoUl = document.createElement('ul');
			var $infoUl2 = document.createElement('ul');
			//生成title
			$infoTitle.className = 'flightRender-title';
			this.$element.append($infoTitle);
			$infoTitle.append($infoUl);
			//生成content
			var $infoContent = document.createElement('div');
			$infoContent.className = 'flightRender-content';
			this.$element.append($infoContent);
			$infoContent.append($infoUl2);
			that.getData();//数据渲染入口
		},
		//获取ajax数据
		getData:function(){
			var that = this;
			if(that.options.url!=''){
				$.ajax({
					url:this.options.url,
					dataType:'json',
					success:function(e){
						that.flightData = e.data;
					},
					complete:function(){
						that.dealData(that.flightData,function(){
							that.generateCity();
							that.generateDetail(function(){
								that.setTags();
							});
						});
					}
				});
			}else{
				that.flightData = that.options.data;
				that.dealData(that.flightData,function(){
					that.generateCity();
					that.generateDetail(function(){
						that.setTags();
					});
				});
			};
		},
		//处理数据并返回
		dealData:function(data,callback){
			var flightCityNum = 0,//设置默认出发城市数量
				flightCityArr = [],//设置出发城市名
				flightDetail = [];//设置具体城市航班信息
			//循环数据并拆解
			for(var i in data){
				flightCityArr[flightCityNum] = i;
				flightDetail[flightCityNum] = data[i];
				flightCityNum+=1;
			}

			//保存到全局
			this.flightCityNum = flightCityNum;
			this.flightCityArr = flightCityArr;
			this.flightDetail = flightDetail;

			//回调
			if(typeof(callback)=='function'){
				callback();
			}
		},
		//创建航班出发城市信息
		generateCity:function(){
			var that = this;
			for(var i=0;i<that.flightCityNum;i++){
				if(i==that.options.index){
					var $infoLi = "<li class='active' tagFlight='title'>"+that.flightCityArr[i]+"出发</li>";
				}else{
					var $infoLi = "<li tagFlight='title'>"+that.flightCityArr[i]+"出发</li>";
				}
				$('.flightRender-title').find('ul').append($infoLi);
			}
		},
		//创建航班信息
		generateDetail:function(callback){
			var that = this;
			for(var i=0;i<this.flightCityNum;i++){

				//按出发城市数量渲染内容页
				var $liShow = "<li tagFlight='content'><table><tbody class='flightDetailTbody'></tbody></table></li>";
				var $liHide = "<li class='hidden' tagFlight='content'><table><tbody class='flightDetailTbody'></tbody></table></li>";

				i==that.options.index?$('.flightRender-content').find('ul').append($liShow):$('.flightRender-content').find('ul').append($liHide);

				//渲染天数、回去程、时间、航空等
				for(var j in this.flightDetail[i]){
					var data = this.flightDetail[i][j];
					dealDay(data,function(){
						dealData();
					});
				}
			};
			callback();
			function dealData(){
					var goback = "<td>"+j+"</td>";
					var table = "<tr>"+goback+that._htm+"</tr>";
					$(".flightRender-content>ul>li").eq(i).find('.flightDetailTbody').append(table);
			};
			function dealDay(obj,callback){
				for(var k in obj){
					var day = "<td>"+k+"</td>";
					for(var i=0;i<obj[k].length;i++){
						var data = obj[k][i];
						var go = "<td>"+data['go']+" "+data['goTime']+"<br>"+data['goAirplan']+"</td>",
							back = "<td>"+data['back']+" "+data['backTime']+"<br>"+data['backAirplan']+"</td>",
							company = "<td>"+data['company']+"</td>",
							transit = "<td>"+data['transit']+"</td>";
						that._htm = day+go+back+company+transit;
						callback();
					}
				}
			}
		},
		//tag选项卡
		setTags:function(){
			var that = this;
			$(document).on('click',"li[tagFlight='title']",function(){
				var $this = $(this);
				that.index = $this.index();
				$this.siblings('li').removeClass('active');
				$this.addClass('active');
				var $liShow = $("li[tagFlight='content']").eq(that.index);
				$liShow.removeClass('hidden');
				$liShow.siblings('li').addClass('hidden');
				that.callback();
			});
		},
		//回调
		callback:function(){
			var that = this;
			var index = that.index;
			if(index==undefined){
				index = that.options.index;
			}
			this.options.callback(index);
		}
	}
	$.fn.flightRender = function(options){
		var flight = new Flight(this, options);
	};
})(window.jQuery||window.Zepto,window,document);
(function(g, callback)
{
    callback(g);
})

(window,function(g)
{

    var MineCraft = function(width, height, mine_num, obj, type)
    {
        this.num1 = width;//行数
        this.num2 = height;//列数                       
        this.mine_num = mine_num;//雷的个数
        this.tiles = new Array();
        this.obj = obj;//扫雷放置的格子对象
        this.flag = true;//判断是否为第一次点击，默认为ture
        this.arr = new Array();//数组，存储周围八个格子的索引
        this.arr_2 = new Array();//数组，存储周围八个格子的索引
        this.time_dsq = null;//计时数-定时器
        this.time_dc = '';//所用时间
        this.arr_time = new Array();//时间统计信息
        this.details = new Array();//游戏统计详情
        this.type = type;//游戏类型：初级/中级/高级/自定义
        this.BuildTiles();//创建游戏函数
    };

    MineCraft.prototype = 
    {

        BuildTiles:function()//在页面上创建扫雷的界面函数
        {//在传进来的对象上画整体格子，每个小格子51px大小，总大小就为个数*单个大小
            this.obj.style.width = 51*this.num1+'px';//宽度设置
            this.obj.style.height = 51*this.num2+'px';//高度设置
            var indexOfdiv = 0;//每个格子的编号--索引
            for(var i = 0;i<this.num2;i++)//绘制扫雷行列 
            {
                for(var j = 0;j<this.num1;j++)
                {
                    var tile = document.createElement('div');//创建小格子
                    tile.className = 'tile';
                    tile.index = indexOfdiv;
                    this.tiles[indexOfdiv] = tile;//将小格子存入数组中
                    indexOfdiv++;
                    this.obj.appendChild(tile);//将小格子加入对象
                }
            }
            this.obj.oncontextmenu = function()//取消浏览器的默认右键菜单事件
            {
                return false;
            }
            this.Event();//点击事件
        },

        Event : function()//绑事件函数-定义鼠标的操作
        {
            var _this = this;//指向函数域
            this.obj.onmouseover = function(e)//鼠标悬停事件-鼠标停在格子上面时更改格子的类-切换格子的显示，颜色变浅
            {
                if(e.target.className == 'tile')
                {
                    e.target.className = 'tile current';
                }
            }
            this.obj.onmouseout = function(e)//鼠标移出事件-移出格子时改回原来的类
            {
                if(e.target.className == 'tile current')
                {
                    e.target.className = 'tile';
                }
            }
            this.obj.onmousedown = function(e)//鼠标按下事件-点击的操作
            {
                var index = e.target.index;
                if(e.button == 1)//e.button属性 左键0/中键1/右键2
                {
                    event.preventDefault();//如果是中建，取消默认操作
                }
                _this.ChangeStyle(e.button, e.target, index);//将鼠标点击的按键和点击格子的索引传入点击调用函数，进行判断和运行
            }
            this.obj.onmouseup = function(e)//鼠标弹起事件
            {
                if(e.button == 1)
                {
                    _this.ChangeStyle(3,e.target);
                }
            }
        },

        ChangeStyle:function(mouse, obj, num_index)//点击调用的函数-传入鼠标的操作（0-左，1-中，2-右），对象-当前格子，格子的索引
        {
            if(mouse == 0)//是左键的话
            {
                if(this.flag)//this.flag 是之前定义的用于判断是否为第一次点击
                {
                    this.Store(num_index);//store函数，存放被点击的格子周围的8个格子
                    this.SetMineCraft(this.mine_num,this.arr,num_index);//如果是第一次点击,即调用布雷函数
                    this.flag = false;//并更改flag状态
                    this.DetailStatistics(0,false);//开始信息统计函数
                }                
                if(obj.className != 'tile'&&obj.className !='tile current')//如果该格子不是第一次点击，被点击的格子不是未点击状态，无效
                {
                    return false;
                }
                if(obj.getAttribute('val') == 0)//如果不是雷。改为翻开状态
                {
                    obj.className = "showed";
                    obj.innerHTML = obj.getAttribute('value') == 0?'':obj.getAttribute('value');//显示周围雷数
                    this.ShowAll(obj.index);//递归函数判断周围格子的情况，就是扫雷游戏上一点开会出现一片的那种
                }
                if(this.Over(obj))//调用判断游戏是否结束的函数
                {
                    this.Last();//调用结束函数
                }
            }

            if(mouse == 2)//右键标记事件
            {
                if(obj.className == 'biaoji')//如果已经进行过标记
                {
                    obj.className = 'tile';//取消标记
                }
                else if(obj.className !='biaoji'&&obj.className != 'showed')//如果没有进行过标记并且没有被翻开
                {
                    obj.className = 'biaoji';//进行标记
                }
            }

            if(mouse == 1)//中键-1-快速扫雷功能-显示数
            {
                if(obj.className =="showed")
                {
                    this.ShowState1(obj.index);
                }
            }
            if(mouse == 3)//中键-2-判断是否可以进行快速扫雷
            {
                
                if (obj.className == "showed") 
                {
                    var flag1 = this.ShowState2(obj.index,0);
                }
                else
                {
                    this.ShowState2(obj.index,1)
                    return false;
                }

                if(flag1&&this.Over())
                {
                    this.Last();
                }
            }
        },


        Over:function(obj)//结束判断
        {
            var flag = false;//返回值-ture为结束，false为继续
            var showed = document.getElementsByClassName('showed');//获取剩余的雷
            if(showed.length == this.tiles.length - this.mine_num)//如果被排出来的格子数等于总格子数-雷数，这游戏成功结束
            {
                this.DetailStatistics(1,true);//游戏统计 ，true代表胜，false代表失败
                alert('恭喜你获得成功');
                flag = true;
            }
            else if(obj&&obj.getAttribute('val') == 1)//如果被点击的是雷，则炸死
            {
                this.DetailStatistics(1,false);
                alert('被炸死！');
                flag = true;

            }
            return flag;
        },

        Store:function(num) //储存周围的位置,传入格子的index
        {
            var tiles_2d = new Array();//数组存储索引
            var indexs = 0;
            for(var i = 0;i<this.num2;i++)//将每个格子的索引号存入行列数组tiles_2d
            {
                tiles_2d.push([]);
                for(var j = 0;j<this.num1;j++)
                {
                    tiles_2d[i].push(this.tiles[indexs]);
                    indexs++;
                } 
            }
            var row = num % this.num1;//所在行数
            var column = (num - row) / this.num1;//所在列数
            this.arr = new Array();//根据位置将周围八个格子的索引存入arr
            if (column - 1 >= 0 && row - 1 >= 0) //左上
            {
                this.arr.push(tiles_2d[column - 1][row - 1]);
            }
            if (column - 1 >= 0) //正上
            {
                this.arr.push(tiles_2d[column - 1][row]);
            }
            if (column - 1 >= 0 && row + 1 <= this.num1-1) //右上
            {
                this.arr.push(tiles_2d[column - 1][row + 1]);
            }
            if (row - 1 >= 0) //左边
            {
                this.arr.push(tiles_2d[column][row - 1]);
            }
            if (row + 1 <= this.num1-1) //右边
            {
                this.arr.push(tiles_2d[column][row + 1]);
            }
            if (column + 1 <= this.num2-1 && row - 1 >= 0) //左下
            {
                this.arr.push(tiles_2d[column + 1][row - 1]);
            }
            if (column + 1 <= this.num2-1) //正下
            {
                this.arr.push(tiles_2d[column + 1][row]);
            }
            if (column + 1 <= this.num2-1 && row + 1 <= this.num1-1) //右下
            {
                this.arr.push(tiles_2d[column + 1][row + 1]);
            }
        },


        ShowValue:function()//计算周围格子的雷数并存入格子的属性'value'
        {
            var count = 0;//雷数
            for(var i = 0;i<this.tiles.length;i++)//遍历所有格子
            {
                this.Store(this.tiles[i].index);//储存所有格子周围八个格子的索引

                for(var j = 0;j<this.arr.length;j++)//遍历每个格子的周围八个的格子
                {
                    if(this.arr[j].getAttribute('val') == 1)//'val'属性=1，周围有雷
                    {
                        count++;//计数
                    }
                }
                this.tiles[i].setAttribute('value',count);//将每个格子周围的雷数存入'value'属性
                count = 0;

            }
        },

        ShowAll:function(num)//作用是如果该格子周围没有雷，自动翻开周围8个格子，然后再判断周围八个格子的周围8隔格子是否有雷，利用了递归的方法
        {
            if (this.tiles[num].className == "showed" && this.tiles[num].getAttribute("value") == 0)//已经翻开或者周围雷数为0
            {
                this.Store(this.tiles[num].index);//存储周围八个格子的索引
                var arr2 = new Array();//将索引存入数组arr2
                arr2 = this.arr;
                for (var i = 0; i < arr2.length; i++) //遍历周围的格子
                {
                    if (arr2[i].className != "showed"&&arr2[i].className !='biaoji') 
                        if (arr2[i].getAttribute("value") == 0) 
                        {
                            arr2[i].className = "showed";
                            this.ShowAll(arr2[i].index);//递归显示
                        } 
                        else 
                        {
                            arr2[i].className = "showed";
                            arr2[i].innerHTML = arr2[i].getAttribute("value");
                        }
                    }
                }
            }
        },


        SetMineCraft:function(num, arr_first, num_first)//布雷(雷的个数、最开始被点击的格子的周围的格子、最开始被点击的那个格子的索引)
        //第一次点击完成之后布雷（确保第一下点的不是雷），避开直接炸死的现象.所以把调用放在后面的event后触发的changeStyle函数中
        {
            var arr_index = new Array();//数组arr_index存储周围格子的索引
            for(var i = 0;i<arr_first.length;i++)
            {
                arr_index.push(arr_first[i].index);
            }

            var length = this.tiles.length;//length=格子的数量
            for (var i = 0; i < length; i++) 
            {
                this.tiles[i].setAttribute("val", 0);//将所有格子对象的属性'val'（是否有雷）设为0（无雷）
            }

            for (var i = 0; i < num; i++) //遍历所有格子
            {
                var index_Mine = Math.floor(Math.random() * this.tiles.length);//利用随机函数在长度中选择一个数
                if(index_Mine == num_first||arr_index.lastIndexOf(index_Mine)>-1)//如果是属于第一次点击的周围，直接跳过在该位置布雷
                {
                    num++;//增加一个随机数
                    continue;
                }
                
                if (this.tiles[index_Mine].getAttribute("val") == 0) //如果这个位置没有布雷，也不是第一次点击的周围，布雷
                {
                    this.tiles[index_Mine].setAttribute("val", 1);
                }
                else //如果这个位置已经布雷（随机数重复）
                {
                    num++;//增加一个随机数
                }
            }
            this.ShowValue();//计算所有格子的周围雷数
            this.Event()//调用绑事件函数
        },

        Last:function()//结束后的显示雷图片的函数
        {
            var len = this.tiles.length;//长度=格子总数
            for(var i = 0;i<len;i++)//遍历所有格子
            {
                this.tiles[i].className = this.tiles[i].getAttribute('val') == 1?'boom':'showed';//如果有雷，则将格子的类更改为'boom'显示雷的图形，如果没有雷，则翻开
                if(this.tiles[i].className != 'boom')//如果对象的类不是'boom'
                {
                    this.tiles[i].innerHTML = this.tiles[i].getAttribute('value') == 0?'':this.tiles[i].getAttribute('value');//显示周围雷的个数
                }
            }
            this.obj.onclick = null;//小格子中禁止点击
            this.obj.oncontextmenu = null;//小格子中禁止右键功能
        },

  

        ShowState1:function(num)//是鼠标键按下后的显示效果
        {
            this.Store(this.tiles[num].index);//存储周围格子
            for (var i = 0; i < this.arr.length; i++) //遍历周围格子
            {
                if (this.arr[i].className == "tile") //空白显示
                {
                    this.arr_2.push(this.arr[i]);
                    this.arr[i].className = "test";
                }
            }
        },

        ShowState2:function(num, state)//函数是鼠标按下后进行判断
        {
            
            var count = 0;
            this.Store(this.tiles[num].index);
            for(var i = 0,len = this.arr_2.length;i<len;i++)
            {
                this.arr_2[i].className = 'tile';
            }

            this.arr_2.length = 0;
            for(var i = 0;i<this.arr.length;i++)
            {
                this.arr[i].className == 'biaoji'&&count++;
            }
            if(state == 1)
            {
                return false;
            }
            var numofmines = this.tiles[num].getAttribute("value");//如果周围雷数和周围被标记数相等就翻开周围的格子
            if(numofmines == count)
            {
                   var arr = new Array(this.arr.length);
                   for(var i = 0;i<this.arr.length;i++)
                   {
                       arr[i] = this.arr[i];
                   }
                    for (var i = 0,length = arr.length; i < length; i++) 
                    {
                        if (arr[i].className == "tile" && arr[i].getAttribute("val") != 1) //如果周围格子无雷则继续。
                        {
                            arr[i].className = "showed";
                            arr[i].innerHTML = arr[i].getAttribute("value") == 0?"":arr[i].getAttribute("value");
                            this.ShowAll(arr[i].index);
                        } 
                        else if (arr[i].className == "tile" && arr[i].getAttribute("val") == 1) //如果周围格子有雷，游戏结束
                        {
                            this.Over(arr[i]);
                            this.Last();
                            return false;
                        }
                    }
            }
            return true;
        },



        ToPercent:function(point)//百分比转换函数
        {
            var str=Number(point*100).toFixed(1);
            str+="%";
            return str;
        },

        //数组details[难度][x]：[0]:已玩游戏，[1]:已胜游戏，[2]:胜率，[3]:最多连胜，[4]:最多连败，[5]:当前连局；[6]:平均耗时
        DetailStatistics:function(play, state)//传入0开始/1结束和胜负（ture-胜，false-败）
        {
            var time_pay = 1;//所用时间
            var _this = this;//指向函数域
            if(play == 0)//游戏开始
            {
                this.time_dsq = setInterval(function()//setInterval() 方法可按照指定的周期（以毫秒计）来调用函数
                {
                    $('#time_need').text(time_pay);//将时间传入网页中显示
                    _this.time_dc =time_pay;
                    time_pay++;
                },1000);//周期为一秒
        
            }
            else if(play == 1)//游戏结束
            {
                console.log(localStorage.details);//在页面中一直显示统计信息
                clearInterval(this.time_dsq);//clearInterval() 方法取消由 setInterval() 函数设定的定时执行操作
               
                if(this.type == 4)//如果是自定义难度
                {
                    return false;
                }
                
                if(localStorage.details == undefined)//如果localStorage.details不可识别，无存储时（刚开始没有记录时）
                {                    
                    localStorage.details = JSON.stringify([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]);//转换为字符串
                }
               
                if(JSON.parse(localStorage.details) instanceof Array)//如果localStorage.details有数组记录时
                {
                    this.details = JSON.parse(localStorage.details);//读取数据并存入数组 details       
                }
                this.details[this.type][0] += 1;//已玩游戏数加一
                
                if(state == false)//如果这局输了
                {
                    if(this.details[this.type][5]>=0)//如果当前有连胜
                    {
                        this.details[this.type][5] = -1;//连胜变为-1
                    }
                    else
                    {
                        this.details[this.type][5] -= 1;//连败+1
                    }    
                    if(this.details[this.type][5]<this.details[this.type][4])//如果当前连败多于最多连败
                    {
                        this.details[this.type][4] = this.details[this.type][5];//更改最多连败
                    }
                    this.details[this.type][2] = this.ToPercent(this.details[this.type][1]/this.details[this.type][0]); //计算胜率               
                    localStorage.details = JSON.stringify(this.details);//转换字符串显示
                    return false;
                }

                
                //如果这局赢了
                if(this.details[this.type][5]>=0)//如果当前有连胜
                {
                    this.details[this.type][5] += 1;//连胜加一
                }
                else//如果之前没有胜利
                {
                    this.details[this.type][5] = 1;//开始连胜记录
                }
                if(this.details[this.type][5]>this.details[this.type][3])//如果当前连胜大于之前最多连胜记录
                {
                    this.details[this.type][3] = this.details[this.type][5];//更新最多连胜
                }
                this.details[this.type][6] = ((this.details[this.type][6]*this.details[this.type][1]+this.time_dc)/(this.details[this.type][1]+1)).toFixed(1);//计算平均耗时 
                this.details[this.type][1] += 1;//已胜游戏数加一
                this.details[this.type][2] = this.ToPercent(this.details[this.type][1]/this.details[this.type][0]);//计算更新胜率
                localStorage.details = JSON.stringify(this.details);//转换字符串显示
                

                var time1 = new Date();//新建时间                
                var time_str = time1.getFullYear()+'/'+time1.getMonth()+'/'+time1.getDate()+'  '+time1.getHours()+':'+time1.getMinutes();//将时间用字符串显示
                if(localStorage.time == undefined)//如果localStorage.time不可识别，无存储时（刚开始没有记录时）
                {
                    localStorage.time = JSON.stringify([[],[],[]]);//转换为空字符串
                }
                if(JSON.parse(localStorage.time) instanceof Array)//如果localStorage.time有数组记录时
                {
                    this.arr_time = JSON.parse(localStorage.time);//读取数据并存入数组 arr_time 
                }

                this.arr_time[this.type].push([this.time_dc,time_str]);//在对应难度中存储时间及其字符串格式
                this.arr_time[this.type].sort(function(a,b)//用sort()方法将时间数据从小到大排列
                {
                    return a[0]-b[0];
                });
                if(this.arr_time[this.type].length>5)//如果时间记录大于五组
                {
                    this.arr_time[this.type].pop();//出栈，即去除最长的时间
                }
                localStorage.time = JSON.stringify(this.arr_time);//转换为字符串
           
            }
        },


    }
    g.MineCraft = MineCraft;
})


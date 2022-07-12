# ant-colony-optimization【蚁群算法】🐜

目的：为了解决 [旅行推销员问题 TSP](https://zh.wikipedia.org/wiki/%E6%97%85%E8%A1%8C%E6%8E%A8%E9%94%80%E5%91%98%E9%97%AE%E9%A2%98)

单纯的蚁群算法的问题：

## 局部最优 -> MMAS

最短的路有最高的选择概率，一旦选择了这条路，则会留下信息素，从而进一步提高选取这条路的概率，从而容易陷入贪心的局部最优解。

解决方案：最大最小蚂蚁系统 Max-min ant system (MMAS)

信息素被限制在最小值到最大值之间，这样提高了贪心中最差路径的概率，从而防止陷入局部最优。

“只有最优路径上的信息素会被增加，其他城市的信息素只挥发。”关于这点我认为是可选的无关紧要。

## 收敛过慢 -> EAS

蚁群算法本来就是为了解决传统的穷举算法或者动态规划算法速度太慢的问题，因此寻找收敛更快的方案肯定是锦上添花的。

解决方案：精英蚂蚁系统 Elitist ant system（EAS）

对本轮迭代中的最优路径加上额外的信息素。

# Reference

- https://www.cnblogs.com/bokeyuancj/p/11798635.html
- https://www.bilibili.com/video/BV1vp4y1p78R
- https://zh.wikipedia.org/zh-tw/%E8%9A%81%E7%BE%A4%E7%AE%97%E6%B3%95
- https://zhuanlan.zhihu.com/p/95782157
- https://github.com/luzhixing12345/Ant-colony-algorithm
- https://mp.weixin.qq.com/s/poQT_V46ZeucCfx0ctIPvQ

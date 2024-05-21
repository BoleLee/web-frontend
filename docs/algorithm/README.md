# 算法

## 工作中的算法

算风险等级，二维表格，每个维度5个等级，根据维度值得出最终等级，需求如图

![风险矩阵 Risk Matrix](./images/risk_matrix.jpg)

抽象为正方形模型，分析如图：

![风险矩阵数学模型](./images/risk_matrix_model.jpg)

规律为：

```javascript
const cellValue = risk_probability + risk_consepuence - 1
let riskValue = cellValue <= 2 ? 1 : (cellValue <= 4 ? 2 : (cellValue <= 6 ? 3 : 4))
```

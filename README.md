# EnumValueLabel
## Features
* 支持Enum、Value互相转换
* 支持Enum、Value获取Label
* 支持Value、Label转换成数组
* 支持TS，全属性自动推导

## 为什么使用EnumValueLabel
在日常开发中会大量出现以下情况
1. 首先创建枚举
   ``` typescript
   export enum UserType {
        STUDENT = 1, // 学生
        EXPERT,      // 专家
        LECTURER,    // 主讲
        HEAD_TEACHER // 班主任
    }
   ```
2. 之后再根据枚举创建对应映射
    ``` typescript
   export const userTypeMap = {
        [UserType.STUDENT]: '学生',
        [UserType.EXPERT]: '专家',
        [UserType.LECTURER]: '主讲',
        [UserType.HEAD_TEACHER]: '班主任'
    }
   ```
3. 在需要的场景内进行格式转换（以下拉菜单需要转换成数组举例）
    ``` typescript
    const userTypeOptions = Object.keys(constLabel.userTypeMap).map((value) => ({
        label: userTypeMap[value],
        value
      }));
   ```
**这样大量重复的动作不仅浪费时间，而且毫无意义，所以本包出现并解决此问题。**
## Usage

1. 安装 install
    ```bash
    npm i enum-value-label -D
    ``` 
2. 基础使用 EnumValueLabel
   
   参数：需要定义的集成数组对象，**使用时请在定义的结尾使用 `as const` 以便TS可以推导出类型**
  
   约定：
   1. 传入对象的key为原枚举的key
   2. 传入对象的value为一个有两项的数组，第一项为原枚举的value，第二项为原映射的value
   
    ``` typescript
    import { EnumValueLabel } from 'enum-value-label';

    const userTypeEnum = EnumValueLabel({
        STUDENT: [1, '学生'],
        EXPERT: [2, '专家'],
        LECTURER: [3, { zh: '主讲', en: 'lecturer' }],
        HEAD_TEACHER: [4, '班主任']
    } as const); // 使用 as const 用以强调类型

    console.log(userTypeEnum['STUDENT'])  // 1 
    console.log(userTypeEnum[2])         // EXPERT
    console.log(userTypeEnum.LECTURER)  // 3
   ```
3. 内置方法 `_label` / `_l`
   
   参数：传入对象的 `key` 或 `value` 的第一项
   > `_label` 和 `_l` 二者效果相同, 仅是缩写关系

    ``` typescript
    import { EnumValueLabel } from 'enum-value-label';

    const userTypeEnum = EnumValueLabel({
        STUDENT: [1, '学生'],
        EXPERT: [2, '专家'],
        LECTURER: [3, { zh: '主讲', en: 'lecturer' }],
        HEAD_TEACHER: [4, '班主任']
    } as const); // 使用 as const 用以强调类型

    console.log(userTypeEnum._label(1))  // '学生'
    console.log(userTypeEnum._label(3))  // { zh: '主讲', en: 'lecturer' }

    console.log(userTypeEnum._l(1))  // '学生'
    console.log(userTypeEnum._l(3))  // { zh: '主讲', en: 'lecturer' }
   ```
4. 内置方法 `_array` / `_a`

   参数：期望生成的对象数组中对象的`key`，传入顺序分别对应原对象value的`第一项`和`第二项`
   > `_array` 和 `_a` 二者效果相同, 仅是缩写关系

    ``` typescript
    import { EnumValueLabel } from 'enum-value-label';

    const userTypeEnum = EnumValueLabel({
        STUDENT: [1, '学生'],
        EXPERT: [2, '专家'],
        LECTURER: [3, { zh: '主讲', en: 'lecturer' }],
        HEAD_TEACHER: [4, '班主任']
    } as const); // 使用 as const 用以强调类型

    console.log(userTypeEnum._array())  
    // [
    //   { value: 1, label: '学生' },
    //   { value: 2, label: '专家' },
    //   { value: 3, label: { zh: '主讲', en: 'lecturer' } },
    //   { value: 4, label: '班主任' }
    // ]

    console.log(userTypeEnum._array('id', 'name'))
    // [
    //   { id: 1, name: '学生' },
    //   { id: 2, name: '专家' },
    //   { id: 3, name: { zh: '主讲', en: 'lecturer' } },
    //   { id: 4, name: '班主任' }
    // ]

    // _array 和 _a 二者效果相同, 不再演示
   ```
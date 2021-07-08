
// // export default class App extends react.Component{
// //   constructor(props){
// //     super(props)
// //     this.state = {
// //       openAir : false
// //     }
// //     //bind返回了一个新函数
// //     // this.clickAir = this.clickAir.bind(this)
// //   }
// //   //直接调用，非实例调用
// //   clickAir=()=>{
// //     //状态不可直接更改
// //     this.state.openAir = !this.state.openAir
// //     let isOpen = this.state.openAir
// //     console.log(this.state)
// //     this.setState({isOpen: !isOpen})
// //   }
// //   render (){
// //     const {openAir} = this.state
// //     console.log(this)
// //     return <>
// //       <h1> 今天天气很{openAir ? '凉爽':'炎热'}</h1>
// //       <button onClick={this.clickAir}>{openAir ? '关空调':'开空调'}</button>
// //       </>
// //   }
// // }
// // //类中声明的方法都开启了局部严格模式；
// // //bable->严格模式
import React,{useState}  from "react";
import "./styles.css";

function ListItem(props){
  const [itemId, setItemId] =  useState(props.itemValue.id)
  const [itemName, setItemName] =  useState(props.itemValue.name)
  // const dragItem = (e)=>{
  //   console.log(e)
  // }
  /**
   * @description: 拖拽时改变item样式
   * @param {*}
   * @return {*}
   */  
  const dragEnter = (e)=>{
    e.target.style.borderBottom = '2px solid #ffde8d'
    e.target.style.background = "#ddd"
  }
  /**
   * @description: 开始拖拽的item信息存放
   * @param {*}
   * @return {*}
   */  
  const dragStart = (e,name,id)=>{
    e.dataTransfer.setData('name', name)
    e.dataTransfer.setData('id', id)
  }
  const dragEnd = (e)=>{
    // console.log(e,'end')
  }
  /**
   * @description: 离开时item样式改变
   * @param {*}
   * @return {*}
   */  
  const dragLeave =(e)=>{
    e.target.style.borderBottom = 'none'
    e.target.style.background = "#f8f8f8"
  }
  /**
   * @description: 停止拖拽时当前位置item信息和之前存放的item信息
   * @param {*}
   * @return {*}
   */  
  const dropItem = (e,name,id)=>{
    const myName = e.dataTransfer.getData('name')
    const myId = Number(e.dataTransfer.getData('id'))
    let oldItem = {name:myName,id:myId}
    let newItem = {name:name,id: id}
    props.changeListValue(oldItem, newItem)
    console.log(myName, myId, '0000000') //原来的
    console.log(name, id, '11111111') //当前的
  }
  return <div 
      draggable={true}
      className="list__item" 
      onDragEnter={dragEnter}
      onDragStart={(e)=>dragStart(e,itemName,itemId)} 
      onDragEnd={dragEnd} 
      onDragLeave={dragLeave}
      onDrop={(e)=>dropItem(e,itemName,itemId)}
      onDragOver={(e)=>e.preventDefault()} >
    {/* <img src="" alt="图标" className="item-icon" /> */}
    <span className="list__item--icon">三</span>
    <span className="list__item--name">{itemName}</span>
  </div>
}

function List(props) {
  const [listValue, setListValue] = useState(props.value)

  /**
   * @description: 列表重新排序
   * @param {*}
   * @return {*}
   */  
  const changeListValue = (oldItem,newItem)=>{
    if(oldItem.id < newItem.id){
      //从上往下拖
      listValue.map(item => {
        if(item.id == oldItem.id){
          item.id = newItem.id
        }else if(item.id> 0 && item.id ==newItem.id){
          item.id--
        }
      })
    }else{
      //从下往上拖
      listValue.map(item => {
        if(item.id == oldItem.id){
          item.id = newItem.id
        }else if(item.id> 0 && item.id == newItem.id){
          item.id++
        }
      })
    }
    listValue.sort((a,b)=>{
      let x = a.id
      let y = b.id
      return x-y
    })
    
    setListValue(JSON.parse(JSON.stringify(listValue)))
    props.onChange(listValue)
    console.log(listValue,'listValue')
  }
  // 完善这里的代码
  return <div className="list">
    {console.log('render',listValue)}
    {listValue.map((item, index)=>{
     return <ListItem 
                itemValue={item} 
                key={item.id} 
                changeListValue={changeListValue}
                ></ListItem>
    })}
  </div>;
}



function Description() {
  return (
    <fragment style={{ textAlign: "left" }}>
      <h1>拖拽排序组件</h1>
      <p>完善 List 组件的代码，按下列要求实现一个拖拽排序组件：</p>
      <ul>
        <li>List 组件接受一个 value 的输入，value 中有每个条目的 ID 和名称</li>
        <li>用户可以通过拖拽每个条目来排序</li>
        <li>每个条目在拖拽时会通过黄色线条标记出落点</li>
        <li>拖拽完成后，List 组件会触发 onChange 事件通知外层结果</li>
        <li>除了 React，不能使用任何第三方库，只能使用浏览器原生 API</li>
      </ul>
      <p>List 组件的渲染结果如下图所示：</p>
      <img
        alt="说明"
        width="400"
        src="https://s3plus.meituan.net/v1/mss_bf7e9f1c1cc54cfb819fc8ffcf965b40/static/WX20201208-145040%402x.png"
      />
    </fragment>
  );
}

export default function App() {
  const [value, setValue] = React.useState(() => {
    return [
      {
        id: 1,
        name: "经营模式"
      },
      {
        id: 2,
        name: "订单来源"
      },
      {
        id: 3,
        name: "用餐方式"
      },
      {
        id: 4,
        name: "营业日期"
      },
      {
        id: 5,
        name: "下单事件"
      },
      {
        id: 6,
        name: "结账时间"
      },
      {
        id: 7,
        name: "撤单时间"
      },
      {
        id: 8,
        name: "下单人"
      }
    ];
  });
  return (
    <div className="App">
      {/* <Description /> */}
      <List value={value} onChange={setValue}  />
    </div>
  );
}

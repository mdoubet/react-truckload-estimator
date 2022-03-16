import logo from './truck.svg';
import './App.css';
import furnitureData from './furnitureData.json';
import { useState } from 'react';

console.log(furnitureData);


function App() {
  const [truckload, setTruckload] = useState([]);

  const getQty = (idLookup) => {
    const curItem = truckload.findIndex(item => item.id === idLookup);
    if (curItem === -1) {
      return <><span></span><h2>--</h2><span></span></>;
    }
    else {
      return (
        <>
          <h3>{truckload[curItem].totalWeight}</h3>
          <h2>{truckload[curItem].qty}</h2>
          <h3>{truckload[curItem].totalCBF}</h3>
        </>
      );
    }
  }
  
  const handleAddItems = (room,item,incr) => {
    const idLookup = `${room}-${item.Item}`;
    const itemUpdating = truckload.findIndex(item => item.id === idLookup);

    console.log(itemUpdating, room, item.Item);

    if (itemUpdating === -1){
      const updateTruckLoad = [
        ...truckload,
        {
          id: `${room}-${item.Item}`,
          room: room,
          item: item.Item,
          qty: incr,
          totalWeight: item.Weight * incr,
          totalCBF: item.CBF * incr
        } 
      ]
      setTruckload(updateTruckLoad);
    }
    else {
      let newTruckload = truckload.slice();
      newTruckload[itemUpdating].qty += incr;
      newTruckload[itemUpdating].totalWeight += incr * item.Weight;
      newTruckload[itemUpdating].totalCBF += incr * item.CBF;
      setTruckload(newTruckload);
    }
    console.log("after adding", truckload);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Moving Truck Size Estimator
        </p>
        <a
          className="App-link"
          href="http://www.movingconnections.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by Moving Connections
        </a>
      </header>
      
        {furnitureData.map((room)=>
        <div key={`${room.Room}-header`}>
          <div className='Room-header'>
            <h2>
              {room.Room} {truckload.filter((item)=> item.room === room.Room).reduce((tot, cur) => tot += cur.totalWeight, 0)}            
            </h2>
            </div>
            <div className='Room-main'>
            
              {room.Items.map( (item)=>
                <div className='Furniture-item' key={`${room.Room}_${item.Item}`}>
                  <div className='Furinture-item-header'>
                    <h3 className='Item-title'>{item.Item} </h3>
                    <h4 className='Item-weight'>{item.Weight} / {item.CBF}</h4>


                  </div>
                  <div className='Furniture-item-quantity'>
                    {/* <h3>10000</h3> */}
                    {getQty(`${room.Room}-${item.Item}`)}
                    {/* <h3>9999</h3> */}
                  </div>

                  <div className='Furniture-item-buttons'>
                    <button className='Furniture-buttons' onClick={()=> handleAddItems(room.Room, item, 1)}>-</button>
                    <button className='Furniture-buttons' onClick={()=> alert(item.Item)}>+</button>
                  </div>
                  

                </div>
                
                
              )}
            </div>
          </div>
        )}
      
    </div>
  );
}

export default App;

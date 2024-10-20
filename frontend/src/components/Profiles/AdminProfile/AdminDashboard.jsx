import React, { useEffect, useState } from 'react'
import styleDashboard from './AdminDashboard.module.css'

export default function AdminDashboard() {
  const [numberOfTrees, setNumberOfTrees] = useState(0);
  const [numberOfNeededTrees, setNumberOfNeededTrees] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);

  useEffect(() => {
    const fetchTreeCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/tree/count'); // Call to the backend API
        const data = await response.json();
        setNumberOfTrees(data.count);
      } catch (error) {
        console.error('Error fetching tree count:', error);
      }
    };

    fetchTreeCount();
  }, []); 

  useEffect(() => {
    const fetchLowInventoryTreeCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/tree/low-inventory-count');
        const data = await response.json();
        setNumberOfNeededTrees(data.count);
      } catch (error) {
        console.error('Error fetching low inventory tree count:', error);
      }
    };

    fetchLowInventoryTreeCount();
  }, []); 

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/count'); 
        const data = await response.json();
        setNumberOfUsers(data.count);
      } catch (error) {
        console.error('Error fetching tree count:', error);
      }
    };

    fetchUserCount();
  }, []); 


  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/order/count'); 
        const data = await response.json();
        setNumberOfOrders(data.count);
      } catch (error) {
        console.error('Error fetching tree count:', error);
      }
    };

    fetchOrderCount();
  }, []); 

  return (
    <>
      <div className={styleDashboard.dashboardLayout}>
        <div className={styleDashboard.dashboardPage}>
          <div className={styleDashboard.number}>
            <h1>number of trees</h1>
            <h4>{numberOfTrees}</h4>
          </div>
          <div className={styleDashboard.number}>
            <h1>number of users</h1>
            <h4>{numberOfUsers}</h4>
          </div>
          <div className={styleDashboard.number}>
            <h1>number of needed trees</h1>
            <h4>{numberOfNeededTrees}</h4>
          </div>
          <div className={styleDashboard.number}>
            <h1>number of orders</h1>
            <h4>{numberOfOrders}</h4>
          </div>
        </div>
      </div>
    </>
  )
}

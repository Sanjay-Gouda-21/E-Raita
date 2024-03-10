import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const TopProductsChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF5733",
          "#FFC300",
          "#C70039",
          "#900C3F",
          "#581845",
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchTopProductsData = async () => {
      try {
        const response = await fetch("http://localhost:3003/top-products");
        if (response.status === 200) {
          const { topProductsData } = await response.json();
          const labels = topProductsData.map((item) => item.ProductName);
          const purchaseCounts = topProductsData.map(
            (item) => item.PurchaseCount
          );

          setData({
            labels,
            datasets: [
              {
                data: purchaseCounts,
                backgroundColor: [
                  "#FF5733",
                  "#FFC300",
                  "#C70039",
                  "#900C3F",
                  "#581845",
                ],
              },
            ],
          });
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopProductsData();
  }, []);

  const chartStyle = {
    width: "300px",
    height: "378px",
    marginLeft: "500px",
  };

  return (
    <div className="pie" style={chartStyle}>
      <h2>Top 5 Products by Purchase Count</h2>
      <Pie data={data} />
    </div>
  );
};

export default TopProductsChart;

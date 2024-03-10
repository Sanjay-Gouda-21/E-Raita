import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import "./css/wage.css";

const TotalWagesChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Wages Paid",
        data: [],
        backgroundColor: "green",
      },
    ],
  });

  useEffect(() => {
    const fetchTotalWagesData = async () => {
      try {
        const response = await fetch("http://localhost:3003/total-wages");
        if (response.status === 200) {
          const { wagesData } = await response.json();
          const labels = wagesData.map((item) => item.LabourerName);
          const wageValues = wagesData.map((item) => item.TotalWagesPaid);

          setData((prevData) => ({
            ...prevData,
            labels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: wageValues,
              },
            ],
          }));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTotalWagesData();
  }, []);

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Total Wages Report", 10, 10);
    const chartCanvas = document.querySelector("canvas");
    const imgData = chartCanvas.toDataURL("image/jpeg", 1.0);
    doc.addImage(imgData, "JPEG", 10, 20, 180, 100);
    doc.save("total_wages_report.pdf");
  };

  return (
    <div className="chart-container">
      <h2 className="chart-heading">Total Wages Paid to Labourers</h2>

      <Bar data={data} options={options} />
      <button
        onClick={handleDownloadPDF}
        className="download-button"
        style={{
          textDecoration: "none",
          color: "white",
          background: "green",
          border: "none",
          padding: "7px",
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default TotalWagesChart;
